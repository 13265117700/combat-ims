const Article = require('./../models/article')
const { formatTime } = require('./../utils/date')

const articleController = {
  show: async function(req,res,next){
    try{
      const articles = await Article.all()
      .leftJoin('user','user.id','article.user_id')
      .select('article.*',{'user_name':'user.name'})
      .select('article.*',{'user_address':'user.address'})
      .leftJoin('classify','classify.id','article.classify_id')
      .select('article.*',{'classify_name':'classify.name'})
      articles.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      console.log(articles)
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  delete: async function(req,res,next){
    try{
      let id = req.params.id
      const articles = await Article.delete(id)
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  editShow: async function(req,res,next){
    let id = req.params.id
    try{
      const articles = await Article.select({"article.id":id})
      .leftJoin('user','user.id','article.user_id')
      .select('article.*',{'user_name':'user.name'})
      .select('article.*',{'user_address':'user.address'})
      .leftJoin('classify','classify.id','article.classify_id')
      .select('article.*',{'classify_name':'classify.name'})
      articles.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  update: async function(req,res,next){
    let id = req.params.id
    let title = req.body.title
    let user_id = req.body.name
    let classify_id = req.body.classify
    let content = req.body.content
    if(!title || !user_id || !classify_id || !content){
      res.json({code:0,data:'缺少必要参数!'})
      return
    }
    try{
      const articles = await Article.update(id,{title,user_id,classify_id,content})
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  insert: async function(req,res,next){
    let title = req.body.title
    let user_id = req.body.name
    let classify_id = req.body.classify
    let content = req.body.content
    let created_time = new Date()
    if(!title || !user_id || !classify_id || !content){
      res.json({code:0,data:'缺少必要参数!'})
      return
    }
    try{
      const articles = await Article.insert({title,user_id,classify_id,content,created_time})
      res.json({code:200,data:articles})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = articleController