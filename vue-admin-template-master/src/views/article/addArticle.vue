<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="标签：">
        <el-select v-model="form.tags" multiple placeholder="请选择">
          <el-option
            v-for="item in allTags"
            :key="item.title"
            :label="item.title"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="首图地址：">
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
      <el-form-item label="正文：">
        <div class="editor-container">
          <markdown-editor ref="markdownEditor" v-model="form.content" height="1500px" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTag } from '@/api/tag'
import { updateArticle, createArticle, getArticleById } from '@/api/article'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'AddArticle',
  components: {
    MarkdownEditor
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: String
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        tags: '',
        content: '',
        imageUrl: ''
      },
      allTags: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchTags()
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.form.imageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(file) {
      console.log(file)
      this.form.imageUrl = file.url
    },
    async fetchData() {
      const res = await getArticleById(this.id)
      this.form = res.data
    },
    async onSubmit() {
      let res
      console.log(this.form)
      if (this.id) {
        res = await updateArticle(this.form, this.id)
      } else {
        res = await createArticle(this.form)
      }
      this.$router.push('/article/showArticle')
    },
    onCancel() {
      console.log(this.$refs.markdownEditor.getHtml())
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    async fetchTags() {
      const res = await getTag()
      this.allTags = res.data
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

