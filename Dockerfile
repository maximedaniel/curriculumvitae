FROM    mhart/alpine-node

RUN     npm install -g http-server

WORKDIR /site
ADD     ./dist /site

# The default port of the application
EXPOSE  5000

CMD ["http-server", "--cors", "-p5000", "/site"]
