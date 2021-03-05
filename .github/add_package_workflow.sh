#!/usr/bin/env bash
REPO_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )
WORKFLOWS=(ci-cd release)

PACKAGE=$1
PACKAGE_PATH=${REPO_DIR}/packages/${PACKAGE}

if [ -z "${PACKAGE}" ]; then
    echo "Package must be specified"
    echo "Usage: $0 package_name"
    exit 1
fi

if [ ! -d "${PACKAGE_PATH}" ]; then
    echo "${PACKAGE_PATH} does not exist"
    exit 1
fi

echo "generating workflows for ${PACKAGE_PATH}"

for workflow in ${WORKFLOWS[@]}; do
    echo "* ${workflow}"

    # replace template package placeholder with route name
    workflow_yaml=$(cat ${REPO_DIR}/.github/${workflow}_template.yaml |  sed "s/{{ PACKAGE }}/${PACKAGE}/g")

    # save workflow to .github/workflows/
    echo "${workflow_yaml}" > ${REPO_DIR}/.github/workflows/${PACKAGE}-${workflow}.yaml
done
