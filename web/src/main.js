import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import '@/assets/fonts/iconfont.css'
import VueLazyload from 'vue-lazyload'
import message from '@/components/messageBox/messageBox.js'
import tips from '@/components/tipsBox/tipsBox.js'
import vClickOutside from 'v-click-outside'
Vue.prototype.$tips = tips
Vue.use(vClickOutside)
Vue.prototype.$message = message
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/timg.jpeg'),
  loading: require('./assets/timg.gif'),
  attempt: 1
})
console.log(process.env.BASE_URL)  
import { validateTime } from '@/utils/validate.js'

Vue.filter('timeFilter', (time) => {
  return validateTime(time)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
