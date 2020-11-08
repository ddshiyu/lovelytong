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
      <el-table-column align="center" label="标题" width="95">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column align="center" label="权重" width="395">
        <template slot-scope="scope">{{ scope.row.priority }}</template>
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
import { getCategory, deleteCategory } from '@/api/category'

export default {
  name: 'ShowCategory',
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
      getCategory().then(response => {
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
        const res = await deleteCategory(item._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData()
      })
    },
    handleEdit(index, item) {
      this.$router.push(`/category/addCategory/${item._id}`)
    }
  }
}
</script>
