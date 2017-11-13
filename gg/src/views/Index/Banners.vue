<template>
  <div class="wrapper">
      <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button size="mini" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true" type="primary" plain>添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="deletelist"  size="mini" type="danger" icon="el-icon-delete" plain>删除</el-button>
            </el-form-item>
      </el-form>
      <el-row :gutter="50">
        <el-col :span="12">
          <div class="grid-content bg-purple">
              <el-table @selection-change="selectListInfo" ref="multipleTable" :data="bannerList" height="380" >
                <el-table-column type="selection" width="50"> </el-table-column>
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column class="pro-url" label="轮播图"> 
                    <template slot-scope='scope'>
                        <img :src="scope.row.bannerUrl" alt="封面">
                    </template>
                </el-table-column>
                <el-table-column prop="_id" label="轮播图ID" width="250"> </el-table-column>
                <el-table-column prop="createTime" label="上传时间" width="130"> </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light margin-t-50">
            <el-button type="text">轮播预览</el-button>
              <el-carousel indicator-position="outside" width="350px" height="149px">
                <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                    <img style="width:100%;height:149px;" :src="item.bannerUrl" alt="轮播">
                </el-carousel-item>
              </el-carousel>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="轮播图" :visible.sync="dialogFormVisible">
        <el-upload
            ref="upload"
            action="/ggserver/api/banners/img"
            list-type="picture-card"
            :auto-upload=false
            :on-preview="handlePictureCardPreview"
            :http-request="upload"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      bannerList : [],
        uploadImgList:[],
        baseImgList: [],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
         selectList: ''
    }
  },
  mounted(){
      this.getBannerList()
  },
  methods:{
    getBannerList(){
      let that = this
      axios.get('/ggserver/api/banners/getList')
      .then(function(res){
          console.log(res)
          that.bannerList = res.data.content.data.bannerInfo
          for(let i in that.bannerList){
              let da = that.bannerList[i].createTime
              da = new Date(da);
              var year = da.getFullYear();
              var month = da.getMonth()+1;
              var date = da.getDate();
              that.bannerList[i].createTime = [year,month,date].join('-');
          }
      })
    },
    handleRemove(file, fileList) {
      this.uploadImgList = []
      this.baseImgList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upload(file){
      console.log('上传')
      this.uploadImgList.push(file.file)

    },
    submitUpload() {
      this.$refs.upload.submit();
      let that = this
      for(let i in this.uploadImgList){
          var reader = new FileReader();
          reader.readAsDataURL(this.uploadImgList[i]);//转化成base64数据类型
          reader.onload = function(e){
              that.uploadBanners(this.result)
          } 
      }
      
    },
    uploadBanners(params){
        console.log('上传图片参数')
        let that = this
        axios.post('/ggserver/api/banners/add', {params})
        .then(function(res){
          console.log(res)
          if(res.data.data.success === true){
            that.$message({
              type: 'success',
              message: '上传成功！'
            });
            that.$refs.upload.clearFiles();
            that.baseImgList = []
            that.uploadImgList = []
            that.getBannerList()
          }else{
            that.$message({
              type: 'danger',
              message: '错误，请重新上传！'
            });
          }
          that.dialogFormVisible = false
        })
    },
    selectListInfo(info){
        let idArr = ''
        idArr += info.map((item)=>{
          var pattern = /\"(.*)\"/;
          return item._id;
        })
        console.log(idArr)
        this.selectList = idArr
    },
    deletelist(){
        let that = this
        this.$confirm('真的要狠心删除吗', '挽留', {
          confirmButtonText: '再见',
          cancelButtonText: '回来吧',
          type: 'warning',
          center: true
        }).then(() => {
          if(that.selectList.length == 0){
              that.$message({
                type: 'warning',
                message: '至少选择一项删除!'
              });
          }else{
            let params = {'ids':that.selectList}
              axios.get('/ggserver/api/banners/deletelist',{params})
              .then(function(res){
                console.log('删除返回')
                console.log(res.data.data)
                  if(res.data.data.success === true){
                      that.$message({
                        type: 'success',
                        message: '再也不见!'
                        });
                        that.getBannerList()
                  }else{
                      that.$message({
                        type: 'danger',
                        message: '无语!'
                      });
                  }
              })
          }
        })
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
     width: 80px;
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


