var express = require('express');
var router = express.Router();
const userController = require('../controller/user.js')
const navController = require('../controller/nav.js')
const productsController = require('../controller/products.js')
/* GET home page. */
// 用户相关路由
router.post('/users/signUp', userController.signUp)
router.post('/users/signIn', userController.signIn)
router.get('/users/isLogin', userController.isLogin)
router.get('/users/isOut', userController.logout)

//产品相关路由
router.get('/products/list',productsController.getProductsList)
router.post('/products/saveList',productsController.saveProductsList)
router.get('/products/deletelist',productsController.deleteProducts)
router.get('/products/getOneList',productsController.getOneProducts)

router.get('/nav/menulist', navController.getList)

module.exports = router;
