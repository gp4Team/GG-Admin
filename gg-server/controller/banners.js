const Banner = require('../model/banner.js')
const fs = require('fs')
const { getList, getParam } = require('../utils/utils.js')
var broadcast = require('../bin/broadcast')

const getBannerList = function( req, res, next){
    console.log('一大波轮播')
    Banner.find({})
    .sort({_id: -1})
    .then((result) => {
        res.json(getList({"bannerInfo":result}))
    })
}

const saveBanners = function(req, res, next){
    console.log('进来了')
    let baseImg = req.body.params 
    var base64Data = baseImg.replace(/^data:image\/\w+;base64,/, "");
    var pattern =/\/(.+?);/g;
    var extension=baseImg.match(pattern);
    for(var i=0,len=extension.length;i<len;i++){
        extension[i] = extension[i].replace("/","").replace(";","");
    }
    extension = '.'+extension[0]
    //解析路径
    var dataBuffer = new Buffer(base64Data, 'base64');
    let basepath = './public/images/upload/'
    let timer = Date.now()
    fs.writeFile(basepath+timer+extension, dataBuffer, function(err) {
        if(err) throw err;
        const willSaveBanners = new Banner({
            createTime: new Date().getTime(),
            bannerUrl : 'http://localhost:3000/images/upload/' + timer + extension
        })
        willSaveBanners.save().then(()=>{
            console.log('添加成功轮播图')
            broadcast.emit("hahaha",'banners')
            res.json(getParam({success: true}))
        })  
    });
}

const deleteBannerList = function(req, res, next){
    console.log(req.query)
    const { ids } = req.query
    let idsArr = ids.split(',')
    let idQuery = idsArr.map((item=>{
        return {_id:item}
    }))
    console.log(idQuery,'我要准备删除了')
    Banner.deleteMany({$or:idQuery})
    .then((resultss)=>{
        broadcast.emit("hahaha",'banners')
        res.json(getParam({success:true}))
    })
}

module.exports = {
    saveBanners,
    getBannerList,
    deleteBannerList
}