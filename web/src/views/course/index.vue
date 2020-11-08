<template>
  <div class="mt-6">
    <div class="course-wrapper container py-5 bg-white">
      <div class="mx-6">
        <h2>2020</h2>
        <div class="course-item px-5 my-4" v-for='course in courses' :key='course._id'>
          <div class="item py-4 px-5">
            <h4 class="">{{course.title}}</h4>
            <div class="fs-s my-3">{{course.desc}}</div>
            <div class="fs-xs">{{course.createTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourse } from '@/api/course'
import { validateTime } from '@/utils/validate'
export default {
  data() {
    return {
      courses: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getCourse()
      res.data.map(item => item.createTime = validateTime(item.createTime))
      this.courses = res.data
    }
  }
}
</script>

<style lang='scss' scoped>
 .course-item {
   .item {
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
   }
 }
</style>