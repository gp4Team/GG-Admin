const db = require('../utils/database.js')
//定义schema 域
const schema = new db.Schema({
    userName: {
        type:String,
        required:true
    },
   userPwd:{
        type:String,
        required:true
    },
    userPhone: {
        type: Number,
        required: false
    },
    createTime: {
    	type: Date,
        required: true
    }
})
const fontendUser = db.model('fontendusers',schema)
module.exports = fontendUser