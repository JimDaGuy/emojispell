const http = require('http');
const url = require('url');
const query = require('querystring');

const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);
  console.log(request.body);

  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const path = parsedUrl.pathname;

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<div>Bop</div>");
  response.end();
};

http.createServer(onRequest).listen(port);
console.log("Listening on 127.0.0.1: " + port);
