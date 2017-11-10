const fs = require('fs')
const async = require('async')
const {getList, getParam} = require('../utils/utils')
const User = require('../model/user.js')
const bcrypt = require('bcrypt')

const signUp = function (req, res) {
const { username, password, roles,userHeadImg } = req.body
  let userId = req.body.id
  if(req.body.modify){
    let ishead = false
    let ispwd = false
    if(userHeadImg != ''){
        // 改了头像
        console.log('改了头像')
        ishead = true
    }else{
        // 没改头像
        console.log('没改头像')
    }
    if(password === undefined){
        // 没改密码
        console.log('没改密码')
    }else{
        // 改了密码
        console.log('改了密码s')
        ispwd = true
    }
    const setObj = {
        username, 
        // password, 
        roles
    }
    if(ispwd){
        bcrypt.hash(password,10)
        .then((password) => {
            setObj.password = password
            if(ishead){
                modify.init(req,res,setObj,userHeadImg,req.body.id)
            }else{
                User.findByIdAndUpdate(req.body.id,{
                    $set: setObj
                }).then((result)=>{
                    console.log('修改成功')
                    req.session.username = result.username
                    req.session.password = result.password
                    res.json(getParam({msg:'修改成功',success:true,result}))
                })
            }
        })
    }else if(ishead){
        modify.init(req,res,setObj,userHeadImg,req.body.id)
    }else{
        User.findByIdAndUpdate(req.body.id,{
            $set: setObj
        }).then((result)=>{
            console.log('修改成功')
            req.session.username = result.username
            res.json(getParam({msg:'修改成功',success:true,result}))
        })
    }
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
// 登录
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
                      userHeadImg:user.userHeadImg
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
// 管理员修改
let modify = {
    init(req,res,setObj,userHeadImg,id){
        var base64Data = userHeadImg.replace(/^data:image\/\w+;base64,/, "");
        var pattern =/\/(.+?);/g;
        var extension=userHeadImg.match(pattern);
        for(var i=0,len=extension.length;i<len;i++){
            extension[i] = extension[i].replace("/","").replace(";","");
        }
        extension = '.'+extension[0]
        //解析路径
        var dataBuffer = new Buffer(base64Data, 'base64');
        let basepath = './public/images/upload/'
        let timer = Date.now()
        fs.writeFile(basepath+timer+extension, dataBuffer, function(err) {
            console.log('改了')
            if(err) throw err;
            // setObj.userHeadImg = 'http://10.9.164.7:3000/images/upload/'+timer+extension;
            setObj.userHeadImg = 'http://localhost:3000/images/upload/'+timer+extension;
            User.findByIdAndUpdate(id,{
                $set: setObj
            },{new: true}).then((result)=>{
                console.log('修改成功')
                console.log(result)
                req.session.username = result.username
                req.session.password = result.password
                req.session.userHeadImg = result.userHeadImg
                res.json(getParam({msg:'修改成功',success:true,result}))
            })
        });
    }
}
// 查询用户 0:管理员 1:普通用户
const getUsersList = function(req, res, next){
    let pageSize = 6
    let { pageNo,roles } = req.query
    let word = req.query.searchWord
    let collection = {}
    if(word != ''){
        collection.username = eval('/'+word+'/i')
    }
    if(req.query.roles == '0'){
        collection.roles = 0
    }else{
        collection.roles = 1
    }
    console.log(collection)
    async.parallel([
        function(cb){
            console.log('管理员')
            User.find(collection)
            .then((all)=>{
                let pageCount = Math.ceil(all.length / pageSize)
                cb(null,pageCount)
            })
        },
        function(cb){
            console.log('普通用户')
            User.find(collection)
            .skip( (pageNo-1) * pageSize )
            .limit( pageSize )
            .sort({_id: -1})
            .then((result) => {
                cb(null,result)
            })
        }
    ], function(err,results){
        let page = {
            "pageSize":pageSize,
            "result":results[1],
            "pageCount":results[0],
            "pageNo": pageNo
        }
        res.json(getList({"page":page}))
    })
}
// 删除用户
const deleteUsers = function(req,res,next){
    const { id } = req.query
    User.findByIdAndRemove(id)
      .then((result) => {
        res.json(getParam({success: true}))
      })
}
module.exports = { signUp, signIn, isLogin, logout, getUsersList, deleteUsers}
