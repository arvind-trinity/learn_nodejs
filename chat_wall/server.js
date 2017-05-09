/* server code */

//const http = require('http');
const fs = require('fs');
const port = 8080;
const htmlFileName = './chat_wall.html';
const express = require('express');
const bodyParser = require('body-parser');
const chatHandler = express();

chatHandler.use(bodyParser.urlencoded({ extended: true}));

fs.readFile (htmlFileName, function(err, html) {
  if (err) {
    console.log(`file read error ${err}`)
  }

  chatHandler.get('/', function (request, response) {
    console.log(request.url);
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  })
})

chatHandler.post('/send_message', function(request, response) {
  console.log("got post");
  console.log(request.body.message);
  response.send('You sent the msg ' + request.body.message);
})

chatHandler.listen(port, function(err) {
  if (err) {
    return console.log('Not Good', err)
  }
  console.log(`server is listening on port ${port}`)
})

