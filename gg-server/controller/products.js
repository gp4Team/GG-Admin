const Products = require('../model/products')
const fs = require('fs')
const {getList, getParam} = require('../utils/utils')
const async = require('async')

var broadcast = require('../bin/broadcast')

const getProductsList = function(req, res, next){
    let pageSize = 6
    let { pageNo } = req.query
    async.parallel([
        function(cb){
            if(req.query.searchWord == ''){
                Products.find({})
                .then((all)=>{
                    let pageCount = Math.ceil(all.length / pageSize)
                    cb(null,pageCount)
                })
            }else{
                console.log('根据关键字搜索')
                let word = req.query.searchWord
                Products.find({"goodsName" : eval('/'+word+'/i') })
                .then((result)=>{
                    let pageCount = Math.ceil(result.length / pageSize)
                    cb(null,pageCount)
                })
            }
            
        },
        function(cb){
            if(req.query.searchWord == ''){
                Products.find({})
                .skip( (pageNo-1) * pageSize )
                .limit( pageSize )
                .sort({_id: -1})
                .then((result) => {
                    cb(null,result)
                })
            }else{
                let word = req.query.searchWord
                Products.find({"goodsName" : eval('/'+word+'/i') })
                .skip( (pageNo-1) * pageSize )
                .limit( pageSize )
                .sort({_id: -1})
                .then((result)=>{
                    cb(null,result)
                })
            }
            
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

const saveProductsList = function(req, res, next){
    const { goodsName,_id,goodsBrand, goodsListImg, price, discount, imgsUrl, className, info,dynamicTagsSize, dynamicTagsColor} = req.body
    if(req.body._id == '' || req.body._id === undefined){
        console.log('添加')
        //对base64解析
        var base64Data = goodsListImg.replace(/^data:image\/\w+;base64,/, "");
        var pattern =/\/(.+?);/g;
        var extension=goodsListImg.match(pattern);
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
            const willSaveProducts = new Products({
                goodsName,
                goodsBrand,
                price,
                discount,
                imgsUrl:"['https://img.alicdn.com/imgextra/i1/263817957/TB2zHIOdFXXXXa_XpXXXXXXXXXX-263817957.jpg','https://img.alicdn.com/imgextra/i2/263817957/TB2BDgYdFXXXXc0XXXXXXXXXXXX-263817957.jpg','https://img.alicdn.com/imgextra/i1/263817957/TB22x77dFXXXXaPXXXXXXXXXXXX-263817957.jpg']",
                className,
                info,
                createTime: new Date().getTime(),
                // goodsListImg:'http://10.9.164.7:3000/images/upload/'+timer+extension,
                goodsListImg:'http://localhost:3000/images/upload/'+timer+extension,
                dynamicTagsSize, 
                dynamicTagsColor
            })
            willSaveProducts.save().then(()=>{

                ///////
                broadcast.emit("hahaha",'xin')

                console.log('添加成功')
                res.json(getParam({success: true}))
            })  
        });
    }
    if(req.body._id != '' || req.body._id !== undefined){
        console.log('修改')
        const setObj = {
            goodsName,
            goodsBrand,
            price,
            discount,
            imgsUrl:"['https://img.alicdn.com/imgextra/i1/263817957/TB2zHIOdFXXXXa_XpXXXXXXXXXX-263817957.jpg','https://img.alicdn.com/imgextra/i2/263817957/TB2BDgYdFXXXXc0XXXXXXXXXXXX-263817957.jpg','https://img.alicdn.com/imgextra/i1/263817957/TB22x77dFXXXXaPXXXXXXXXXXXX-263817957.jpg']",
            className,
            info,
            dynamicTagsSize, 
            dynamicTagsColor,
            createTime: new Date().getTime(),
        }
        if(goodsListImg.length > 200){
            console.log('修改图片了')
            var base64Data = goodsListImg.replace(/^data:image\/\w+;base64,/, "");
            var pattern =/\/(.+?);/g;
            var extension=goodsListImg.match(pattern);
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
                // setObj.goodsListImg = 'http://10.9.164.7/images/upload/'+timer+extension
                setObj.goodsListImg = 'http://localhost/images/upload/'+timer+extension
                let newObj = setObj
                Products.findByIdAndUpdate(req.body._id,{
                    $set: newObj
                }).then(()=>{
                    res.json(getParam({success:true}))
                })
            });
            
        }else{
            Products.findByIdAndUpdate(req.body._id,{
                $set: setObj
            }).then(()=>{
                res.json(getParam({success:true}))
            })
        }
        broadcast.emit("hahaha",'xin')
    } 
    
}

//删除

const deleteProducts = function(req,res,next){
    const { ids } = req.query
    let idsArr = ids.split(',')
    let idQuery = idsArr.map((item=>{
        return {_id:item}
    }))
    console.log(idQuery,'我要准备删除了')
    Products.deleteMany({$or:idQuery})
    .then((resultss)=>{
        res.json(getParam({success:true}))
    })
}

const getOneProducts = function(req, res, next){
    const { id } = req.query
    Products.findOne({ _id : id })
    .then((result)=>{
        res.json(getParam({result}))
    })
}

module.exports = {
    getProductsList,
    saveProductsList,
    deleteProducts,
    getOneProducts
}