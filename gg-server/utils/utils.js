module.exports = {
    getParam: function (data) {
      return {
        ret: true,
        "errcode": '0',
        "errmsg":'',
        "data":data
      }
    },
    getList: function(data){
      return {      //与后台定义的接口
        "content": {
          "data":data,
          "rows": []
        },
        "message": '查询成功',
        "state": 1
      }
    }
  }