var request = require('request');
var querystring = require('querystring');

module.exports = function({url, data}) {
    url = url + "?" + querystring.stringify(data);
    return new Promise(function(resolve, reject) {
        request.get(url, function(err, response, body) {
            let res = {
                code: err ? 0 : 1,
                err
            }
            if (!err) {
                try {
                    res.result = JSON.parse(body);
                } catch (e) {
                    reject(e);
                }
            }
            resolve(res);
        })

    });

}
