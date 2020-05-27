#! /bin/bash

# Don't print our ECR password
set -e
$(aws ecr get-login --no-include-email)

set -ex
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-"813448775391"}
IMAGE_TAG=${IMAGE_TAG:-"shipping-dx-base"}
IMAGE_REPO_NAME=${IMAGE_REPO_NAME:-"ipaas-dip-functions"}
NEW_VERSION=$(npm version patch)

docker build . \
    -t $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-$NEW_VERSION \
    -t $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-$NEW_VERSION
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-latest
