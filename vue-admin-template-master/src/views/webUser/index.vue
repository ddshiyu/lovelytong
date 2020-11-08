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
      <el-table-column align="center" label="正文" width="395">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="395">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" width="60">
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
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWebUser, deleteWebUser } from '@/api/webUser'
export default {
  name: 'ShowAbout',
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
      getWebUser().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    async handleDelete(index, item) {
      this.$confirm(`是否确定要删除这条吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteWebUser(item._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData()
      })
    }
  }
}
</script>
