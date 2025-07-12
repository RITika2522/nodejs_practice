const http = require('http');

const myserver = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello from server AGAIN!!');
});

myserver.listen(8000, () => console.log("Server started!"));
