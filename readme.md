使用coa2框架，搭建一个转发请求的node中间代理层：
所有的请求都走post的方式到/proxy中来，根据传入的参数来代理到其他服务器

压力测试：
1.node --inspect app.js 
2.复制到浏览器， start
3.while(true); do curl "http://localhost:3000"; done;
