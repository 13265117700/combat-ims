const User = require('./../models/user')
const authCodeFunc = require('./../utils/authCode')

const authController = {
  login: async function(req,res,next){
    let phone = req.body.phone
    let password = req.body.password
    if(!phone || !password){
      res.json({code:0,data:'缺少必要参数!'})
      return
    }
    try{
      const users = await User.select({phone,password})
      const user = users[0]
      if(user){
        let auth_code = phone+'\t'+password+'\t'+user.id
        auth_code = authCodeFunc(auth_code,'ENCODE')
        // res.cookie('ac',auth_code,{maxAge:24*60*60*1000,httpOnly:true})
        res.json({code:200,message:'登录成功!',token:auth_code})
      }else{
        res.json({code:0,data:{msg:'登录失败,没有此用户!'}})
      }
    }catch(e){
      res.json({code:0,data:e})
    }
  }
}

module.exports = authController