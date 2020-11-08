<template>
  <div class="tip-wrap p-3" v-if="visible" :class="[`tips-${type}`]">
    <span class="mr-2 iconfont icon-gou tips-success_icon" v-if='type==="success"'></span>
    <span class="mr-2 iconfont icon-jiaochacross80 tips-error_icon" v-else></span>
    {{tip}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tip: '',
      type: ''
    }
  },
}
</script>

<style lang='scss' scoped>
.tip-wrap {
  width: 200px;
  border-radius: 4px;
  position: fixed;
  left: 50vw;
  animation: tips .5s;
  transform: translate(-50%);
  top:100px;
  background: #fff;
  box-shadow: 3px 3px 5px 0 rgba(0,0,0, .3);
}
@keyframes tips {
  0% {
    top:0;
  }
  100% {
    top:100px;
  }
}

// .tips-success {
//   background: lightblue;
// }
// .tips-error {
  
// }
.tips-success_icon {
  color: green;
}
.tips-error_icon {
  color: red;
}
</style>