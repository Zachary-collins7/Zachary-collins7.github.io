#!/bin/bash

echo -e "\033[0;36minfo\033[0m  - Removing .DS_Store files if any"
rm -rf ./out/.DS_Store;

echo -e "\033[0;36minfo\033[0m  - adding .DS_Store file to .gitignore"
echo ".DS_Store" > ./out/.gitignore;

echo -e "\033[0;36minfo\033[0m  - Creating \033[0;32m .nojekyll\033[0m file in out folder "
touch ./out/.nojekyll;

echo -e "\033[0;36minfo\033[0m  - Copying .env's to out folder "
cp ./.env ./out/.env;
cp ./.env.production ./out/.env.production;


git branch -D gh-pages

echo -e "\033[0;36minfo\033[0m  - Moving\033[0;32m built application\033[0m to gh-pages branch "
git checkout --orphan gh-pages
git --work-tree out add --all
git --work-tree out commit -m 'deploy gh-pages'
git push origin HEAD:gh-pages --force
git checkout -f main