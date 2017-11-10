const db = require('../utils/database.js')
//定义schema 域
const schema = new db.Schema({
    bannerUrl : {
        type:String,
        required:true
    },
    createTime : {
        type: Date,
        required:true
    },
})
const Banner = db.model('banners',schema)
module.exports = Banner
