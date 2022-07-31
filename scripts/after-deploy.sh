#!/bin/bash
REPOSITORY=/home/ubuntu/build/RecorDream-Server

cd $REPOSITORY

sudo /usr/bin/yarn

sudo /usr/bin/pm2 start dist