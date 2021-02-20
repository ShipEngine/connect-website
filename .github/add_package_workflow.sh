#!/usr/bin/bash
REPO_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )
CI_WORKFLOW_TEMPLATE=$(cat .github/ci_template.yaml)
PUBLISH_WORKFLOW_TEMPLATE=$(cat .github/publish_template.yaml)

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

# replace template package placeholder with route name
CI_WORKFLOW=$(echo "${CI_WORKFLOW_TEMPLATE}" | sed "s/{{ PACKAGE }}/${PACKAGE}/g")
PUBLISH_WORKFLOW=$(echo "${PUBLISH_WORKFLOW_TEMPLATE}" | sed "s/{{ PACKAGE }}/${PACKAGE}/g")

# save workflow to .github/workflows/{ROUTE}
echo "${CI_WORKFLOW}" > .github/workflows/${PACKAGE}-ci.yaml
echo "${PUBLISH_WORKFLOW}" > .github/workflows/${PACKAGE}-publish.yaml
