const getList = function (req, res) {
    res.json({
        leftMenu: [
            {
              dataIndex:'1',
              title: '首页',
              iconClass: 'el-icon-location',
              list: [
                {
                  secondName: '轮播图',
                  path: 'Index/Banners',
                  name: 'banners'
                },
                {
                  secondName: '类型管理',
                  path: 'Index/MainClass',
                  name: 'mainClass'
                },
                {
                  secondName: '商品管理',
                  path: 'Index/Products',
                  name: 'products'
                }
              ],
            },
            {
              dataIndex:'2',
              title: '分类',
              iconClass: 'el-icon-menu',
              list: [
                {
                  secondName: '分类管理',
                  path: '/',
                  name: ''
                }
              ],
            },
            {
              dataIndex:'3',
              title: '品牌',
              iconClass: 'el-icon-location',
              list: [
                {
                  secondName: '品牌管理',
                  path: '/',
                  name: ''
                }
              ],
            },
            {
              dataIndex:'4',
              title: '购物车',
              iconClass: 'el-icon-goods',
              list: [
                {
                  secondName: '购物车管理',
                  path: '/',
                  name: ''
                }
              ]
            },
            {
              dataIndex:'5',
              title: '用户管理',
              iconClass: 'el-icon-edit',
              list: [
                {
                  secondName: '管理员管理',
                  path: 'Role/adminRole',
                  name: 'adminRole'
                },
                {
                  secondName: '普通用户',
                  path: 'Role/orginRole',
                  name: 'orginRole'
                }
              ],
            }
        ],
    })
}
module.exports = { getList }
