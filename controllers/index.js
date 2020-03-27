const Classify = require('../models/classify.js');
const Article = require('./../models/article')
const { formatTime } = require('./../utils/date.js');

const indexController = {
  breadcrumbShow: async function(req,res,next){
    try{
      const index = await Classify.all()
      res.json({code:200,data:index})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  articleShow: async function(req,res,next){
    let currentPage = req.query.currentPage || 1
    let pageSize = req.query.val || 10
    let offset = (currentPage - 1) * pageSize
    try{
      const total = await Article.all().count('id as total');
      const index = await Article.all()
      .offset(offset)
      .limit(pageSize)
      .leftJoin('user','user.id','article.user_id')
      .select('article.*',{'user_name':'user.name'})
      index.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:{index, total}})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  articleClassifyShow: async function(req,res,next){
    let id = req.params.id
    let currentPage = req.query.currentPage || 1
    let pageSize = req.query.val || 10
    let offset = (currentPage - 1) * pageSize
    try{
      const total = await Article.select({classify_id:id}).count('id as total')
      const index = await Article.select({'article.classify_id':id})
      .offset(offset)
      .limit(pageSize)
      .leftJoin('user','user.id','article.user_id')
      .select('article.*',{'user_name':'user.name'})
      index.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:{index, total}})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  articleContentShow: async function(req,res,next){
    let id = req.params.id
    try{
      const article = await Article.select({'article.id':id})
      .leftJoin('user','user.id','article.user_id')
      .select('article.*',{'user_name':'user.name'})
      .leftJoin('classify','classify.id','article.classify_id')
      .select('article.*',{'classify_name':'classify.name'})
      article.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:article})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = indexController