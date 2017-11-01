const User = require('../model/user.js')
const { getParam } = require('../utils/utils.js')
const bcrypt = require('bcrypt')

const signUp = function (req, res) {
  const { username, password } = req.body
  User.findOne({username})
  .then((user)=>{
      if(user){
          res.json(getParam({success:false}))
      }else{
          bcrypt.hash(password,10)
          .then((password) => {
              const willSaveUser = new User({
                  username,
                  password
              })
              willSaveUser.save().then(()=>{
                  res.json(getParam({success:true}))
              })
          })
          res.json(getParam({username, success: true}))
      }
  })
}
const signIn = function(req,res) {
    const { username, password} = req.body
    User.findOne({username})
    .then((user) => {
        if(!user) {
            res.json(getParam({login:false}))
        } else {
          bcrypt.compare(password, user.password)
          .then((result)=>{
              if(result){
                  //登录成功的逻辑 存储session
                  req.session.username = user.username
                  res.json(getParam({
                      login:true,
                      username: user.username
                  }))
              } else {
                  res.json(getParam({login:false}))
              }
          })
        }
    })
}
module.exports = { signUp, signIn }
