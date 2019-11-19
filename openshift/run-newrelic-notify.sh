#!/bin/sh
set -o nounset -o errexit

# Notify NewRelic of a deployment. Used by the Deploy stage of the Jenkinsfile.
# Usage: NEW_RELIC_API_KEY=abc123 ./run-newrelic-notify.sh public-mobile-design-system staging latest

CONTAINER_NAME=${1}
ENVIRONMENT=${2:-staging}
VERSION=${3:-latest}

APP_ID=`curl -s -X GET "https://api.newrelic.com/v2/applications.json" \
  -H "X-Api-Key:${NEW_RELIC_API_KEY}" \
  -d "filter[name]=${CONTAINER_NAME}+(${ENVIRONMENT})" \
| jq ".applications[] | select(.name == \"${CONTAINER_NAME} (${ENVIRONMENT})\") | .id"`

if [ "$APP_ID" ]
then
  curl -s -X POST "https://api.newrelic.com/v2/applications/${APP_ID}/deployments.json" \
    -H "X-Api-Key: ${NEW_RELIC_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{\"deployment\":{\"revision\":\"${VERSION}\"}}"
else
  >&2 echo "No app ID found for ${CONTAINER_NAME}. If this is not your first time running this deployment, check your NewRelic integration!"
fi
