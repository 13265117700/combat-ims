<template>
<el-col class="page-sider">
  <div class="sider-title"><span>信息管理系统</span></div>
  <el-menu
    :router="true"
    default-active="defaultActive"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/admin/user">
      <i class="el-icon-user"></i>
      <span slot="title">用户列表</span>
    </el-menu-item>
    <el-menu-item index="/admin/classify">
      <i class="el-icon-star-on"></i>
      <span slot="title">分类列表</span>
    </el-menu-item>
    <el-menu-item index="/admin/aritcle">
      <i class="el-icon-s-data"></i>
      <span slot="title">文章列表</span>
    </el-menu-item>
  </el-menu>
</el-col>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
}
</script>

<style>
.sider-title{
  font-size: 18px;
  font-family: monospace;
  color: #ffffff;
  height: 60px;
  line-height: 60px;
}
</style>
