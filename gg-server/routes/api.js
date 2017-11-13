var express = require('express');
var router = express.Router();
const userController = require('../controller/user.js')
const navController = require('../controller/nav.js')
const productsController = require('../controller/products.js')
const cartController = require('../controller/cart.js')
const upload = require('../utils/uploadimg')
const bannerController = require('../controller/banners.js')
const typesController = require('../controller/types.js')

/* GET home page. */
// 用户相关路由
router.post('/users/signUp', userController.signUp)
router.post('/users/signIn', userController.signIn)
router.get('/users/isLogin', userController.isLogin)
router.get('/users/isOut', userController.logout)
router.get('/users/list',userController.getUsersList)
router.get('/users/delete',userController.deleteUsers)

//产品相关路由
router.get('/products/list',productsController.getProductsList)
router.post('/products/saveList',productsController.saveProductsList)
router.get('/products/deletelist',productsController.deleteProducts)
router.get('/products/getOneList',productsController.getOneProducts)

//商品类型
router.post('/products/saveGoodsTypes',typesController.saveGoodsTypes)
router.get('/types/getList', typesController.getTypeList)
router.get('/types/deletelist',typesController.deleteTypeList)

//banner图
router.post('/banners/add',bannerController.saveBanners)
router.get('/banners/getList', bannerController.getBannerList)
router.get('/banners/deletelist',bannerController.deleteBannerList)

// cart 购物车
router.post('/cart/userCartAdd',cartController.cartAdd)
router.get('/cart/userCartList',cartController.getCartList)
router.get('/cart/userCartDelOne',cartController.deleteCartList)
router.get('/cart/userCartModOne',cartController.modifyCartList)
router.get('/cart/allCartList',cartController.getAllCartList)

// 左侧菜单
router.get('/nav/menulist', navController.getList)

module.exports = router;
