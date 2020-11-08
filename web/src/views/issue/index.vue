<template>
  <div class="mt-6">
    <div class="container">
      <div class="content">
        <comment @sendCommentClick='sendIssue' :comments='issues' contentPlaceholder='✎哪里做的不好的地方或者有好的建议，希望大家可以在这里提出来...'></comment>
      </div>
    </div>
  </div>
</template>

<script>
import comment from '@/components/comment'
import { getIssue, saveIssue } from '@/api/issue'
export default {
  data() {
    return {
      issues: []
    }
  },
  components: {
    comment
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getIssue()
      this.issues = res.data
    },
    async sendIssue(content) {
      const params = { webUser: JSON.parse(localStorage.userInfo).id, content: content }
      await saveIssue(params)
      const res = await getIssue()
      this.issues = res.data
    }
  }
}
</script>

<style>

</style>