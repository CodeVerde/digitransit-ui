#/bin/bash

# do nothing if the build is for tagging a prod release
if [ -n "$TRAVIS_TAG" ]; then
    echo "*** Tagged build:" $TRAVIS_TAG
    exit 0;
fi

set -e
ORG=${ORG:-codeverde}

yarn install
yarn run lint
docker build -t quay.io/$ORG/digitransit-ui:ci-$TRAVIS_COMMIT .
docker login -u $DOCKER_USER -p $DOCKER_AUTH quay.io
docker push quay.io/$ORG/digitransit-ui:ci-$TRAVIS_COMMIT
