<template>
  <div class="main-container">
    <div class="main-info" v-for="(item, index) in articleData" :key="index">
      <div class="aritcle-item">
        <span class="title">{{item.title}}</span>
      </div>
      <div class="aritcle-item">
        <span class="date">创建时间: {{item.created_time}}</span>
      </div>
      <div class="aritcle-item">
        <div class="classify">
          <span>文章类别:</span>
          <span>{{item.classify_name}}</span>
        </div>
        <div class="user">
          <span>创建人:</span>
          <span>{{item.user_name}}</span>
        </div>
      </div>
      <div class="aritcle-item">
        <span class="text" style="text-indent:2em">{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import indexModel from './../models/index'
export default {
  data () {
    return {
      articleData: []
    }
  },
  created() {
    let id = this.$route.params.id
    indexModel.articleContent(id).then(res => {
      console.log(res)
      this.articleData = res.data.data
    })
  },
}
</script>

<style lang="less" scoped>
.main-container{
  height: 100%;
  .main-info{
    height: 90%;
    width: 80%;
    margin: auto;
    background: #ffffff;
    padding: 30px;
    font-size: 18px;
    font-family: monospace;
    color: black;
    .aritcle-item{
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .title{
        font-size: 28px;
        font-weight: 600;
      }
      .date{
        color: #888888;
      }
      .classify{
        margin-right: 20px;
        span:nth-child(2){
          color: tomato;
        }
      }
      .user{
        span:nth-child(2){
          color: tomato;
        }
      }
      .text{
        font-size: 20px;
        padding-top: 30px;
        text-align: left;
        line-height: 30px;
      }
    }
  }
}
</style>
