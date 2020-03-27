const Classify = require('./../models/classify')
const { formatTime } = require('./../utils/date')

const classController = {
  show: async function(req,res,next){
    try{
      const classifys = await Classify.all()
      classifys.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  insert: async function(req,res,next){
    let name = req.body.name
    if(!name){
      res.json({code:0,data:'请输入正确参数!'})
      return
    }
    let created_time = new Date()
    try{
      const classifys = await Classify.insert({name,created_time})
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  update: async function(req,res,next){
    let id = req.params.id
    let name = req.body.name
    if(!name){
      res.json({code:0,data:'缺少必要参数!'})
      return
    }
    try{
      const classify = await Classify.update(id,{name})
      res.json({code:200,data:classify})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id
    try{
      const classifys = await Classify.delete(id)
      res.json({code:200,data:classifys})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = classController