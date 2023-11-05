const fs = require('fs');

requestHandler = (req,res,html) =>{
    if(req.url === '/'){
        fs.readFile('./index.html', (err, html) => {
        if(err){
            throw err;
        } else if(html){
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/html');
                res.write(html);    
                res.end();  
        }
        });
    }
    if(req.url.includes('/message')){
        const body = [];
        req.on('data', (data) =>{
            console.log('data',data)
            body.push(data);
        })
        req.on('end',()=>{
            console.log('end');
            let parsedBody = Buffer.concat(body).toString();
            let message = parsedBody.split("=")[1];
            fs.writeFileSync('test.txt',message)
            res.setHeader('Location','/');
            res.statusCode = 200;
            return res.end();
        })
    }
}

module.exports = {'requestHandler':requestHandler};