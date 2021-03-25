<template>
    <div class="browser_tip">
        <img :src="picImg" />
    </div>
</template>

<script>
    export default {
        data(){
				return{
					picImg:''
				}
        },
        created() {
            this.picImg=urlConfig.static + '/hwiphone/dist/static/images/down_textTip.jpg'
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = /android/i;
            var android_type = true;
            var android_link="";

            //判断当前页面是否在微信浏览器中打开
            var is_weixin = function() {
                if(ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                }else{
                    return false;
                }
            }; 
           
            android_link =this.$route.parmars.pkg_url;
            console.log(android_link)
            if (!is_weixin()) {
                $(".browser_tip img").hide();
            }
			if(isAndroid.test(navigator.userAgent.toLowerCase()) && android_type) {
                
                 window.location.href=android_link;
				return;
            }
		    
        }
            
    }
</script>


