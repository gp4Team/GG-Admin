const fs = require('fs')
const User = require('../model/user.js')
const { getParam } = require('../utils/utils.js')
const bcrypt = require('bcrypt')

const signUp = function (req, res) {
  const { username, password, roles,userHeadImg } = req.body
  let userId = req.body.id
  console.log(req.body.id)
  console.log(req.body.modify)
  if(req.body.modify){
    console.log('修改头像')
    bcrypt.hash(password,10)
    .then((password) => {
        const setObj = {
            username, 
            password, 
            roles
        }
        console.log(setObj)
        var base64Data = userHeadImg.replace(/^data:image\/\w+;base64,/, "");
        console.log(base64Data)
        var pattern =/\/(.+?);/g;
        var extension=userHeadImg.match(pattern);
        console.log(extension)
        for(var i=0,len=extension.length;i<len;i++){
            extension[i] = extension[i].replace("/","").replace(";","");
        }
    
        extension = '.'+extension[0]
        console.log(extension)
        //解析路径
        var dataBuffer = new Buffer(base64Data, 'base64');
        console.log(dataBuffer)
        let basepath = './public/images/upload/'
        let timer = Date.now()
        console.log(timer,extension)
        fs.writeFile(basepath+timer+extension, dataBuffer, function(err) {
            console.log('进啦')
            if(err) throw err;
            setObj.userHeadImg = 'http://localhost:3000/images/upload/'+timer+extension;
            console.log(setObj)
            User.findByIdAndUpdate(req.body.id,{
                $set: setObj
            }).then((result)=>{
                console.log('修改成功')
                req.session.username = result.username
                req.session.password = result.password
                req.session.userHeadImg = result.userHeadImg
                res.json(getParam({msg:'修改成功',success:true,result}))
            })
        });
    })
    
    
    
  } else {
      console.log('添加')
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
                    userHeadImg
                })
                console.log(willSaveUser)
                willSaveUser.save().then(()=>{
                    console.log('注册成功') 
                    res.json(getParam({success:true}))
                })
            })
          res.json(getParam({username, success: true}))
        }
    })
  }

}
const signIn = function(req,res) {
    const { username, password} = req.body
    User.findOne({username})
    .then((user) => {
        console.log(user)
        if(!user) {
            res.json(getParam({login:false}))
        } else {
          bcrypt.compare(password, user.password)
          .then((result)=>{
              if(result){
                  //登录成功的逻辑 存储session
                  req.session.username = user.username
                  req.session.userId = user._id
                  req.session.userHeadImg = user.userHeadImg
                  req.session.password = user.password
                  res.json(getParam({
                      login:true,
                      username: user.username,
                      userId: user._id,
                      userHeadImg:userHeadImg
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
        username: req.session.username,  //session 所有接口都能读取到
        userId : req.session.userId,
        password: req.session.password,
        userHeadImg: req.session.userHeadImg,
    }))
}
const logout = function (req,res){
    res.session = null,
    res.json(getParam({
        logout : true
    }))
}

//头像上传
const userHeadImg = function(req,res,next){
    console.log(req.file.path)
    // if (req.file && req.file.filename) {
    //     setObj.companyLogo = req.file.filename
    //   }
}

module.exports = { signUp, signIn, isLogin, logout ,userHeadImg}
