const fs = require('fs')
const {getList, getParam} = require('../utils/utils')
const async = require('async')
const Types = require('../model/types')

//添加商品类型
const saveGoodsTypes =  function(req, res, next){
    const {typename, typeimg} = req.body 
   // console.log(req.body)
    var base64Data = typeimg.replace(/^data:image\/\w+;base64,/, "");
    var pattern =/\/(.+?);/g;
    var extension=typeimg.match(pattern);
    for(var i=0,len=extension.length;i<len;i++){
        extension[i] = extension[i].replace("/","").replace(";","");
    }
    extension = '.'+extension[0]
    //解析路径
    var dataBuffer = new Buffer(base64Data, 'base64');
    let basepath = './public/images/types/'
    let timer = Date.now()
    //console.log(basepath+timer+extension)
    fs.writeFile(basepath+timer+extension, dataBuffer, function(err) {
        if(err) throw err;
        const willSaveTypes = new Types({
            typename,
            createTime: new Date().getTime(),
            typeimg:'http://localhost:3000/images/types/'+timer+extension
            
        })
       console.log(willSaveTypes)
        willSaveTypes.save().then(()=>{
            console.log('添加成功')
            res.json(getParam({success: true}))
        }).catch(response => {
            console.log(response)
        } )  
    });
}

//获取商品类型
const getTypeList = function( req, res, next){
    Types.find({})
    .then((result) => {
        //console.log(result)
        res.json(getList({"typeInfo":result}))
    })
}

//删除商品类型
const deleteTypeList = function(req, res, next){
    console.log(req.query)
    const { ids } = req.query
    let idsArr = ids.split(',')
    let idQuery = idsArr.map((item=>{
        return {_id:item}
    }))
    console.log(idQuery,'我要准备删除了')
    Types.deleteMany({$or:idQuery})
    .then((resultss)=>{
        res.json(getParam({success:true}))
    })
}
module.exports = {
    saveGoodsTypes,
    getTypeList,
    deleteTypeList
}