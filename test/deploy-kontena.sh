#/bin/bash
set -e
ORG=${ORG:-hsldevcom}

kontena master login --token $KONTENA_LOGIN_TOKEN --grid $KONTENA_GRID https://$KONTENA_MASTER_IP

kontena vault update -u FRONT_SERVICE_VERSION $KONTENA_FRONT_SERVICE_VERSION
if kontena stack list | grep -q $KONTENA_STACK_NAME ; then kontena stack upgrade $KONTENA_STACK_NAME ./kontena.yml ; fi
if ! kontena stack list | grep -q $KONTENA_STACK_NAME ; then kontena stack install ./kontena.yml ; fi
