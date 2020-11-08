<template>
  <div id="app">
    <top-header></top-header>
    <router-view class="router"></router-view>
    <bottom-footer v-if='$route.path !=="/recommend/item"'></bottom-footer>
    <transition name='fade'>
      <div class="to-Top cur" @click="handleToTop">
        <img v-if='showToTop' src="@/assets/backToTop.png" alt="" width="70">
      </div>
    </transition> 
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'
import bottomFooter from '@/components/footer'
export default {
  data() {
    return {
      showToTop: false
    }
  },
  components: {
    TopHeader,
    bottomFooter
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 100) {
        this.showToTop = true
      }else {
        this.showToTop = false
      }
    })
  },
  methods: {
    handleToTop() {
      let step = 50
      let timer = setInterval(() => {
        if(window.innerWidth > 600) {
          if(document.documentElement.scrollTop === 0) {
            clearInterval(timer)
            return
          }
        }else {
          if(document.body.scrollTop === 0) {
            clearInterval(timer)
            return
          }
        }
          step += 10
          document.documentElement.scrollTop ? document.documentElement.scrollTop -= step : document.body.scrollTop -= step
      },50)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  // width: 100%;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  .router {
    flex: 1;
  }
}
.to-Top {
  position: fixed;
  bottom: 40px;
  right: 10%;
  z-index: 10;
  transition: transform .5s;
  &:hover {
    transform: translateY(-10px);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
