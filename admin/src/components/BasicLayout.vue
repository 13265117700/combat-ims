<template>
<el-container>
  <el-aside width="200px">
    <Sider class="page-sider" />
  </el-aside>
  <el-container>
    <el-header>
      <el-button type="info" @click="exit"><i class="el-icon-back"></i>退出登录</el-button>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Copyright © 2018 Design by jikexueyuan All Rights Reserved</el-footer>
  </el-container>
</el-container>
</template>

<script>
import Sider from './BasicLayoutSider'
export default {
  watch: {
    $route: 'router'
  },
  created() {
    this.router()
  },
  methods: {
    router () {
      let token = localStorage.getItem('token')
      if(!token)this.$router.replace({name:'Login'})
    },
    exit () {
      localStorage.removeItem('token')
      this.$message.success('退出成功!')
      this.$router.push({path:'/login'})
    }
  },
  components: {
    Sider
  }
}
</script>

<style>
  .el-container{
    height: 100%;
  }
  .el-header .el-button{
    float: right;
    margin-top: 10px;
  }
  .el-header, .el-footer {
    background-color: #545c64;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    font-family: monospace;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #ffffff;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #796464;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  
  .container-create{
    text-align: left;
    margin-bottom: 10px;
  }

  .container-create .create-button{
    font-size: 18px;
    font-family: monospace;
    color: black;
  }
</style>
