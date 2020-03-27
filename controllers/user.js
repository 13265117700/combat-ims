const User = require('./../models/user')
const { formatTime } = require('./../utils/date')

const userController = {
  show: async function(req,res,next){
    try{
      const users = await User.all()
      users.forEach(data => {
        if(data.created_time){
          data.created_time = formatTime(data.created_time)
        }
      })
      res.json({code:200,data:users})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  insert: async function(req,res,next){
    let name = req.body.name
    let phone = req.body.phone
    let address = req.body.address
    let Email = req.body.Email
    let password = req.body.password
    let created_time = new Date()

    if(!name || !Email || !phone || !address || !password){
      res.json({code:0,data:'缺少必要参数!'})
      return
    }

    try{
      const users = await User.insert({name,phone,address,Email,password,created_time})
      res.json({code:200,data:users})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  update: async function(req,res,next){
    let name = req.body.name
    let address = req.body.address
    let password = req.body.password
    let id = req.params.id
    if(!name || !address || !password){
      res.json({code:0,data:'缺少必要参数!'})
      return
    }
    try{
      const users = await User.update(id,{name,address,password})
      res.json({code:200,data:users})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id
    try{
      const users = await User.delete(id)
      res.json({code:200,data:users})
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = userController