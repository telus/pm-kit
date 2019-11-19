#!/bin/sh
set -o nounset -o errexit
cd `dirname $0`

# Installs the build pipeline for a given branch (default: master) in your currently selected OpenShift project
# See: README.md

BRANCH=${1:-master}

# Synchronize OpenShift project with shippy
oc project $(shippy status --project)

# Copy secrets into the OpenShift project
shippy get secret github --common --field=ssh-key > id_rsa \
  && oc create secret generic github-secret --from-file=ssh-privatekey=id_rsa --dry-run -o yaml | oc apply -f - \
  && rm id_rsa
shippy get secret contrast --common --field=dev-assess > contrast.yaml \
  && oc create secret generic contrast-dev --from-file=contrast.yaml --dry-run -o yaml | oc apply -f - \
  && rm contrast.yaml
oc create secret generic newrelic-license-secret --from-literal=newrelic-license=$(shippy get secret newrelic --common --field=license-key) --dry-run -o yaml | oc apply -f -
oc create secret generic npmrc-secret --from-literal=.npmrc=$(shippy get secret npm --common --field=npmrc) --dry-run -o yaml | oc apply -f -
oc create secret generic sonarqube-token-secret --from-literal=sonar.login=$(shippy get secret sonarqube --common --field=sonar_token) --dry-run -o yaml | oc apply -f -

# Apply and execute the OpenShift template
oc apply -f openshift-template.yml
oc process public-mobile-design-system-pipeline BRANCH=${BRANCH} | oc apply -f -
oc start-build public-mobile-design-system-pipeline
