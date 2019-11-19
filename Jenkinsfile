/**
 * Defines our build pipeline
 *
 * Jenkinsfile Groovy DSL:
 * https://jenkins.io/doc/book/pipeline/
 *
 * OpenShift Groovy functions:
 * https://jenkins.io/doc/pipeline/steps/openshift-pipeline/
 *
 * Slack notifications:
 * https://jenkins.io/blog/2016/07/18/pipeline-notifications/
 */

String buildVersion = env.BUILD_NUMBER
String gitCommitMsg = 'Unknown commit'

try {
  String gitCommitId

  /*
   * Pull the sourcecode and metadata from GitHub.
   */
  stage('Checkout') {
    node {
      sh "oc project ${env.PROJECT_NAME}"

      checkout scm
      stash includes: 'openshift/*', name: 'scripts'

      String gitCommitNum = sh(returnStdout: true, script: 'git rev-list HEAD --count').trim()
      String gitShortId = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
      buildVersion = gitCommitNum + '-' + gitShortId

      gitCommitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
      gitCommitMsg = sh(returnStdout: true, script: 'git log --format=%B -n 1 HEAD').trim()
    }
  }

  /*
   * Update the OpenShift build and deploy templates that will be used by the pipeline.
   */
  stage('Apply Templates') {
    applyTemplates()
  }

  /*
   * Trigger the OpenShift Docker build, and store the resulting image, tagged with the GitHub commit.
   */
  stage('Build') {
    parallel(
      failFast: true,
      'Build App':{
        build(
          name: 'public-mobile-design-system',
          buildVersion: buildVersion,
          gitCommitId: gitCommitId
        )
      },
      'Build E2E Test':{
        build(
          name: 'public-mobile-design-system-e2e',
          buildVersion: buildVersion,
          gitCommitId: gitCommitId
        )
      },
      'Build Load Test':{
        build(
          name: 'public-mobile-design-system-load',
          buildVersion: buildVersion,
          gitCommitId: gitCommitId
        )
      },
      // 'Build Lighthouse Test':{
      //   build(
      //     name: 'public-mobile-design-system-lighthouse',
      //     buildVersion: buildVersion,
      //     gitCommitId: gitCommitId
      //   )
      // }
    )
  }

  /*
   * Run the unit tests in a standalone pod. Test results will be uploaded to SonarQube.
   */
  stage('Test') {
    test(
      name: 'public-mobile-design-system',
      buildVersion: buildVersion
    )
  }

  /*
   * Run E2E against a seperate pod runing with contrast to no impact load tests.
   */
  stage('Security') {
    deploy(
      buildVersion: buildVersion,
      environment: 'contrast',
      numReplicas: 1
    )
    e2e(
      buildVersion: buildVersion,
      environment: 'contrast'
    )
  }

  /*
   * Deploy to staging environment.
   */
  stage('Deploy Staging') {
    deploy(
      buildVersion: buildVersion,
      environment: 'staging',
      numReplicas: 1
    )
  }

  /*
   * Run functional tests in staging.
   */
  stage('Validate Staging') {
    parallel(
      'E2E': {
        e2e(
          buildVersion: buildVersion,
          environment: 'staging'
        )
      },
      // 'Lighthouse': {
      //   lighthouseTest(
      //     buildVersion: buildVersion,
      //     environment: 'staging'
      //   )
      // }
    )
  }

  /*
   * Load test the staging environment.
   */
  stage('Load Test Staging') {
    loadTest(
      buildVersion: buildVersion,
      environment: 'staging'
    )
  }

  /*
   * Prompt a developer to make the release.
   */
  stage('User Input') {
    notifyBuild(
      message: 'Build is ready for Production',
      color: '#0000FF',
      emoji: 'shipitparrot',
      buildVersion: buildVersion,
      gitCommitMsg: gitCommitMsg
    )
    timeout(time:1, unit:'DAYS') {
      input 'Deploy to Production?'
    }
  }

  /*
   * Deploy to production environment.
   */
  stage('Deploy Production') {
    deploy(
      buildVersion: buildVersion,
      environment: 'production',
      numReplicas: 3
    )
  }

  /*
   * Run functional tests in production.
   */
  stage('Validate Production') {
    parallel(
      'E2E': {
        e2e(
          buildVersion: buildVersion,
          environment: 'production'
        )
      },
      // 'Lighthouse': {
      //   lighthouseTest(
      //     buildVersion: buildVersion,
      //     environment: 'production'
      //   )
      // }
    )
  }

  currentBuild.result = 'SUCCESS'
}
catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException flowError) {
  currentBuild.result = 'ABORTED'
}
catch (err) {
  currentBuild.result = 'FAILURE'
  notifyBuild(
    message:  'Build failed',
    color: '#FF0000',
    emoji: 'sadparrot',
    buildVersion: buildVersion,
    gitCommitMsg: gitCommitMsg
  )
  throw err
}
finally {
  if (currentBuild.result == 'SUCCESS') {
    notifyBuild(
      message: 'Production deploy successful',
      color: '#00FF00',
      emoji: 'nyanparrot',
      buildVersion: buildVersion,
      gitCommitMsg: gitCommitMsg
    )
  }
}

def applyTemplates() {
  node {
    unstash 'scripts'
    sh('openshift/run-apply-templates.sh')
  }
}

def build(Map attrs) {
  node {
    unstash 'scripts'
    ansiColor('xterm') {
      sh("./openshift/run-build.sh ${attrs.name} ${attrs.buildVersion} ${attrs.gitCommitId}")
    }
  }
}

def test(Map attrs) {
  node {
    unstash 'scripts'
    ansiColor('xterm') {
      sh("./openshift/run-test.sh ${attrs.name} ${attrs.buildVersion}")
    }
  }
}

def deploy(Map attrs) {
  node {
    unstash 'scripts'
    sh("""
      ./openshift/run-deploy.sh ${attrs.environment} ${attrs.buildVersion} ${attrs.numReplicas}
      ./openshift/run-newrelic-notify.sh public-mobile-design-system ${attrs.environment} ${attrs.buildVersion}
    """)
  }
}

def e2e(Map attrs) {
  node {
    unstash 'scripts'
    ansiColor('xterm') {
      sh("./openshift/run-e2e.sh ${attrs.environment} ${attrs.buildVersion}")
    }
  }
}

def loadTest(Map attrs) {
  node {
    unstash 'scripts'
    ansiColor('xterm') {
      sh("./openshift/run-load-test.sh ${attrs.environment} ${attrs.buildVersion}")
    }
  }
}

def lighthouseTest(Map attrs) {
  node {
    unstash 'scripts'
    ansiColor('xterm') {
      sh("./openshift/run-lighthouse-test.sh ${attrs.environment} ${attrs.buildVersion}")
    }
  }
}

def notifyBuild(Map attrs) {
  node {
    String route = sh(returnStdout: true, script: 'oc get route jenkins -o=\'jsonpath={.spec.host}\'').trim()
    String url = "https://${route}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/console"

    slackSend(
      color: attrs.color,
      message: "_${env.JOB_NAME}_ <${url}|${attrs.buildVersion}>\n*${attrs.message}* :${attrs.emoji}:\n```${attrs.gitCommitMsg}```",
      teamDomain: 'telusdigital',
      channel: 'public-mobile-design-system',
      token: env.SLACK_TOKEN
    )
  }
}
