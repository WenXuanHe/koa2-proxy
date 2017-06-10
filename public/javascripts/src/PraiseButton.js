import './common/jquery.min.js';
import axios from 'axios';
import { addOne } from './addOne';
import thrities from './thrities';

export default class PraiseButton {

    constructor(num, elem) {
        this.num = num;
        this.elem = elem;
    }

    //加一操作
    addOne(proxy_url) {
        addOne.call(this, proxy_url);
    }

    praiseClick(elem) {
        var self = this;
        var thritie = thrities(addOne('/proxy'));
        $(this.elem).off('click').on('click', function () {
            var id = $(this).parent().data('id');
            var $elem = $(this).parent().find(elem);
            thritie(id).then(function (res) {
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
