var request = require('request');

module.exports = function ({ url, data }) {

    return new Promise(function (resolve, reject) {
        request.post(url, {
            form:data
        }, function (error, response, body) {
            try{
                body = JSON.parse(body);
                resolve(body);
            }catch(e){
                reject(e);
            }

        });
    });

}
