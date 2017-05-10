/* server code */

const fs = require('fs');
const port = 8080;
const htmlFileName = './chat_wall.html';
const chatMessagesFile = './chat_messages.txt';
const express = require('express');
const bodyParser = require('body-parser');
const chatHandler = express();
var html = fs.readFileSync(htmlFileName); // blocking read

chatHandler.use(bodyParser.urlencoded({ extended: true}));

chatHandler.get('/', function (request, response) {
  console.log(request.url);
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write(html);
  response.end();
})

chatHandler.post('/send_message', function(request, response) {
  console.log("got post");
  console.log(request.body.message);

  // write to file
  fs.appendFile(chatMessagesFile, request.body.message + "\n", function(err) {
    if (err) {
      return console.log(`file writing failed ${err}`);
    }
    console.log("wrote msg to file");
  })
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write(html);
  response.end();
})

chatHandler.listen(port, function(err) {
  if (err) {
    return console.log('Not Good', err)
  }
  console.log(`server is listening on port ${port}`)
})

