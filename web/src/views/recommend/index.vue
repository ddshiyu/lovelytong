<template>
  <div class="mt-6">
    <div class="container d-flex">
      <div class="content">
        <div>
          <loading v-if='showLoading'></loading>
          <div class="bg-white reco-wrap mb-5" v-for="item in category" :key="item._id">
            <div>
              <item-header :title='item.title'></item-header>
            </div>
            <div class="p-4">
              <ul class="reco-item-wrap d-flex f-wrap">
                <li class="d-flex ai-center px-5 fs-s" v-for="reco in item.reco" :key="reco._id">
                  <a :href='reco.url' class="d-flex ai-center t-center px-4" target="_blank" rel='noopener noreferrer'>
                    <img class="" v-lazy="reco.imageUrl" width="20" alt="">
                    <span  class="ml-5">{{reco.title}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="userCard"></div>
        <div class="hotMess bg-white mb-6">
          <right-mess :hotMess='hotMess' title='v2热点'></right-mess>
        </div>
        <router-link to='/recommend/item' class="ganhuo">
          <img src="https://gank.io/images/d6bba8cf5b8c40f9ad229844475e9149" width="100%" alt="">
          <h4 class="bg-white p-2">干货</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend, getCategory, getHotMess } from '@/api/recommend'
import itemHeader from '@/components/ItemHeader'
import rightMess from '@/components/rightMess'
import loading from '@/components/loading'
import axios from 'axios'
export default {
  data() {
    return {
      recommend: [],
      category: [],
      hotMess: [],
      showLoading: false
    }
  },
  components: {
    itemHeader,
    rightMess,
    loading
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.showLoading = true
      let res
      const resRe = await getRecommend()
      this.recommend = resRe.data
      const resCa = await getCategory()
      this.category = resCa.data
      this.category.forEach((item) => {
        item.reco = []
        this.recommend.forEach((s) => {
          if(item._id === s.category._id) {
            item.reco.push(s)
          }
        })
      })
      this.showLoading = false
      if (document.documentElement.clientWidth > 600 || document.body.clientWidth > 600) {
        const resHot = await getHotMess()
        this.hotMess = resHot.data
      }
    },
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
.reco-wrap {
  box-shadow: 0 0 3px #e5e5e5;
  border: 1px solid #e8e8e8;
  .reco-item-wrap {
    li {
      width: 25%;
      height: 35px;
      line-height: 35px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      // background: #edf1f3;
      // box-shadow: 0 0 2px 1px rgb(85, 105, 175);
      &:hover {
        border-radius: 17px;
        background: #edf1f3;
        box-shadow: 0 0 1px 2px #2f5d75;
        // border: 2px solid #2f5d75;
      }
      a {
        width: 100%;
      }
    }
  }
}
.ganhuo {
  width: 100%;
  background: #000;
  }
.mess-title {
  @include border(bottom, #e8e8e8, 1px);
}
.mess-wrapper {
  @include border(bottom, #e8e8e8, 1px);
  .mess-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    a:hover {
      text-decoration: underline;
    }
  }
}

</style>