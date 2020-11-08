<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createExperience, getExperienceById, updateExperience } from '@/api/experience.js'
export default {
  name: 'AddExperience',
  data() {
    return {
      form: {
        title: '',
        desc: ''
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
      const res = await getExperienceById(this.id)
      this.form = res.data
    },
    async onSubmit() {
      let res
      if (this.id) {
        res = await updateExperience(this.form, this.id)
      } else {
        res = await createExperience(this.form)
      }
      this.$router.push('/experience/showExperience')
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

