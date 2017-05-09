/* server code */

const http = require('http')
const fs = require('fs')
const port = 8080
const htmlFileName = './chat_wall.html'

fs.readFile (htmlFileName, function(err, html) {
  if (err) {
    console.log(`file read error ${err}`)
  }

  http.createServer (function (request, response) {
    console.log(request.url)
    response.writeHeader(200, {"Content-Type": "text/html"})
    response.write(html)
    response.end()
  }).listen(port, (err) => {
    if (err) {
      return console.log('Not Good', err)
    }
    console.log(`server is listening on port ${port}`)
  })
})


