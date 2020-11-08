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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.row._id }}</template>
      </el-table-column>
      <el-table-column label="标题" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="描述" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点赞" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.like }}</template>
      </el-table-column>
      <el-table-column label="评论" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.comment }}</template>
      </el-table-column>
      <el-table-column label="查看" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.view }}</template>
      </el-table-column>
      <!-- <el-table-column label="正文" width="110" align="center">
        <template slot-scope="scope"><div v-html="scope.row.content" /></template>
      </el-table-column> -->
      <el-table-column label="首图" width="200" align="center">
        <template slot-scope="scope"><img width="120" :src="scope.row.imageUrl" alt=""></template>
      </el-table-column>
      <el-table-column class-name="status-col" label="标签" width="110" align="center">
        <template slot-scope="scope"><div v-for="item in scope.row.tags" :key="item._id">{{ item.title }}</div></template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime | timeFilter }} - {{ scope.row.updateTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getArticle, deleteArticle } from '@/api/article'

export default {
  name: 'Article',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getArticle().then(response => {
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
        const res = await deleteArticle(item._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData()
      })
    },
    handleEdit(index, item) {
      this.$router.push(`/article/addArticle/${item._id}`)
    }
  }
}
</script>
