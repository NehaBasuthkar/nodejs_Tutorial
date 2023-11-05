const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;
fs.readFile('./index.html', (err, html) => {
    if(err){
        throw err;
    } else if(html){
    const server = http.createServer((req, res) => {
        if(req.url === '/'){
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            res.write(html);    
            res.end();
        }
        const body = [];
        if(req.url.includes('/message')){
            req.on('data', (data) =>{
                console.log('data',data)
                body.push(data);
            })
            req.on('end',()=>{
                console.log('end');
                let parsedBody = Buffer.concat(body).toString();
                let message = parsedBody.split("=")[1];
                fs.writeFileSync('test.txt',message)
            })
            res.setHeader('Location','/');
            res.statusCode = 200;
            return res.end();
        }
    });
    server.listen(port, hostname, () => {
        console.log('Server started on port ' + port);
    });
}
});
