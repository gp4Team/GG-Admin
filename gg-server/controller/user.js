const User = require('../model/user.js')
const { getParam,getList } = require('../utils/utils.js')
const bcrypt = require('bcrypt')

const signUp = function (req, res) {
  const { username, password,  userPhone, roles } = req.body
  User.findOne({username})
  .then((user)=>{
      if(user){
          res.json(getParam({success:false}))
      }else{
          bcrypt.hash(password,10)
          .then((password) => {
              const willSaveUser = new User({
                  username,
                  password,
                  roles,
                  userPhone,
                  createTime: new Date().getTime()
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
    const { username, password } = req.body
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
//判断用户是否登录
const isLogin = function(req, res){
    res.json(getParam({
        login: req.session.username ? true : false,
        username: req.session.username  //session 所有接口都能读取到
    }))
}
const logout = function (req,res){
    res.session = null,
    res.json(getParam({
        logout : true
    }))
}

//用户列表list
const usersList = function(req,res,next){	
	 const { pageNo } = req.body
	  console.log(req.body)
	  let pageSize = 10
	  
	  	User.find({roles:1})
	  	.skip( (pageNo-1)*pageSize)
	  	.limit(pageSize)
	  	.sort({_id:-1})
	  	.then((results) => {
	  		console.log({"results":results})
	  		res.json( getList({results}))
	  	})
}
module.exports = { signUp, signIn, isLogin, logout, usersList }
