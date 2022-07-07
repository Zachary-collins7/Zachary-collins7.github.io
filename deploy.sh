#!/bin/bash

loader() {
    for pc in $(seq 1 10); do
        echo -ne "."
        sleep 0.07
    done
    echo
}

#copy build folder
echo -ne "\033[0;36minfo\033[0m  - "
echo -ne "Moving\033[0;32m built application\033[0m to root dir "
loader
yes | \cp -rf portfolio/out/* ./

echo
