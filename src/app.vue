<template>
<div class="hwpone_uccn">
      <router-view></router-view> 
    <Nav></Nav>
</div>
    

</template>

<script>

export default {   
  data(){
    return{
        
    }
  },
  components: {
     
  },
 created() {
      
 },
 mounted() {
    $(".loadingC").hide();  
    // this.$loading('加载中...', 'close');
  }
}
</script>
