import { addOne } from '../addOne';
import thrities from '../thrities';

xtag.register('x-star', {

  content: `<div class="star">五角星点赞</div>`,

  lifecycle:{
    created: function(){
        this.thrities = thrities(addOne('/proxy'));
    }
  },
  methods:{

    praiseClick(elem) {

        this.thrities(this['data-id']).then((res)=>{
            this['data-number'] = ++this['data-number'];
            ////渲染页面
            // this.render(elem);
        }).catch(function (err) {
            alert(err.message);
        });
    }
  },
  events:{
    click:function(e){
        if(e.target.className === 'star'){
            this.praiseClick(e.target);
        }
    }
  }
});
