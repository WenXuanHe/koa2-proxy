import PraiseButton from './PraiseButton.js';
import './common/jquery.min.js';

class Thumb extends PraiseButton{
	constructor(){
		super(...arguments);
	}

	praise(elem){
		this.praiseClick(elem);
	}
}

/***
如何书写面向对象？
我把元素封装在了子类的内部，
这样不利于维护，要区分哪些是需要传O递的，
哪些是需要封装的，这个很重要
*/
$.extend({
	thumb : function(num, elem){
		return new Thumb(num, elem);
	}
});

const thumb = new Thumb(0, '.thumb');
thumb.praise('.count');
