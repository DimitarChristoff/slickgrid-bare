#!/bin/bash
set -o errexit
rm -Rf ./node_modules
source use node10
export CI=true
env
node --version
npm --version
npm ci
npm run build || {
    echo "NPM run build failed" 1>&2
    exit 1
}

npm ls || true

exit 0
