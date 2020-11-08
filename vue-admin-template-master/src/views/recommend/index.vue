<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="110">
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="120">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="地址" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" width="200" align="center">
        <template slot-scope="scope"><img width="120" :src="scope.row.imageUrl" alt=""></template>
      </el-table-column>
      <el-table-column class-name="status-col" label="分类" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.category.title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime | timeFilter }} - {{ scope.row.updateTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRecommend, deleteRecommend } from '@/api/recommend'
import { parseTime } from '@/utils/index.js'

export default {
  name: 'ShowRecommend',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      return parseTime(time)
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      fdf: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRecommend().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    async handleDelete(index, item) {
      this.$confirm(`是否确定要删除 "${item.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteRecommend(item._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData()
      })
    },
    handleEdit(index, item) {
      this.$router.push(`/recommend/addRecommend/${item._id}`)
    }
  }
}
</script>
