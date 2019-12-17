#!/bin/bash
set -o errexit
rm -Rf ./node_modules
source use node10
export CI=true
env
node --version
npm --version
npm ci
npm run build && {
    VER=${bamboo_revision:-patch}
    git clone "${bamboo_planRepository_repositoryUrl}" temp
    rm -Rf .git/objects
    mv ./temp/.git/objects .git/objects
    rm -Rf temp/
    git repack -a -d
    git remote set-url origin "https://bamboosvc:${bamboogithubtoken}@github.liquidnet.com/GIN/slickgrid.git"
    # go back to commit that triggered to avoid releasing new head
    git remote -v
    git fetch
    git reset --hard HEAD
    git status
    git show --summary
    git config --local user.name bamboo-ci
    git config --local user.email bamboo-ci@buildserver
    npm version $VER &&
    npm publish && git push origin master --tags
} || {
    echo "NPM run build failed" 1>&2
    exit 1
}

npm ls || true

exit 0
