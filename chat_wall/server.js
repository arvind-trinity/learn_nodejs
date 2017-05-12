/* server code */

const fs = require('fs');
const port = 8080;
const htmlFileName = './chat_wall.html';
const chatMessagesFile = './chat_messages.txt';
const express = require('express');
const bodyParser = require('body-parser');
const chatHandler = express();
var html = fs.readFileSync(htmlFileName, "utf8"); // blocking read
//TODO: initialize the html page with old messages
//var messages = fs.readFileSync(chatMessagesFile, "utf8"); // blocking read

chatHandler.use(bodyParser.urlencoded({ extended: true}));

chatHandler.get('/', function (request, response) {
  console.log(request.url);
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write(html);
  response.end();
})

chatHandler.post('/send_message', function(request, response) {
  var message = request.body.message;
  message.replace(/([^\r])\n/g, "$1\r\n");
  console.log("got post");
  console.log(message);

  // write to file
  fs.appendFile(chatMessagesFile, request.body.message + "\r\n", function(err) {
    if (err) {
      return console.log(`file writing failed ${err}`);
    }
    console.log("wrote msg to file");

    //TODO: send this message to client
  })

  var messages = fs.readFileSync(chatMessagesFile, "utf8"); // blocking read
  messages.replace(/([^\r])\n/g, "$1\r\n");
  console.log(`sending POST data ${messages}`);
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write(messages);
  response.end();
})

chatHandler.listen(port, function(err) {
  if (err) {
    return console.log('Not Good', err)
  }
  console.log(`server is listening on port ${port}`)
})

