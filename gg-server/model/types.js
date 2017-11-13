const db = require('../utils/database.js')
//定义schema 域
const schema = new db.Schema({
    "typename":{
        type: String,
        required:true,
    },
    "typeimg":{
        type: String,
        required:true,
    },
    "createTime":{
        type: Date,
        required:true
    }
})
const Types = db.model('types',schema)
module.exports = Types
