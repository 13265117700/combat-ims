<template>
<div class="main-container">
  <div class="container-create">
    <el-button class="create-button" type="text" round @click="handleAdd">添加分类</el-button>
    <el-dialog :title="form.title" :visible.sync="dialogFormVisible">
      <el-form 
        :label-position="labelPosition" 
        :label-width="formLabelWidth" 
        :model="form"
        :rules="formRules"
        ref="form"
        >
        <el-form-item label="分类名称" prop="name">
          <el-input
            type="text"
            prefix-icon="el-icon-postcard"
            placeholder="请输入分类名"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </div>
    </el-dialog>
  </div>
  <div class="container-list">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="Index"
        type="index"
        width="180">
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类ID"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类名称"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-postcard"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import classifyModel from './../models/classify'

export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: null,
        index: null,
        title: '',
        name: ''
      },
      formLabelWidth: '80px',
      labelPosition: 'left',
      formRules: {
        name: [
          {
            pattern: /^[\u0391-\uFFE5]+$/,
            message: '只能输入中文',
            trigger: 'blur'
          },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created () {
    classifyModel.classifyShow().then(res => {
      this.tableData = res.data.data
    })
  },
  methods: {
    cancelForm () {
      this.dialogFormVisible = false
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.form.title = '添加分类'
      this.form.name = ''
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form.title = '编辑分类'
      this.form.id = row.id
      this.form.name = row.name
      this.form.index = index
    },
    handleSave () {
      let id = this.form.id
      let index = this.form.index
      let name = this.form.name
      if (!name) {
        this.$message({
          tryp: 'error',
          message: '请输入分类名称!'
        })
        return
      }
      if (id) {
        classifyModel.classifyEdit(id,{name}).then(res => {
          if (res.data.code === 200) {
            this.tableData[index].name = name
            this.dialogFormVisible = false
            this.$message({
              tryp: 'success',
              message: '添加成功!'
            })
            location.reload()
          }
        }).catch(() => {
          this.$message.error('未能修改成功!')
        })
      } else {
        classifyModel.classifyAdd({name}).then(res => {
          if (res.data.code === 200) {
            this.form.name = ''
            this.dialogFormVisible = false
            this.$message.success('添加成功!')
            location.reload()
          }
        }).catch(() => {
          this.$message.error('未能添加成功!')
        })
      }
      
    },
    handleDelete (index, row) {
      console.log(index, row)
      let affirm = confirm('确定删除吗?')
      if (affirm) {
        let id = row.id
        classifyModel.classifyDelete(id).then(res => {
          if (res.data.code === 0) {
            this.tableData.splice(index, 1)
            this.$message.success('删除成功!')
          }
          location.reload()
        })
      }
    }
  },
};
</script>

<style lang="less" scoped>

</style>
