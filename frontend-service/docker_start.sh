#!/usr/bin/env bash

cp -rf dist/* /usr/share/nginx/html
nginx -g 'daemon off;'
