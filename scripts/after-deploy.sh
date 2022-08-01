#!/bin/bash
REPOSITORY=/home/ubuntu/build/Recordream-Server

cd $REPOSITORY

sudo /usr/bin/yarn

sudo /usr/bin/pm2 start dist