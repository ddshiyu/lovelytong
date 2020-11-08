<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="正文：">
        <markdown-editor ref="markdownEditor" v-model="form.content" height="1300px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createAbout, getAboutById, updateAbout } from '@/api/about.js'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'AddAbout',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  props: {
    id: String
  },
  created() {
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getAboutById(this.id)
      this.form = res.data
    },
    async onSubmit() {
      if (this.id) {
        await updateAbout(this.form, this.id)
      } else {
        await createAbout(this.form)
      }
      this.$router.push('/about/showAbout')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

