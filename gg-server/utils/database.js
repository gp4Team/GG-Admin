const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/gg'
const options = {
    useMongoClient:true
}
mongoose.connect(url,options)
.then((db)=>{
    console.log('数据库连接成功')
})
.catch((err) => {
    console.log(err)
})
module.exports = mongoose