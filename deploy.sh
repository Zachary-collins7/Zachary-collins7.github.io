#!/bin/bash


echo -e "\033[0;36minfo\033[0m  - Removing .DS_Store files if any"
rm -rf portfolio/out/.DS_Store;


echo -e "\033[0;36minfo\033[0m  - adding .DS_Store file to .gitignore"
echo ".DS_Store" > portfolio/out/.gitignore;


echo -e "\033[0;36minfo\033[0m  - Creating \033[0;32m .nojekyll\033[0m file in out folder "
touch portfolio/out/.nojekyll;


echo -e "\033[0;36minfo\033[0m  - Copying .env's to out folder "
cp portfolio/.env portfolio/out/.env;
cp portfolio/.env.production portfolio/out/.env.production;


echo -e "\033[0;36minfo\033[0m  - Delete old gh-pages branch"
git branch -D gh-pages


echo -e "\033[0;36minfo\033[0m  - Moving\033[0;32m built application\033[0m to gh-pages branch "
git checkout --orphan gh-pages
git rm -r --cached .
git --work-tree portfolio/out add --all
git --work-tree portfolio/out commit -m 'deploy gh-pages'
git push origin HEAD:gh-pages --force && git checkout -f main