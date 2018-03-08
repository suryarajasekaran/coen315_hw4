#!/bin/sh

BASEDIR=$(dirname "$0")
docker build -t bartbackend:latest -f "$BASEDIR/Dockerfile" $BASEDIR