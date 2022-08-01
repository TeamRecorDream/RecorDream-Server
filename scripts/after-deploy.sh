#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo /usr/bin/yarn

cd dist

sudo /usr/bin/pm2 start src