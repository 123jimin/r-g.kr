#!/usr/bin/env bash

FLAGS="-al $(pwd)/log/out.log --minUptime 5000 --spinSleepTime 30000 -m 10"

mkdir log
forever restart $FLAGS run.js || forever start $FLAGS run.js
