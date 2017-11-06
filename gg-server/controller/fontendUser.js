const fontendUser = require('../model/fontendUser.js')
const { getParam } = require('../utils/utils.js')
const bcrypt = require('bcrypt')

const register = function (req, res) {
  const { userName, userPwd, userPhone } = req.body
  //console.log( req.body.userPhone)
  //console.log(req.body)
  fontendUser.findOne({userName})
  .then((user)=>{
      if(user){
          res.json(getParam({success:false}))
      }else{
          bcrypt.hash(userPwd,10)
          .then((userPwd) => {
              const willSaveUser = new fontendUser({
                  userName,
                  userPwd,
                  userPhone,
                  createTime: new Date().getTime()
              })
              willSaveUser.save().then(()=>{
                  res.json(getParam({success:true}))
              })
          })
          res.json(getParam({userName, success: true}))
      }
  })
}

const login = function(req,res) {
    const { userName, userPwd } = req.body
    //console.log( req.body )
    fontendUser.findOne({ userName })
    .then((user) => {
        if(!user) {
            res.json(getParam({success:false}))
        } else {
          bcrypt.compare(userPwd, user.userPwd)
          .then((result)=>{
              if(result){
                  //登录成功的逻辑 存储session
                  req.session.userName = user.userName
                  res.json(getParam({
                      success:true,
                      userName: user.userName
                  }))
              } else {
                  res.json(getParam({success:false}))
              }
          })
        }
    })
}

module.exports = { register,login }