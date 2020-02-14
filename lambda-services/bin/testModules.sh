#!/bin/bash
for module in $(ls -d modules/* functions/*); do
    pushd $module
        rm -rf node_modules/
        npm install
        npm test
        PASSED=$?
    popd

    # if a single module fails its tests, fail fast since this may result in
    # subtle or hard to catch bugs in the Lambda Functions that use them
    if [ $PASSED -ne 0 ]; then
        echo "Module $module failed, aborting deployment."
        exit 1
    fi
done
