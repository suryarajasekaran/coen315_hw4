#!/bin/sh

docker stop $(docker ps -a -q --filter name="bartBackend")
docker rm $(docker ps -a -q --filter name="bartBackend")