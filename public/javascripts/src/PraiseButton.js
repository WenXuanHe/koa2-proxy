import './common/jquery.min.js';
import axios from 'axios';

export default class PraiseButton {

    constructor(num, elem) {
        this.num = num;
        this.elem = elem;
    }

    //加一操作
    addOne(proxy_url) {
        if(typeof axios.post === 'undefined') {
            alert('axios is not exit');
            return;
        }
        var param = {
            url:'http://localhost/thumb_php/thumb.php',
            type:'POST',
            data:{}
        };
        return function(id){
            param.data.id = id;
            return axios.post(proxy_url, param);
        }
    }

    praiseClick(elem) {
        var addOne = this.addOne('/proxy');
        var self = this;
        var canRun = true;
        $(this.elem).off('click').on('click', function() {
            if(!canRun) return;
            canRun = false;
            var id = $(this).parent().data('id');
            var $elem = $(this).parent().find(elem);
            addOne(id)
                .then(function(res) {
                    res = res.data;
                    if(!res.code){
                         alert(res.message);
                         return;
                    }
                    self.num = res.result.number;
                    ////渲染页面
                    self.render($elem);
                    canRun = true;
                })
                .catch(function(err) {
                    alert(err.message);
                    canRun = true;
                });

        });
    }

    //新建一个动作执行渲染页面，把动作分开
    render($elem) {
        $elem.text(this.num);
    }
}
