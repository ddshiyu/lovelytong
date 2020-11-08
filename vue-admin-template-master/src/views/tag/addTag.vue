<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <!-- <el-form-item label="地址：">
        <el-input v-model="form.address" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createTag, getTagById, updateTag } from '@/api/tag.js'
export default {
  name: 'AddTag',
  data() {
    return {
      form: {
        title: ''
        // address: ''
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
    handlePictureCardPreview() {

    },
    handleSuccess() {

    },
    async fetchData() {
      const res = await getTagById(this.id)
      this.form = res.data
    },
    async onSubmit() {
      let res
      if (this.id) {
        res = await updateTag(this.form, this.id)
      } else {
        res = await createTag(this.form)
      }
      this.$router.push('/tag/showTag')
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

