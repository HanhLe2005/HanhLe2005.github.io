// requestServer.js file
const http = require("http");
const request = require("request");
var args = process.argv.slice(2);
const port = 1219;

http
  .createServer(function (req, res) {
    var url = args[0] ? args[0] : "https://HanhLe2005.github.io";
    request(url, function (error, response, body) {
      if (
        !body ||
        !response ||
        (error === null && response.statusCode !== 200)
      ) {
        res.end("bad URL\n");
        return;
      }
      if (response.statusCode === 200 && !error === true) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(body);
      } else {
        res.writeHead(response.statusCode, { "Content-Type": "text/plain" });
        res.write(error.toString());
      }
      res.end();
    });
  })
  .listen(port);
