const db = require('../utils/database.js')
//定义schema 域
const schema = new db.Schema({
    userId: {
        type:String,
        required:true
    },
    username:{
        type: String,
        required: true
    },
    cartInfoList:{
        type:Array,
        required:true
    }
})
const Cart = db.model('carts',schema)
module.exports = Cart
