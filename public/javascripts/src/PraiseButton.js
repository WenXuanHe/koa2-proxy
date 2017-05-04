import './common/jquery.min.js';
import axios from 'axios';

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

export default class PraiseButton {

    constructor(num, elem) {
        this.num = num;
        this.elem = elem;
    }

    //加一操作
    addOne(proxy_url) {
        addOne.call(this, proxy_url);
    }

    /**
     * 节流函数，在一定的时间范围内阻止请求
     * @param {*cb} 是一个返回promise的函数 
     */
    thrities(cb) {
        if (typeof cb !== 'function') throw 'cb must is a function';
        var canRun = true;
        return function () {
            if (!canRun) return;
            canRun = false;
            return cb.apply(this, arguments).then(function (res) {
                canRun = true;
                return res;
            });
        }
    }

    praiseClick(elem) {
        var self = this;
        var thrities = this.thrities(this.addOne('/proxy'));
        $(this.elem).off('click').on('click', function () {
            var id = $(this).parent().data('id');
            var $elem = $(this).parent().find(elem);
            thrities(id).then(function (res) {
                self.num = res.result.number;
                ////渲染页面
                self.render($elem);
            }).catch(function (err) {
                alert(err.message);
            });
        });
    }

    //新建一个动作执行渲染页面，把动作分开
    render($elem) {
        $elem.text(this.num);
    }
}
