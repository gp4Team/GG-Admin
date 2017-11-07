<template>
  <div class="wrapper">
      <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button size="mini" icon="el-icon-circle-plus-outline" type="primary" plain>添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-edit" plain>修改</el-button>
            </el-form-item>
            <el-form-item>
              <el-button  size="mini" type="danger" icon="el-icon-delete" plain>删除</el-button>
            </el-form-item>
      </el-form>
      <!-- <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item class="banner" v-for="item in bannerList" :key="item">
              <img :src="item.bannerImg" alt="">
          </el-carousel-item>
      </el-carousel> -->
      <el-carousel :interval="2000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-table
          ref="multipleTable"
          :data="bannerList"
          height="380"
          >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" width="80"> </el-table-column>
          <el-table-column class="pro-url" label="轮播图"> 
              <template slot-scope='scope'>
                  <img :src="scope.row.bannerImg" alt="封面">
              </template>
          </el-table-column>
          <el-table-column prop="createTime" label="上传时间" width="200"> </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      bannerList : [
        {
          bannerImg: '/static/images/bg.jpg',
          createTime: '2017-11-3 20:30:00'
        },
        {
          bannerImg: '/static/images/default.jpg',
          createTime: '2017-11-3 20:30:00'
        },
        {
          bannerImg: '/static/images/default.jpg',
          createTime: '2017-11-3 20:30:00'
        },
        {
          bannerImg: '/static/images/default.jpg',
          createTime: '2017-11-3 20:30:00'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
  .cell img{
     width: 50px;
     height: 50px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>


