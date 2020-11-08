<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="margin-bottom: 100px;">这里是一个后台管理系统，记录博客的数据</div>
    <div id="echartsWrap" :style="{width: '100%', height: '500px'}" />
    <div id="echartsPieWrap" :style="{width: '100%', height: '1500px'}" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getViewsAmount } from '@/api/viewsAmount'
import echarts from 'echarts'
function formatDate(dt) {
  const date = new Date(dt)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${m}-${d}`
}
export default {
  name: 'Dashboard',
  data() {
    return {
      chart: null,
      pieChart: null
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.$nextTick(() => {
      this.initCahrt()
    })
  },
  methods: {
    initCahrt() {
      this.chart = echarts.init(document.getElementById('echartsWrap'))
      this.pieChart = echarts.init(document.getElementById('echartsPieWrap'))
      this.setOptions()
    },
    async setOptions() {
      const res = await getViewsAmount()
      const obj = {}
      const objLocation = {}
      const arrLocation = []
      let data = []
      let xAxis = []
      // const amout = []
      res.data.forEach((item) => {
        if (obj.hasOwnProperty(formatDate(item.createTime))) {
          obj[formatDate(item.createTime)] += 1
        } else {
          obj[formatDate(item.createTime)] = 1
        }
        if (objLocation.hasOwnProperty(item.location)) {
          objLocation[item.location] += 1
        } else {
          objLocation[item.location] = 1
        }
      })
      for (const key in objLocation) {
        arrLocation.push({ value: objLocation[key], name: key })
      }
      xAxis = Object.keys(obj)
      data = Object.values(obj)
      this.pieChart.setOption({
        title: {
          text: '访问城市统计',
          subtext: '详细数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 200,
          top: 20,
          bottom: 20
        },
        series: [
          {
            name: '访问城市',
            type: 'pie', // 设置图表类型为饼图
            radius: '65%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: arrLocation
          }
        ]
      })
      this.chart.setOption({
        title: {
          text: '近一个月的访问量'
        },
        legend: {
          data: ['所有访问量']
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {},
        series: [
          {
            name: '访问量',
            type: 'line',
            data: data
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
