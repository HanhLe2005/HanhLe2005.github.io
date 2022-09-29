const http = require("http");
const port = process.argv[2];

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("I want a ");
  res.end("new Nintendo Switch");
  res.write("mcflurries are");
  res.end("the best");
}).listen(port);
console.log(process.argv);