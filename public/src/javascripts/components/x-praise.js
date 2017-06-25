import { addOne } from '../addOne';
import thrities from '../thrities';

xtag.register('x-praise', {

  content: `<div>
        <span data-name></span>
        <span class="count" data-number></span>
        <button class='thumb'>点赞</button>
    </div>`,

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

  accessors:{
    'data-id':{
        attribute:{
            id:0
        },
        get: function(){
            return this.id;
        },
        set: function(value){
            this.id = value;
        }
    },

    'data-number':{
        attribute:{
            number:0
        },
        get: function(){
            return this.number;
        },
        set: function(value){

            this.number = value;
            $(this).find('[data-number]').text(value);
        }
    },

    'data-name':{
        attribute:{
            name:''
        },
        get: function(){
            return this.name;
        },
        set: function(value){

            this.name = value;
            $(this).find('[data-name]').text(value);
        }
    },

  },

  events:{
    click:function(e){
        if(e.target.className === 'thumb'){
            this.praiseClick(e.target);
        }
    }
  }
});
