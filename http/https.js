let https = require('https');
let fs = require('fs');

let options = {
  key: fs.readFileSync('ssh_key.pem'),
  cert: fs.readFileSync('ssh_cert.pem')
}

https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello word')
  })
  .listen(3000)
