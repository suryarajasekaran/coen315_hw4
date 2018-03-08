#!/bin/sh

docker stop $(docker ps -a -q --filter name="bartbackend")
docker rm $(docker ps -a -q --filter name="bartbackend")