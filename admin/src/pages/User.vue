<template>
<div class="main-container">
  <div class="container-create">
    <el-button class="create-button" type="text" round @click="handleCreateForm = true">添加用户</el-button>
    <el-dialog title="添加用户" :visible.sync="handleCreateForm">
      <el-form 
        :label-position="labelPosition" 
        :label-width="formLabelWidth" 
        :model="form"
        :rules="formRules"
        ref="form"
        >
        <el-form-item label="姓名" prop="name">
          <el-input
            type="text"
            prefix-icon="el-icon-picture-outline-round"
            placeholder="请输入名字"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            type="number"
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输手机号"
            v-model="form.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input
            type="text"
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入家庭住址"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="e-mail" prop="Email">
          <el-input
            type="text"
            prefix-icon="el-icon-message"
            placeholder="请输入电子邮件"
            v-model="form.Email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddForm">取 消</el-button>
        <el-button type="primary" @click="addButton">保 存</el-button>
      </div>
    </el-dialog>
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
        label="姓名"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="e-mail"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <i class="el-icon-message"></i>
          <span style="margin-left: 10px">{{ scope.row.Email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <i class="el-icon-mobile-phone"></i>
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="密码"
        :label-width="formLabelWidth">
        <template slot-scope="scope">
          <i class="el-icon-mobile-phone"></i>
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
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
    <el-dialog title="编辑用户" :visible.sync="handleEditForm">
      <el-form 
        :label-position="labelPosition"
        :label-width="formLabelWidth"
        :model="form"
        :rules="formRules"
        ref="form"
        >
        <el-form-item label="姓名" prop="name">
          <el-input
            type="text"
            prefix-icon="el-icon-picture-outline-round"
            placeholder="请输入名字"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input
            type="text"
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入家庭住址"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditForm">取 消</el-button>
        <el-button type="primary" @click="editButton">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import userModel from './../models/user'
export default {
  data() {
    return {
      handleCreateForm: false,
      handleEditForm: false,
      form: {
        Email: '',
        address: '',
        name: '',
        phone: '',
        password: '',
        id: null,
        index: null
      },
      formLabelWidth: '80px',
      labelPosition: 'left',
      formRules: {
        id: [
          {
            pattern: /^[A-Za-z]+$/,
            message: '只能输入英文字母',
            trigger: 'blur'
          }
        ],
        name: [
          {
            pattern: /^[\u0391-\uFFE5]+$/,
            message: '只能输入中文',
            trigger: 'blur'
          },
          { min: 2, max: 4, message: '长度在 3 到 4 个字符', trigger: 'blur' }
        ],
        phone: [
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        mailbox: [
          {
            pattern: /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/,
            message: '请输入正确的电子邮件',
            trigger: 'blur'
          }
        ],
        password: [
          {
            pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
            message: '密码必须字母和数字组合',
            trigger: 'blur'
          }
        ]
      },
      tableData: []
    };
  },
  created() {
    userModel.userShow().then(res => {
      this.tableData = res.data.data
    })
  },
  methods: {
    cancelAddForm () {
      this.handleCreateForm = false
      this.form.id = ''
      this.form.mailbox = ''
      this.form.name = ''
      this.form.phone = ''
      this.form.password = ''
    },
    cancelEditForm () {
      this.handleEditForm = false
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.handleEditForm = true
      this.form.id = row.id
      this.form.index = index
      this.form.name = row.name
      this.form.address = row.address
      this.form.password = row.password
    },
    addButton () {
      let name = this.form.name
      let phone = this.form.phone
      let address = this.form.address
      let Email = this.form.Email
      let password = this.form.password
      let params = { name, phone, address, Email, password }

      if(!name || !phone || !address || !Email || !password){
        this.$message({
          tryp: 'error',
          message: '必须输入参数!'
        })
        return
      }

      userModel.userAdd(params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.form.name = ''
          this.form.phone = ''
          this.form.address = ''
          this.form.Email = ''
          this.form.password = ''
          this.handleCreateForm = false
          this.$message({
            tryp: 'success',
            message: '添加成功!'
          })
          location.reload()
        } else {
          this.$message({
            tryp: 'error',
            message: '添加失败!'
          })
        }
      })
    },
    editButton () {
      let id = this.form.id
      let index = this.form.index
      let name = this.form.name
      let address = this.form.address
      let password = this.form.password
      let params = { name, address, password }

      userModel.userEdit(id, params).then(res => {
        if (res.data.code === 200) {
          this.tableData[index].name = name
          this.tableData[index].address = address
          this.tableData[index].password = password
          this.handleEditForm = false
          this.$message({
            tryp: 'success',
            message: '修改成功!'
          })
          location.reload()
        } else {
          this.$message({
            tryp: 'error',
            message: '编辑失败!'
          })
        }
      })
    },
    handleDelete (index, row) {
      console.log(index, row)
      let affirm = confirm('确定删除吗?')
      if(affirm){
        let id = row.id
        userModel.userDelete(id).then(res => {
          if (res.data.code === 200) {
            this.tableData.splice(index, 1)
            this.$message({
              tryp: 'success',
              message: '删除成功!'
            })
          }
        })
      }
    }
  },
};
</script>
