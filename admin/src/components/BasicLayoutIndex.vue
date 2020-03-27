<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <template v-for="(item,index) in indexList">
        <el-breadcrumb-item :key="index" :to="{ path: '/index/' + item.id }">{{item.name}}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <el-button type="info" @click="()=>this.$router.push('/login')">
        <i class="el-icon-user"></i>管理员登录
      </el-button>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Copyright © 2018 Design by jikexueyuan All Rights Reserved</el-footer>
  </el-container>
</template>

<script>
import indexModel from '@/models/index'
export default {
  data () {
    return {
      indexList: []
    }
  },
  mounted () {
    indexModel.breadcrumb().then(res => {
      this.indexList = res.data.data
    }).catch(e =>{
      console.log(e)
    })
  }
}
</script>

<style lang="less" scoped>
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-breadcrumb{
    /deep/.el-breadcrumb__item{
      font-size: 18px;
      font-family: monospace;
      span{
        color: aliceblue;
        cursor: pointer;
      }
    }
  }
}
</style>
