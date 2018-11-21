# https://hub.docker.com/_/nginx/
FROM nginx:1.13.3
MAINTAINER Elium Tech

RUN apt-get update && \
  apt-get install -y nginx-extras

ADD root /
ADD src /usr/share/nginx/html