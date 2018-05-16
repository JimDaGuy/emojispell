const http = require('http');
const url = require('url');
const query = require('querystring');

const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  //console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const path = parsedUrl.pathname;

  //    /?token=
  //    &team_id=T04S6SNC4
  //    &team_domain=cshrit
  //    &channel_id=CAQDXJK5F
  //    &channel_name=testgiraffe
  //    &user_id=U28N0PU5V
  //    &user_name=jimmydigrazia
  //    &command=%2Fgiraffe
  //    &text=woop
  //    &response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT04S6SNC4%2F364355253504%2FuVdJLS5TRNHf1T7a78MRDBfL
  //console.log(params.text);

  responses.spell(request, response, params);
};

http.createServer(onRequest).listen(port);
console.log("Listening on 127.0.0.1: " + port);
