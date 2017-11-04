const db = require('../utils/database.js')
//定义schema 域
const schema = new db.Schema({
    // "classID":{
    //     type: String,
    //     required:true,
    // },
    "goodsName":{
        type: String,
        required:true,
    },
    "goodsListImg":{
        type: String,
        required:true,
    },
    "price":{
        type: String,
        required:true,
    },
    "discount":{
        type: String,
        required:true,
    },
    "imgsUrl":{
        type: String,
        required:true,
    },
    "className":{
        type: String,
        required:true,
    },
    "info":{
        type: String,
        required:true,
    },
    "createTime":{
        type: Date,
        required:true
    },
    "goodsBrand":{
        type: String,
        required:true
    }
})
const Products = db.model('products',schema)
module.exports = Products
