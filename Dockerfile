# https://hub.docker.com/_/nginx/
FROM nginx:1.13.3
MAINTAINER Elium Tech

ADD root /
ADD src /usr/share/nginx/html