#!/bin/bash
set -x
docker container exec application-service node load.js $@