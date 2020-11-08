<template>
  <div class='mt-6'>
    <div class="container d-flex">
      <div class="content bg-white pl-3">
        <p class='t-center' v-if='loadEnd'>- - - - - 没有东西哦 - - - -</p>
        <loading v-if='isLoad'></loading>
        <div>
          <div class="content-item d-flex pt-4 pb-7 cur" v-for='article in articles' :key='article._id' @click='articleClick(article)'>
            <div>
              <img width="200" height="130" :src="article.imageUrl" alt="">
            </div>
            <div class="px-3">
              <h3 class="mb-2">{{article.title}}</h3>
              <div class="fs-s text-article-content article">
                {{article.desc}}
              </div>
              <div class="d-flex mt-2 fs-xs">
                <div class="bottom-item">查看 {{article.view}}</div>
                <div class="bottom-item">评论 {{article.comment}}</div>
                <div class="bottom-item articleLike">点赞 0</div>
                <div class="bottom-item articleTime">{{article.createTime | timeFilter}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <div class="recommend-read bg-white mb-7">
          <right-mess title='推荐阅读' :hotMess='hotArticles'></right-mess>
        </div>
        <div class="bg-white">
          <item-header title='标签云'></item-header>
          <div class="tag px-3 py-4 fs-s">
            <div class="d-flex f-wrap">
              <p class="py-1 px-4 mr-3 mb-3 cur" @click='fetchData'>全部</p>
              <p class="py-1 px-4 mr-3 mb-3 cur" v-for="tag in tags" :key='tag._id' @click='selectArticle(tag._id)'>{{tag.title}}</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getArticles, getTags, getArticleByTag } from '@/api/blog.js'
import itemHeader from '@/components/ItemHeader'
import rightMess from '@/components/rightMess'
import loading from '@/components/loading'
export default {
  data() {
    return {
      articles: [],
      tags: [],
      hotArticles: [],
      isLoad: false,
      loadEnd: false
    }    
  },
  components: {
    itemHeader,
    rightMess,
    loading
  },
  created() {
    this.fetchData()
  },
  computed: {
  },
  methods: {
    async fetchData() {
      this.isLoad = true
      const allArticles = await getArticles()
      this.isLoad = false
      const allTags = await getTags()
      this.articles = allArticles.data
      this.tags = allTags.data
      this.hotArticles = this.articles.slice(0).sort((a, b) => b.view - a.view)
    },
    articleClick(article) {
      this.$router.push({path: '/blog/articleDetail', query:{id: article._id}})
    },
    async selectArticle(tagId) {
      this.isLoad = true
      const res = await getArticleByTag(tagId)
      this.isLoad = false
      this.articles = res.data
    }
  },
  watch: {
    articles(newVal) {
      if(!newVal.length) {
        this.loadEnd = true
      }else {
        this.loadEnd = false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '@/styles/mixin.scss';
  .content-item {
    transition: all .5s ease-in-out;
    @include border(bottom, #d2d2d2, 1px);
    &:hover {
      box-shadow: 0px 0px 10px rgba(0,0,0, .5)
    }
  }
  .article {
    line-height: 1.6;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    text-overflow: ellipsis;
    letter-spacing: 2px;
  }
  .bottom-item {
    margin-right: 20px;
  }
  .tag {
    h2 {
      color: #337ab7;
    }
    p {
      background: #f3f6f3;
      border-radius: 16px;
      &:hover {
        background: #AED9F9;
      }
    }
  }
</style>