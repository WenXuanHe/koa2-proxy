////对接口的测试
const request = require('supertest');
const app = require('../app.js');////服务

describe('GET /index/index', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/index/index') ////接口
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
  	    if(res.body.title ==='koa2 page'){
          console.log(1111);
  	    	////执行dane才会成功
  	    	return done();
  	    }
	  });
  });
});