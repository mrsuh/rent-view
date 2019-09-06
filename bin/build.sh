#!/bin/sh

cd "$( cd `dirname $0` && pwd )/.."

dir=$(pwd)

npm install

node_modules/grunt/bin/grunt build
