<template>
  <div class="mt-6">
    <div class="container bg-white d-flex jc-around py-3">
      <div class="md md-item">
        <h3 class="mb-3">md</h3>
        <textarea cols="30" rows="10" v-model="mdData"></textarea>
      </div>
      <div class="html md-item">
        <h3 class="mb-3">html</h3>
        <textarea cols="30" rows="10" v-model="htmlData"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import markdown from '@/utils/markdown.js'
export default {
  data() {
    return {
      mdData: '',
      htmlData: ''
    }
  },
  watch: {
    mdData(newVal, oldVal) {
      if(newVal === '') {
        this.htmlData = ''
        return
      }
      const content = markdown.marked(newVal)
      content.then(res => {
        this.htmlData = res.content
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.md-item {
  width: 40%;
}
textarea {
  min-width: 100%;
  max-width: 100%;
  border-radius: 4px;
  min-height: 302px;
  max-height: 630px;
}
</style>