<template>
  <div>
     
         <tophead></tophead>
        <!-- 登陆 -->
		<div class="main">
			<loginpage></loginpage>
		</div>
    


  </div>
</template>

<script>

import tophead from '../components/tophead'
import loginpage from '../components/loginpage'
export default {
  data(){
    return{
        
    }
  },
  components:{
    tophead,
    loginpage
  },
  methods:{
 
  }
}
</script>
