#!/bin/bash

DEPLOY_LOCATION=${1-staging}
HUGO_BINARY=${2-'./hugo'}

# Set up variables depending on selected environment
if [ $DEPLOY_LOCATION = "staging" ]; then
    BASE_URL="https://pages.github.com/aapowers/zacariasmusic"
    REMOTE_REPO="origin"
    DEPLOY_DIR="dist-staging"
    BRANCH="gh-pages"
elif [ $DEPLOY_LOCATION = "live" ]; then
    BASE_URL="https://zacariasmusic.com"
    REMOTE_REPO="origin"
    DEPLOY_DIR="dist-live"
    BRANCH="live"
else
    echo "Error: Invalid deploy location provided, Allowed: [live|staging]";
    exit 1;
fi

# Assert that we are in the project root
if [ ! -f ./hugo ];
then
    echo "Error: Not in the right directory? Run from project directory";
    exit;
fi

# Get the source version
DEPLOY_VERSION=`git show-ref --head | head -1`

set -x

# Update the deployable version to the latest
cd ${DEPLOY_DIR} \
    && git checkout ${BRANCH} \
    && git fetch origin \
    && git reset --hard origin/${BRANCH} \
    && git rm -rf . \
    && cd .. \
    || { echo "Error: Setting up deploy directory failed"; exit; }

# Generate the actual static site
$HUGO_BINARY -b "${BASE_URL}" -d ${DEPLOY_DIR} \
    || { echo "Error: Hugo failed to generate site"; exit; }

# Do the deploy to the selected environment
cd ${DEPLOY_DIR} \
    && git add -A \
    && git commit -m "Deploy: ${DEPLOY_VERSION}" \
    && git push ${REMOTE_REPO} ${BRANCH} \
    || { echo "Error: Deploy failed"; exit; }

set +x

echo "Your changes are now live! ${BASE_URL}"
exit 0;
