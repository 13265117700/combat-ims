<template>
<div class="main-container">
  <div class="main-list" :model="articleData">
    <div class="main-item">
      <span style="width: 100px">文章标题</span>
      <el-input style="width: 300px" v-model="articleData.title" placeholder="请输入内容"></el-input>
    </div>
    <div class="main-item">
      <span style="width: 100px">发布人</span>
      <el-select v-model="articleData.user_id" placeholder="请选择发布人">
        <el-option
          v-for="item in users"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="main-item">
      <span style="width: 100px">文章类型</span>
      <el-select v-model="articleData.classify_id" placeholder="请选择分类">
        <el-option
          v-for="item in classifys"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="main-item">
      <quill-editor 
        class="quill-editor" 
        v-model="articleData.content" 
        ref="myQuillEditor" 
        :options="editorOption">
      </quill-editor>
    </div>
    <div class="main-item footer">
      <el-button class="cancel-button" @click="cancelForm">取 消</el-button>
      <el-button class="add-button" type="primary" @click="addButton">创 建</el-button>
    </div>
  </div>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import userModel from './../models/user'
import classifyModel from './../models/classify'
import articleModel from './../models/article'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],
  [{'indent': '-1'}, {'indent': '+1'}],
  [{'direction': 'rtl'}],
  [{'size': ['small', false, 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}],
  [{'font': []}],
  [{'align': []}],
  ['clean'],
  ['link', 'image', 'video'],
]

export default {
  data () {
    return {
      users: [],
      classifys: [],
      articleData: {
        title: '',
        user_id: null,
        classify_id: null,
        content: ''
      },
      editorOption: {
        modules: {
          toolbar: {
            container :toolbarOptions
          }
        }
      }
    }
  },
  created() {
    userModel.userShow().then(res => {
      this.users = res.data.data
    })
    classifyModel.classifyShow().then(res => {
      this.classifys = res.data.data
    })
  },
  methods: {
    cancelForm () {
      this.$router.push({path:'/admin/aritcle'})
    },
    addButton () {
      let title = this.articleData.title
      let name = this.articleData.user_id
      let classify = this.articleData.classify_id
      let content = this.articleData.content
      let params = { title,name,classify,content }
      if (!title || !name || !classify || !content){
        this.$message.error('缺少必要参数!')
        return
      }
      articleModel.aritcleAdd(params).then(res => {
        if(res.data.code === 200){
          this.$message.success('添加成功!')
          this.$router.push({path:'/admin/aritcle'})
        }
      })
    }
  },
  components: {
    'quill-editor': quillEditor
  }
}
</script>

<style lang="less" scoped>
.main-container{
  height: 100%;
  .main-list{
    height: 100%;
    width: 80%;
    margin: auto;
    .main-item{
      display: flex;
      text-align: left;
      margin-bottom: 10px;
      line-height: 40px;
      .quill-editor.quill-editor{
        display: flex;
        flex-direction: column;
        /deep/.ql-container.ql-snow{
          height: 300px;
          max-height: 300px;
        }
      }
    }
  }
}
</style>
