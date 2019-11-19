#!/bin/sh
set -o nounset -o errexit

# Runs `npm run test` against a container on OpenShift. Used by the Test stage of the Jenkinsfile.
# Usage: ./run-test.sh public-mobile-design-system latest

CONTAINER_NAME=${1}
VERSION=${2:-latest}
IMAGESTREAM=`oc get imagestream ${CONTAINER_NAME} -o='jsonpath={.status.dockerImageRepository}'`

oc run ${CONTAINER_NAME}-${VERSION} \
  --image=${IMAGESTREAM}:${VERSION} \
  --rm=true \
  --attach=true \
  --restart=Never \
  --overrides='{
    "apiVersion":"v1",
    "spec":{
      "containers":[{
        "name": "'${CONTAINER_NAME}'-'${VERSION}'",
        "image": "'${IMAGESTREAM}':'${VERSION}'",
        "command":["npm", "run", "test:sonarqube"],
        "env":[{
          "name":"VERSION",
          "value":"'${VERSION}'"
        },{
          "name":"SONARQUBE_TOKEN",
          "valueFrom":{
            "secretKeyRef":{
              "key": "sonar.login",
              "name":"sonarqube-token-secret"
            }
          }
        }]
      }]
    }
  }'
