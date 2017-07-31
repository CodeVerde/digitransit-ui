#/bin/bash

# Skip the deployment for PRs
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then exit 0; fi

set -e
ORG=${ORG:-hsldevcom}
export SSL_IGNORE_ERRORS=true

kontena master login --token $KONTENA_LOGIN_TOKEN --grid $KONTENA_GRID https://$KONTENA_MASTER_IP

kontena vault update -u FRONT_SERVICE_VERSION ci-$TRAVIS_BUILD_NUMBER
if kontena stack list | grep -q $KONTENA_STACK_NAME ; then kontena stack upgrade $KONTENA_STACK_NAME ./kontena.yml ; fi
if ! kontena stack list | grep -q $KONTENA_STACK_NAME ; then kontena stack install ./kontena.yml ; fi
