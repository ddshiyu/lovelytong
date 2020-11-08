<template>
  <div class="header">
    <div class="container pc-header d-flex ai-center">
      <div class="logo">
        <router-link to='/'>
          <h1>logo</h1>
        </router-link>
      </div>
      <ul class="d-flex ml-5 reco-list">
        <li v-for='(item, index) in tabTitle' class="px-4" :class="{'is-active':tabIndex===index}" :key='index' @click='changeTab(item.route, index)'>{{item.title}}</li>
      </ul>
      <!-- <div class="ml-6 fs-s">{{time}}</div> -->
      <!-- <div v-if='userInfo' class="avatar d-flex ai-center">
        <span class="fs-s mr-2">{{userInfo.name}}</span>
        <div @click="loginOut">
          <img class="cur" width='32' height='32' v-lazy="userInfo.avatar_url" alt="">
        </div>
      </div>
      <div v-else class="d-flex flex-1 jc-center">
        <div class="fs-xs" v-if='loginNow'>{{loginInfo}}</div>
        <button type='button' class="btn text-white" @click="login" v-else>登录</button>
      </div> -->
    </div>
    <!-- 移动端 -->
    <div class="phone-header">
      <div class="mask" v-show='showPhoneHeaderTitle'></div>
      <div class="d-flex jc-between">
        <div class="burger px-4 d-flex f-column jc-center" @click.stop='showPhoneHeaderTitle=true'>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div class="mr-5 d-flex ai-center">
          <div v-if='userInfo' class="avatar d-flex ai-center">
            <span class="fs-s mr-2">{{userInfo.name}}</span>
            <div @click="loginOut">
              <img class="cur" width='32' height='32' v-lazy="userInfo.avatar_url" alt="" >
            </div>
          </div>
          <div v-if='!userInfo' class="d-flex flex-1 jc-center">
            <div class="fs-xs" v-if='loginNow'>{{loginInfo}}</div>
            <button type='button' class="btn text-white" @click="login" v-else>登录</button>
          </div>
        </div>
      </div>
      <transition name='drawerTab'>
        <div class="drawer bg-white pt-6 t-center" v-show='showPhoneHeaderTitle' v-click-outside="onClickOutside">
          <img height='64' src="@/assets/logo4.png" alt="">
          <ul class="">
            <li v-for='(item, index) in tabTitle' class="px-4" :class="{'is-active':tabIndex===index}" :key='index' @click='changeTab(item.route, index)'>{{item.title}}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { validateTime } from '@/utils/validate.js'
import { login } from '@/api/login'
import tip from '@/components/tipsBox'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
const clientId = '663c17b91af374a10228'
const clientSecret = '1bb80040a8e45fb481b733f2f365d064665372e9'
export default {
  data() {
    return {
      time: '',
      tabTitle: [
        {
          title: '标题1',
          route: '/'
        },
        {
          title: '标题1',
          route: '/blog'
        },
        {
          title: '标题1',
          route: '/tools'
        },
        {
          title: '标题1',
          route: '/issue'
        },
        {
          title: '标题1',
          route: '/course'
        },
        {
          title: '标题1',
          route: '/about'
        }
      ],
      tabIndex: null,
      code: '',
      showPhoneHeaderTitle: false,
      userInfo: '',
      loginNow: false,
      loginInfo: ''
    }
  },
  computed: {
  },
  created() {
    
  },
  mounted() {
    if(localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo)
    }
    this.getUser()
    if(this.code) {
      this.loginNow = true
        this.loginInfo = '正在登录...'
        login(this.code).then(res => {
          this.loginNow = false
          this.$tips.success('登录成功')
          const {name, avatar_url, id} = res.data
          this.userInfo = res.data
          this.setUserInfo(res.data)
          window.localStorage.userInfo = JSON.stringify({name, avatar_url, id})
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
          this.$message('登录失败，可能是github服务器的问题')
          this.loginInfo = '登录失败'
          this.$router.push('/')
        })
    }
    this.timeInterval = setInterval(() => {
      this.time = validateTime(new Date())
    },1000);
  },
  beforeDestroyed() {
    this.timeInterval = null
  },
  methods: {
    ...mapActions(['setUserInfo']),
    changeTab(route, i) {
      if(this.tabIndex === i) {
        return
      }
      this.tabIndex = i
      this.$router.push(route)
      this.showPhoneHeaderTitle = false
    },
    login() {
      const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
      window.location.href = url
    },
    getUser() {
      var result = location.search.match(new RegExp("[\?\&]" + 'code' + "=([^\&]+)","i"));
      if(result == null || result.length < 1){
        return
      }
      this.code = result[1]
    },
    onClickOutside() {
      this.showPhoneHeaderTitle = false
    },
    loginOut() {
      this.$tips.success('退出成功')
      window.localStorage.clear()
      this.userInfo = null
      this.$router.push('/')
    }
  },
  watch: {
    $route(to, from) {
      this.tabTitle.forEach((item, index) => {
      let reg = new RegExp(item.route.slice(1))
      if(reg.test(to.path)) {
        this.tabIndex = index
      }
    })
    }
  }
}
</script>

<style lang='scss' scoped>
  .header {
    width: 100vw;
    height: 64px;
    line-height: 64px;
    background: #fff;
    box-shadow: 0 0 5px 2px #e5e5e5;
  }
  .reco-list li {
    height: 62px;
    position: relative;
    cursor: pointer;
    &.is-active {
      border-bottom: 2px solid #000;
    }
    &:not(.is-active)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: #000;
      width: 0;
      margin: 0 auto;
      transition: all .5s;
    }
    &:not(.is-active):hover::after{
      width: 100%;
    }
  }
  .avatar {
    margin: 0 auto;
    img {
      border-radius: 50%;
    }
  }


  .phone-header {
    .drawer {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 50vw;
      z-index: 10000;
    }
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0,0,0,.2);
    }
    .burger {
      width: 50px;
      height: 64px;
      line-height: 64px;
      p {
        height: 2px;
        margin-top: 2px;
        background: #000;
      }
    }
    img {
      margin: 0 auto;
    }
  }
  .drawerTab-enter-active {
    animation: drawerTab-ani .5s;
  }
  .drawerTab-leave-active {
    animation: drawerTab-ani .5s reverse;
  }
  @keyframes drawerTab-ani {
    0% {
      transform: translateX(-50vw);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>