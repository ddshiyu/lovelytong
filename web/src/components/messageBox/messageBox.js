import messageBox from './index.vue'
import Vue from 'vue'
// const message = {
//   install: function(Vue) {
//     const messageContructor = Vue.extend(messageBox)

//     const instance = new messageContructor()

//     instance.$mount(document.createElement('div'))
//     document.body.appendChild(instance.$el)

//     Vue.prototype.$message = (text, duration=5000) => {
//       instance.text = text
//       instance.visible = true
//       // setTimeout(() => {
//       //   instance.visible = false
//       // }, duration)
//     }
//   }
// }

const message = options => {
  const messageContructor = Vue.extend(messageBox)
  options = options || {}
  if(typeof options === 'string') {
    options = {
      text: options
    }
  }
  const instance = new messageContructor({
    data: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  if(options.text) {
    instance.visible = true
  }
  return instance
}

export default message