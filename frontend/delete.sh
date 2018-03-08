#!/bin/sh

docker stop $(docker ps -a -q --filter name="bartFrontend")
docker rm $(docker ps -a -q --filter name="bartFrontend")