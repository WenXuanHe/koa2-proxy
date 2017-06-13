import xtag from 'x-tag';
import { addOne } from '../addOne';
import thrities from '../thrities';

xtag.register('x-praise', {
  extends: 'span',
  content: '<button class="thumb">点赞</button>',
  lifecycle:{
    created: function(){

        this.thrities = thrities(addOne('/proxy'));
    }
  },

  methods:{

    praiseClick(elem) {

        this.thrities(this['data-id']).then((res)=>{
            this['data-id'] = ++this['data-id'];
            ////渲染页面
            this.render(elem);
        }).catch(function (err) {
            alert(err.message);
        });
    },
    render(elem){
        elem.parentNode.previousSibling.previousElementSibling.innerText = this['data-id'];
    }
  },

  accessors:{
    'data-id':{
        attribute:{
            value:0
        },
        get: function(){
            return this.value;
        },
        set: function(value){
            this.value = value;
        }
    },

  },

  events:{
    click:function(e){
        this.praiseClick(e.target);
    }
  }
});
