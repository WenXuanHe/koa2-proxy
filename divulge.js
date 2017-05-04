var http = require('http');
var crypto = require('crypto');

http.createServer(function(req,res){
    var password = 'Aa111111';
    var salt = crypto.randomBytes(128).toString('base64');

    /**
     * 同步加密，内存泄漏
     */
    //var hash = crypto.pbkdf2Sync(password, salt, 10000, 512);

    /**
     * 异步加密， 无内存泄漏
     * @param  {[type]} err     [description]
     * @param  {[type]} hash){                     res.writeHead(200);        res.end('salt:'+salt);    } [description]
     * @return {[type]}         [description]
     */
    crypto.pbkdf2(password, salt, 10000, 512, function(err, hash){
        res.writeHead(200);
        res.end('salt:'+salt);
    });

}).listen(9999);
console.log('Server PID'+process.pid);
