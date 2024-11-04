#! /bin/bash

APP_NAME="${copilot-ui}"
APP_VERSION="${APP_VERSION}:=latest"
DOCKER_FILE="${Dockerfile:=cicd/Dockerfile}"

docker build --no-cache -f ${DOCKER_FILE} \
--secret id=npmrc,src=${HOME}/.npmrc \
-t ${APP_NAME}:${APP_VERSION} .
