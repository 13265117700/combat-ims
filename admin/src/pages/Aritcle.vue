<template>
<div class="main-container">
  <div class="container-create">
    <el-button class="create-button" type="text" round @click="()=>this.$router.push('/admin/article/create')">添加文章</el-button>
  </div>
  <div class="container-list">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="日期"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="id"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章标题"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <i class="el-icon-reading"></i>
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章类型"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span style="margin-left: 10px">{{ scope.row.classify_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布人"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.user_name }}</p>
            <p>住址: {{ scope.row.user_address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.user_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import articleModel from './../models/article'
export default {
  data() {
    return {
      formLabelWidth: '80px',
      tableData: []
    }
  },
  created() {
    articleModel.aritcleShow().then(res => {
      this.tableData = res.data.data
    })
  },
  methods: {
    handleEdit (row) {
      let id = row.id
      this.$router.push({path:'/admin/article/edit/'+id})
    },
    handleDelete (index, row) {
      console.log(index, row)
      let affirm = confirm('确定删除吗?')
      if(affirm){
        let id = row.id
        articleModel.aritcleDelete(id).then(res => {
          if(res.data.code === 200){
            this.tableData.splice(index, 1)
            this.$message.success('删除成功!')
          }
          location.reload()
        })
      }
    }
  },
}
</script>
