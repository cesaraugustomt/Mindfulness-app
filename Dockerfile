FROM node:16.14.0

ADD start.sh /start.sh
WORKDIR /usr/app
RUN chmod 755 /start.sh
CMD ["/start.sh"]
