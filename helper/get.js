var request = require('request');
var querystring = require('querystring');

module.exports = function ({ url, data }) {
    url = url + "?" + querystring.stringify(data);
    return new Promise(function (resolve, reject) {
        request.get(url, function (err, response, body) {
            if (err) {
                reject(err);
                return;
            }
            body = JSON.parse(body);
            resolve(body);
        })

    });

}
