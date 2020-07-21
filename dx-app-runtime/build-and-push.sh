#! /bin/bash

set -ex
AWS_REGION=${AWS_REGION:-"us-east-1"}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-"813448775391"}
IMAGE_TAG=${IMAGE_TAG:-"shipping-dx-base"}
IMAGE_REPO_NAME=${IMAGE_REPO_NAME:-"ipaas-dip-functions"}
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_SHA=$(git rev-parse HEAD)

docker build . \
    --build-arg GIT_BRANCH=$GIT_BRANCH \
    --build-arg GIT_SHA=$GIT_SHA \
    -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-$GIT_SHA \
    -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-latest

docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-$GIT_SHA
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG-latest
