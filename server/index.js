const http = require('http');
// const fs = require('fs');
// const url = require('url');
const express = require('express');

const app = express();

app.get('/', (req,res) => {
    return res.send("Hello from home page");
});
app.get('/about',(req,res) =>{
    return res.send(` hello ${req.query.myname}`);
});

app.listen(8000, () => console.log("New Server started!"))

// const myServer = http.createServer(app);

/* const myserver = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Request received\n`;
    const myurl = url.parse(req.url,true);
    console.log(myurl);
    fs.appendFile('log.txt',log, (err,data) => {
        switch(myurl.pathname){
            case '/':
                if(req.method ==='GET'){
                    res.end("Home Page");
                } 
                break;
            case '/about': 
                const qp = myurl.query.myname;
                res.end(`HI ${qp}`);
                break;
            case '/signup':
                if(req.method ==='GET'){
                    res.end('This is a Sign up Form');
                }
                else if(req.method === 'POST'){
                    //DB QUERY
                    res.end("SUCCESS");
                }
            default: res.end("404 Not Found");
        }
    })
});
 */
// myServer.listen(8000, () => console.log("New Server started!"));
