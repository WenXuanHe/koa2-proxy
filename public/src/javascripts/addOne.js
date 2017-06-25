export const addOne = function (proxy_url) {
    if (typeof axios.post === 'undefined') {
        alert('axios is not exit');
        return;
    }
    var param = {
        url: 'http://localhost/thumb_php/thumb.php',
        type: 'POST',
        data: {}
    };
    return function (id) {
        param.data.id = id;
        return axios.post(proxy_url, param).then(function (res) {
            res = res.data;
            if (!res.code) {
                alert(res.message);
                return;
            }
            return res;
        })
    }
};
