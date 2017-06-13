'use strict';

var router = require('koa-router')();
var request = require('request');
var post_proxy = require('../../helper/post');
var get_proxy = require('../../helper/get');

router.get('/index/index', async function (ctx, next) {
    //刷新页面
    var proxyData = {
        url: 'http://localhost/thumb_php/thumb.php',
        data: {
            id: 1
        }

    };
    var result = await get_proxy(proxyData);
    return ctx.render('index', {
        title: 'koa2 page',
        members: result
    });
});

//代理请求
router.post('/proxy', async function (ctx, next) {

    //判断请求的类型
    var body = ctx.request.body;
    var result;

    if (body.type.toUpperCase() === 'POST') {

        result = await post_proxy(body);
    } else if (body.type.toUpperCase() === 'GET') {

        result = await get_proxy(body);
    } else {

        ctx.body = JSON.stringify({
            code: 0,
            message: '请使用get或post方式请求'
        });
        return;
    }
    ctx.body = {
        code: 1,
        result: result
    };
});

module.exports = router;