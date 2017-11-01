var express = require('express');
var router = express.Router();
const userController = require('../controller/user.js')
const navController = require('../controller/nav.js')
/* GET home page. */
// 用户相关路由
router.post('/users/signUp', userController.signUp)
router.post('/users/signIn', userController.signIn)
router.get('/nav/menulist', navController.getList)

module.exports = router;
