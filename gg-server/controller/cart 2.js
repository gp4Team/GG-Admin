const Cart = require('../model/cart.js')
const { getList, getParam } = require('../utils/utils.js')
const async = require('async')

const cartAdd = function(req, res, next){
    const { userId, username, cartInfo} = req.body
    // 判断是否有userid
    Cart.findOne({userId})
    .then((result) => {
        if(result){
            let list = result.cartInfoList
            list.push(cartInfo)
            const newObj = {
                userId: userId,
                cartInfoList: list,
                username
            }
            Cart.findByIdAndUpdate(result._id,{
                $set: newObj
            },{new: true}).then(()=>{
                res.json(getParam({success:true}))
            })
        }else{
            let list = [cartInfo]
            const cartInfoOne = new Cart({
                userId: userId,
                cartInfoList: list,
                username
            })
            console.log(cartInfoOne,123)
            cartInfoOne.save().then(()=>{
                res.json(getParam({success:true}))
            })
        }
        res.json(getParam({success:true}))
    })
}

const getCartList = function(req,res,next){
    const { userId } = req.query
    console.log(req.query)
    Cart.findOne({userId})
    .then((result) => {
        res.json(getList({"cartInfo":result}))
    })
}

const deleteCartList = function(req, res, next){
    const { index , userId} = req.query
    Cart.findOne({userId})
    .then(( result ) => {
        let list = result.cartInfoList
        list.splice(index,1)
        const newObj = {
            userId: userId,
            cartInfoList: list,
            username: result.username
        }
        Cart.findByIdAndUpdate(result._id,{
            $set: newObj
        },{new: true}).then(()=>{
            res.json(getParam({success:true}))
        })
    })
}

const modifyCartList =function( req, res, next){
    const { index , userId, count} = req.query
    Cart.findOne({userId})
    .then(( result ) => {
        let list = result.cartInfoList
        for(let i in list){
            if(i === index){
                list[i].count = count
            }
        }
        const newObj = {
            userId: userId,
            cartInfoList: list,
            username:result.username
        }
        Cart.findByIdAndUpdate(result._id,{
            $set: newObj
        },{new: true}).then(()=>{
            res.json(getParam({success:true}))
        })
    })
}

const getAllCartList = function( req, res, next){
    console.log(req.query,123)
    let pageSize = 6
    let { pageNo } = req.query
    console.log(req.query)
    async.parallel([
        function(cb){
            if(req.query.searchWord == ''){
                Cart.find({})
                .then((all)=>{
                    let pageCount = Math.ceil(all.length / pageSize)
                    cb(null,pageCount)
                })
            }else{
                let word = req.query.searchWord
                Cart.find({"username" : eval('/'+word+'/i') })
                .then((result)=>{
                    let pageCount = Math.ceil(result.length / pageSize)
                    cb(null,pageCount)
                })
            }
            
        },
        function(cb){
            if(req.query.searchWord == ''){
                Cart.find({})
                .skip( (pageNo-1) * pageSize )
                .limit( pageSize )
                .sort({_id: -1})
                .then((result) => {
                    cb(null,result)
                })
            }else{
                let word = req.query.searchWord
                Cart.find({"username" : eval('/'+word+'/i') })
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
module.exports = { cartAdd, getCartList, deleteCartList, modifyCartList, getAllCartList}
