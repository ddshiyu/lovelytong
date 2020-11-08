<template>
  <div class='mt-6'>
    
    <div class="container">
      <p class="py-3 bg-white mb-2 fs-s px-4"><b>该数据确实仅应用测试，查看更多点击<a href='https://gank.io/'><font color='lightblue'>这里</font></a></b></p>
      <div class="px-4 py-4 card-wrap bg-white">
        <div class="wrap" v-for='item in LearningData' :key='"learn-"+item._id'>
          <img width="100%" v-lazy="item.images[0]" alt="">
          <p class="py-3 px-5">{{item.desc}}</p>
        </div>
      </div>
      <loading v-if='!LearningData.length || loadingFlag'></loading>
    </div>
    <div class="container t-center py-6 bg-white" v-if='flag'><b>不是吧，你居然还想看，去<a href='https://gank.io/'><font color='lightblue'>这里</font></a>吧</b></div>
  </div>
</template>

<script>
import { getLearningData } from '@/api/recommend'
// import { debounce } from '@/utils/bebounceAndThrottle'
import loading from '@/components/loading'
export default {
  data() {
    return {
      LearningData: [],
      page: 1,
      flag: false,
      loadingFlag: false
    }
  },
  components: {
    loading
  },
  created() {
    this.fetchData()
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if(scrollHeight > clientHeight && (scrollTop + clientHeight >= scrollHeight) && !this.flag) {
        this.fetchData()
      }
    })
  },
  methods: {
    async fetchData() {
      const res = await getLearningData(this.page)
      this.LearningData.push(...res.data.data)
      if(res.data.data.length) {
        this.page ++
      }else {
        this.flag = true
      }
    },
  },
  watch: {
    LearningData() {
      this.loadingFlag = true
    },
    flag(newVal) {
      if(newVal === true) {
        this.loadingFlag = false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.card-wrap {
  column-count: 3;
  img {
    margin: 0 auto;
  }
  .wrap {
    position: relative;
    break-inside: avoid;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.3);
    margin-bottom: 24px;
    &:hover::after {
      display: block;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0 ,0, .2);
      z-index: 1;
      display: none;
    }
  }
}
</style>