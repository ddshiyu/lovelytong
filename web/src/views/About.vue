<template>
  <div>
    <article-detail></article-detail>
  </div>
</template>

<script>
import articleDetail from '@/views/blog/articleDetail'
import { getAbout } from '@/api/about'
export default {
  data() {
    return {
      about: {}
    }
  },
  components: {
    articleDetail
  },
  created() {
    
  },
  methods: {
    async fetchData() {
      const res = await getAbout()
      this.about = res.data
    }
  }
}
</script>

<style>

</style>
