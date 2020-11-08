<template>
  <transition name='fade'>
    <div class="message-wrap" v-if='visible'>
      <div class='message bg-white p-5'>
        <p class="pb-5">{{text}}</p>
        <div class="t-right mt-3"><button class="btn" @click="visible=false">确定</button></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      visible: false
    }
    // text: {
    //   type: String,
    //   default: '标题'
    // },
    // visiable: {
    //   type: String,
    //   default: false
    // }
  },
}
</script>

<style lang='scss' scoped>
.message-wrap {
  position: fixed;
  width: 100%;
  max-height: 100vh;
  z-index: 100;
  top: 0;
  margin: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0, .4);
  overflow: auto;
}
.message {
  width: 400px;
  margin: 200px auto;
  border-radius: 4px;
  p {
    font-weight: bold;
  }
}
button {
  background: #000;
  color: #fff;
  border-radius: 4px;
  outline: none;
}

.fade-enter-active {
  animation: fadeIn .5s;
}
.fade-leave-active {
  // animation: fadeIn .5s;
}

@keyframes fadeIn {
  0% {
    transform: scale(0)
  }
  50% {
    transform: scale(1.2)
  }
  100% {
    transform: scale(1)
  }
}
</style>