<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="权重：">
        <el-input v-model="form.priority" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createCategory, getCategoryById, updateCategory } from '@/api/category.js'
export default {
  name: 'AddCategory',
  data() {
    return {
      form: {
        title: '',
        priority: ''
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
      const res = await getCategoryById(this.id)
      this.form = res.data
    },
    async onSubmit() {
      let res
      if (this.id) {
        res = await updateCategory(this.form, this.id)
      } else {
        res = await createCategory(this.form)
      }
      this.$router.push('/category/showCategory')
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

