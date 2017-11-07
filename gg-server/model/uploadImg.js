const db = require('../utils/database.js')
//定义schema 域
const schema = new db.Schema({
    "uploadUrl":{
        type: String,
        required:true,
    }
})
const UploadImg = db.model('uploadImg',schema)
module.exports = UploadImg
