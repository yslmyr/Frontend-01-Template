const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(req.headers);
    res.setHeader('X-foo', 'sd')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<html maaa=a >
    <head>
        <style>
    body div #myid{
        width:100px;
        background-color: #ff5000;
    }
    body div #myid{
        width:100px;
        background-color: red;
    }
    body div img{
        width:30px;
        background-color: #ff1111;
    }
        </style>
    </head>
    <body>
        <div>
            <img id="myid"/>
            <img />
        </div>
    </body>
    </html>
    `);
});
server.listen(8088);