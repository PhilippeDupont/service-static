#!/bin/bash
set -xe

# Include CI scripts
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CI_FOLDER=template-ci

toolMe () {
    if [ ! -f $DIR/$CI_FOLDER/ci-tool.sh ]; then
          stepCheckout
    fi
    source $DIR/$CI_FOLDER/ci-tool.sh
}

stepCheckout () {
    rm -rf $CI_FOLDER &&
    git clone -b master --single-branch --depth 1 git@github.com:Elium/$CI_FOLDER.git $CI_FOLDER
}

stepBuild () {
  docker build -t $IMAGE:$HASH .
}

stepTest () {
  DATA_FOLDER=$(docker run --rm $IMAGE:$HASH sh -c 'ls /usr/share/nginx/html' | wc -l)
  [ $DATA_FOLDER -gt 4 ] || (echo "There must be at least 4 sub-folder" && exit 1)
}

stepPublish () {
  create_tag $BRANCH
  push_tags
}

case "$1" in
  stepCheckout)
    stepCheckout
    ;;
  stepBuild)
    toolMe
    stepBuild
    ;;
  stepTest)
    toolMe
    stepTest
    ;;
  stepPublish)
    toolMe
    stepPublish
    ;;
  *)
    echo "Usage: $0 {stepCheckout|stepBuild|stepTest|stepPublish}"
    exit 1
esac