var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;//cpu的数量

// 主线程
if(cluster.isMaster){
    require('os').cpus().forEach(function () {
        // todo
        cluster.fork();
    });

    //线程死亡时的提示
    cluster.on('exit', function (worker, code, signal) {
        // body...
        console.log('worker'+ worker.process.pid+' died');
    });

    cluster.on('listening', function (worker, address) {

    })

}else{
    http.createServer(function(req, res){
        response.writeHead(200);
        res.end('hello');

    }).listen(8080);
}
