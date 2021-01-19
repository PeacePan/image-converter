#!/bin/bash

export DEPLOY_TO=gh-pages

rm -rf .next
next build
next export
mv ./out ../out

git checkout gh-pages
rm -rf _next
mv ../out/* ./
rm -rf ../out

git add .
timestamp=$(date +%Y-%m-%d_%H-%M-%S)
git commit -m "gh-pages deploy $timestamp"
git push
git checkout master
