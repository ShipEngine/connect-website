#!/bin/bash
REPO_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )
WORKFLOW_TEMPLATE=$(cat .github/workflow_template.yaml)

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

echo "generating workflow for ${PACKAGE_PATH}"

# replace template package placeholder with route name
WORKFLOW=$(echo "${WORKFLOW_TEMPLATE}" | sed "s/{{ PACKAGE }}/${PACKAGE}/g")

# save workflow to .github/workflows/{ROUTE}
echo "${WORKFLOW}" > .github/workflows/${PACKAGE}.yaml
