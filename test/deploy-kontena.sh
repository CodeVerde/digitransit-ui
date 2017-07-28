#/bin/bash

# do nothing if the build is for tagging a prod release
if [ -n "$TRAVIS_TAG" ]; then
    echo "*** Tagged build:" $TRAVIS_TAG
    exit 0;
fi

set -e
ORG=${ORG:-codeverde}

kontena version
kontena master login --token $KONTENA_LOGIN_TOKEN --grid $KONTENA_GRID https://$KONTENA_MASTER_IP
kontena vault update -u FRONT_SERVICE_VERSION ci-$TRAVIS_BUILD_NUMBER
if kontena stack list | grep -q article-project ; then kontena stack upgrade article-project ./descriptors/kontena-test-areas.yml ; fi
if ! kontena stack list | grep -q article-project ; then kontena stack install ./descriptors/kontena-test-areas.yml ; fi
