#!/bin/sh

BASEDIR=$(dirname "$0")
docker build -t bartBackend:latest -f "$BASEDIR/Dockerfile" $BASEDIR