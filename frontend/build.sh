#!/bin/sh

BASEDIR=$(dirname "$0")
docker build -t bartfrontend:latest -f "$BASEDIR/Dockerfile" $BASEDIR