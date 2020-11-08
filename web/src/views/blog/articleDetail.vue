<template>
  <div class="mt-6">
    <div class="container d-flex">
      <div class="content fs-s">
        <loading v-if='!flag'></loading>
        <div v-if='flag'>
          <h1 class="my-4">{{articleDetail.title}}</h1>
          <div class="bg-white p-2">
            <p>更新时间：{{articleDetail.createTime | timeFilter}}</p>
            <p v-if='articleDetail.tags'>标签：<span v-for='(tag, index) in articleDetail.tags' :key='index' class="mr-3 tag mt-2">{{tag.title}}</span></p>
          </div>
          <img class="my-5" width='100%' :src="articleDetail.imageUrl" alt="">
          <div class="article-content" v-html='articleDetail.content'>
          </div>
          <div class="py-2 sofa my-5">沙发等你来抢</div>
          <comment :article_id='articleDetail._id' :comments='comments' @sendCommentClick='sendComment'></comment>
        </div>
      </div>
      <div class="right">
        <div class="article-toc" v-html="articleDetail.toc"></div>
      </div>
      <transition name='fade'>
        <image-view v-if='imgUrl' :imgUrl='imgUrl' @handle-image-view='imgUrl=""'></image-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/blog.js'
import { getComment } from '@/api/comment.js'
import { getAbout } from '@/api/about'
import { sendComment } from '@/api/comment'
import loading from '@/components/loading'
import markdown from '@/utils/markdown.js'
import comment from '@/components/comment'
import imageView from '@/components/imageView'
export default {
  data() {
    return {
      articleDetail: {},
      flag: false,
      comments: [],
      imgUrl: ''
    }
  },
  components: {
    comment,
    loading,
    imageView
  },
  created() {
    this.fetchData()
  },
  mounted() {
    window.addEventListener('scroll', this.imgScroll)
  },
  methods: {
    async fetchData() {
      let res
      if(this.$route.path === '/about') {
        res = await getAbout()
      }else {
        const id = this.$route.query.id
        res = await getArticleDetail(id)
      } 
      this.articleDetail = res.data
      this.getArticleComment(res.data._id)
      const content = markdown.marked(res.data.content)
      content.then( response => {
        this.articleDetail.content = response.content
        this.articleDetail.toc = response.toc
        if(document.documentElement.clientWidth > 600 || document.body.clientWidth > 600) {
          this.$nextTick(() => {
            const img = document.getElementsByClassName('article-content')[0].getElementsByTagName('img')
            Array.from(img).forEach(item => {
              item.onclick =  () => {
                this.imgUrl = item.src
              }
            })
          })
        }
      })
    },
    async getArticleComment(article_id) {
      const res = await getComment(article_id)
      this.comments = res.data
    },
    async sendComment(content) {
      const params = {article_id: this.articleDetail._id, webUser: JSON.parse(localStorage.userInfo).id, content: content}
      await sendComment(params)
      const res = await getComment(this.articleDetail._id)
      this.comments = res.data
    },
    imgScroll() {
      this.imgUrl = ''
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', this.imgScroll)
      })
    }
  },
  watch: {
    articleDetail() {
      this.flag = true
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '@/styles/mixin.scss';
  .sofa {
    text-align: center;
    @include border(top, #ccc, 1px);
    @include border(bottom, #ccc, 1px);
  }
  .tag {
    background-color: #ecf5ff;
    border-color: #d9ecff;
    display: inline-block;
    padding: 0 10px;
    font-size: 12px;
    color: #409EFF;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>