#!/bin/bash

rm -rf .next
next build
next export

mv ./out ../out
git checkout gh-pages

rm -rf _next
mv ../out/* ./
rm -rf ../out

git add .
git push