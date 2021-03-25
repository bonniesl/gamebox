/*
	Created by linxin
	https://github.com/lin-xin/vue-toast/blob/master/lib/index.js
*/

var Toast = {};
Toast.install = function (Vue, options) {
    var opt = {
        defaultType:'bottom',
        duration:'2000'
    }
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function(tips,type, cb){

        var curType = type ? type : opt.defaultType;

        if(document.querySelector('.lx-toast')){
            // 如果toast还在，则不再执行
            return;
        }
        var toastTpl = Vue.extend({
            template: '<div class="lx-toast lx-toast-'+ curType +'">' + '<span>' + tips + '</span>' + '</div>'
        });
        var tpl = new toastTpl().$mount().$el;
        document.body.appendChild(tpl);
        setTimeout(function () {
            document.body.removeChild(tpl);

            //增加回调
            if (cb && typeof cb === 'function') cb()
        }, opt.duration)
    };
    ['bottom', 'center', 'top'].forEach(function(type) {
        Vue.prototype.$toast[type] = function(tips, cb) {
            return Vue.prototype.$toast(tips,type, cb)
        }
    });

    Vue.prototype.$loading = function(tips,type) {
        var load = document.querySelector('.lx-load-mark');
        
        if(type == 'close'){
            load && document.body.removeChild(load);
        }else{
            if(load){
                // 如果loading还在，则不再执行
                return;
            }
            var loadTpl = Vue.extend({
                template: '<div class="lx-load-mark">\
                            <div class="lx-load-box">\
                                <div class="lx-loading">\
                                    <div class="loading_leaf loading_leaf_0"></div>\
                                    <div class="loading_leaf loading_leaf_1"></div>\
                                    <div class="loading_leaf loading_leaf_2"></div>\
                                    <div class="loading_leaf loading_leaf_3"></div>\
                                    <div class="loading_leaf loading_leaf_4"></div>\
                                    <div class="loading_leaf loading_leaf_5"></div>\
                                    <div class="loading_leaf loading_leaf_6"></div>\
                                    <div class="loading_leaf loading_leaf_7"></div>\
                                    <div class="loading_leaf loading_leaf_8"></div>\
                                    <div class="loading_leaf loading_leaf_9"></div>\
                                    <div class="loading_leaf loading_leaf_10"></div>\
                                    <div class="loading_leaf loading_leaf_11"></div>\
                                </div>\
                                <div class="lx-load-content">'+tips+'</div>\
                            </div>\
                            </div>'
            });
            var tpl = new loadTpl().$mount().$el;
            document.body.appendChild(tpl);
        }
    };

    ['open', 'close'].forEach(function(type) {
        Vue.prototype.$loading[type] = function(tips) {
            return Vue.prototype.$loading(tips,type)
        }
    });
}


// 自动安装  ，有了ES6就不要写AMD，CMD了
if(typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Toast)
};
 
export default Toast;