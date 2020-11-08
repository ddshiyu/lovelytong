<template>
  <div>
    <textarea class="w100 py-2 px-3" v-model='content' :placeholder="contentPlaceholder"></textarea>
    <div class="t-right my-4"><button class="btn send-comment text-white" @click="sendComment">发送</button></div>
    <div class="comment-wrapper w100 bg-white p-5">
      <div class='t-center py-4' v-if='!comments.length'>还没有评论哦！沙发等着你</div>
      <div class="comment-item w100 p-5 mb-4" v-for='comment in comments' :key='comment._id' v-else>
        <div class="user d-flex mb-3">           
          <img width='32' height='32' v-lazy="comment.webUser.avatar" alt="">
          <span class="ml-2">{{comment.webUser.name}}</span>
        </div>
        <div class="comment-detail mb-3 fs-s">
          {{comment.content}}
        </div>
        <div class="time d-flex jc-between fs-xs">
          <div class="text-article-content">2020-07-02 10:22</div>
          <!-- <div>赞 5</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/messageBox/messageBox.js'
export default {
  data() {
    return {
      content: '',
    }
  },
  props: {
    comments: {
      type: Array,
      default: []
    },
    contentPlaceholder: {
      type: String,
      default: '✎文明用语，希望留下你的足迹...'
    }
  },
  computed: {
    // comContentPlaceholder() {
    //   if(this.$route.path === '/issue') {
    //     return '✎哪里做的不好的地方或者有好的建议，希望大家可以在这里提出来...'
    //   }else {
    //     return '✎文明用语，希望留下你的足迹...'
    //   }
    // }
  },
  methods: {
    sendComment() {
      // this.content = this.content.replace(/\s+/g, '')
      if(!localStorage.userInfo) {
        this.$message('您还没有登录哦')
        return
      }
      if(this.content === '') {
        this.$message('内容不能为空哦😯')
        return
      }     
      this.$emit('sendCommentClick', this.content)
      this.content = ''
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
  textarea {
    min-width: 100%;
    max-width: 100%;
    border-radius: 4px;
    min-height: 102px;
    max-height: 430px;
    border-color: #ccc;
    transition: all .5s;
    &:focus {
      border-color: #000;
      box-shadow: 0 0 4px 2px rgba(0,0,0, .2)
    }
  }
  textarea:hover {
    border-color: #000;
  }
  .send-comment {
    &:hover {
      background: #000;
      color: #fff;
    }
    transition: all .6s;    
  }
  .comment-item {
    box-shadow: 0 0 3px #e5e5e5;
  }

  .user {
    line-height: 32px;
    img {
      border-radius: 50%;
    }
  }
  .comment-detail {
    line-height: 25px;
  }
</style>