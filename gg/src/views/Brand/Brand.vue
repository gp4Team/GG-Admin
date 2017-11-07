<template>
	<div class="type">
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
	  	<el-table
	      ref="multipleTable"
	      :data="classifyList"
	      height="380"
	      >
	      <el-table-column type="selection" width="50"> </el-table-column>
	      <el-table-column type="index" width="80"> </el-table-column>
	      <el-table-column class="pro-url" label="图片"> 
	          <template scope='scope'>
	              <img :src="scope.row.classifyImg" alt="封面">
	          </template>
	      </el-table-column>
	      <el-table-column prop="createTime" label="上传时间" width="200"> </el-table-column>
	      <el-table-column prop="classify" label="分类" width="100"> </el-table-column>
	      <el-table-column prop="brand" label="品牌" width="100"> </el-table-column>
	  </el-table>
	</div>
	
</template>

<script>
export default {
  data(){
    return{
      classifyList : [
        {
          classifyImg: '/static/images/bg.jpg',
          createTime: '2017-11-3 20:30:00',
          classify: '化妆品',
          brand: '水密码'
        },
        {
          classifyImg: '/static/images/bg.jpg',
          createTime: '2017-11-3 20:30:00',
          classify: '鞋，箱包',
          brand: '双星名人'
        },
        {
          classifyImg: '/static/images/bg.jpg',
          createTime: '2017-11-3 20:30:00',
          classify: '居家生活',
          brand: '洁玉'
        },
        {
          classifyImg: '/static/images/bg.jpg',
          createTime: '2017-11-3 20:30:00',
          classify: '运动户外',
          brand: '迈图'
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