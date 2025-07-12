const http = require('http');
const fs = require('fs');
const url = require('url');


const myserver = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Request received\n`;
    const myurl = url.parse(req.url,true);
    console.log(myurl);
    fs.appendFile('log.txt',log, (err,data) => {
        switch(myurl.pathname){
            case '/': res.end("Home Page");
                break;
            case '/about': 
                const qp = myurl.query.myname;
                res.end(`HI ${qp}`);
                break;
            default: res.end("404 Not Found");
        }
    })
});

myserver.listen(8000, () => console.log("New Server started!"));
