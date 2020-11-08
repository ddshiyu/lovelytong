<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="图标地址：">
        <el-upload
          :action="uploadUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <p>或者</p>
        <el-input v-model="form.imageUrl" />
        <img v-if="form.imageUrl" style="margin-top:20px;" width="150" :src="form.imageUrl" alt="">
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="form.imageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option
            v-for="item in allCategories"
            :key="item.title"
            :label="item.title"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRecommendById, createRecommend, updateRecommend } from '@/api/recommend.js'
import { getCategory } from '@/api/category'
export default {
  name: 'AddRecommend',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: String
  },
  data() {
    return {
      form: {
        title: '',
        url: '',
        category: '',
        imageUrl: ''
      },
      allCategories: [],
      dialogVisible: false
    }
  },
  created() {
    if (this.id) {
      this.fetchData()
    }
    this.fetchCategory()
  },
  methods: {
    async fetchCategory() {
      const res = await getCategory()
      this.allCategories = res.data
    },
    handlePictureCardPreview(file) {
      this.form.imageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(file) {
      console.log(file)
      this.form.imageUrl = file.url
    },
    async onSubmit() {
      // eslint-disable-next-line no-unused-vars
      let res
      if (!this.id) {
        res = await createRecommend(this.form)
      } else {
        res = await updateRecommend(this.form, this.id)
      }
      this.$router.push('/recommend/showRecommend')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    async fetchData() {
      const res = await getRecommendById(this.id)
      console.log(res)
      this.form = Object.assign({}, this.form, res.data)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

