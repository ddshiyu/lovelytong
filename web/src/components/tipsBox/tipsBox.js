import tipsBox from './index.vue'
import Vue from 'vue'

const tips = options => {
  const tipsConstructor = Vue.extend(tipsBox)
  options = options || {}
  if(typeof options === 'string') {
    options = {
      tip: options
    }
  }
  const instance = new tipsConstructor({
    data: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  if(options.tip) {
    instance.visible = true
  }
  setTimeout(() => {
    instance.visible = false
  }, 1001)
  return instance
}

['success', 'error'].forEach((type) => {
  tips[type] = options => {
    if(typeof options === 'string') {
      options = {
        tip: options
      }
    }
    options.type = type
    return tips(options)
  }
})


export default tips