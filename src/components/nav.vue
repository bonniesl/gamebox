<template>
  <div>
    <!-- 底部导航 -->
	<div class="footerNav">
		<ul class="footerNavBox clearfix">

      <router-link to = "index" tag="li" class="elem fl">
          <a href="#">
					<i class="navIcon"></i>
					<span>首页</span>
				</a>
      </router-link>
			
			<router-link to = "game" tag="li" class="elem fl">
          <a href="#">
					<i class="navIcon navIcon02"></i>
					<span>游戏</span>
				</a>
      </router-link>
			<router-link to = "recharge" tag="li" class="elem fl">
          <a href="#">
					<i class="navIcon navIcon03"></i>
					<span>充值</span>
				</a>
      </router-link>
      <router-link to = "gift" tag="li" class="elem fl">
          <a href="#">
					<i class="navIcon navIcon04"></i>
					<span>礼包</span>
				</a>
      </router-link>
       <router-link to = "mypage" tag="li" class="elem fl">
          <a href="#">
					<i class="navIcon navIcon05"></i>
					<span>我的</span>
				</a>
      </router-link>
			
		</ul>
	</div>

  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

