<template>
  <div class="dsb-circle">
    <span v-if="isLoading">没有更多数据</span>
    <div class="loader-inner line-spin-fade-loader" v-else>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>

  module.exports = {
    props: {
      msg: '',
      isLoading: false
    }
  }

</script>

