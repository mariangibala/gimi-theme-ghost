#!/bin/bash
set -e # stop on error

npm run build
git checkout -b gh-pages
git add -f release/documentation
git commit -m "deploy to gh-pages"
git push origin `git subtree split --prefix dist`:gh-pages --force
git checkout master
git branch -D gh-pages
echo DONE!