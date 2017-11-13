<template>
  <div class="container">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button size="mini" icon="el-icon-circle-plus-outline" type="primary" plain @click="dialogFormVisible = true">添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="deletelist">删除</el-button>
            </el-form-item>
          </el-form>

           <el-table
              @selection-change="selectListInfo"
              ref="multipleTable"
              :data="typeList"
              highlight-current-row
              height="450"
              >
              <el-table-column type="selection" width="30"></el-table-column>
              <el-table-column type="index" width="30"> </el-table-column>
              <el-table-column class="pro-url" width="200" label="类型图标"> 
                  <template slot-scope='scope'>
                      <img :src="scope.row.typeimg" alt="封面">
                  </template>
              </el-table-column>
              <el-table-column prop="typename" width="200" label="类型名称"> </el-table-column>
              <el-table-column prop="_id" label="类型ID"> </el-table-column>
          </el-table>

          <el-dialog title="商品类型" :visible.sync="dialogFormVisible">
            <el-form :model="TypesForm" :rules="rules" ref="TypesForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类型名称" prop="typename" >
                    <el-input v-model="TypesForm.typename"></el-input>
                </el-form-item>
                <el-form-item class="uploadImg" label="上传类型图标">
                    <div class="upload-demo el-input">
                        <input  @change="getImgPath" autocomplete="off" type="file" rows="3" validateevent="true" class="el-input__inner" style="
                        border: none;">
                    </div>
                </el-form-item>
            </el-form>   
              
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary"  @click="addGoodsType">添加</el-button>
                  <el-button @click="closeDialog">取消</el-button>
                </div>
            
        </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
 data(){
    return{
        dialogFormVisible: false,
        TypesForm: {
              typename:'',
              typeimg: '',
          },
        rules: {
            typename: [
                { required: true, message: '请输入商品类型', trigger: 'blur' }
        ]},
        typeList : [],
        selectList: ''
    }
  },

  methods: {
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
              axios.get('/ggserver/api/types/deletelist',{params})
              .then(function(res){
                console.log('删除返回')
                console.log(res.data.data)
                  if(res.data.data.success === true){
                      that.$message({
                        type: 'success',
                        message: '再也不见!'
                        });
                        that.getTypesList()
                  }else{
                      that.$message({
                        type: 'danger',
                        message: '无语!'
                      });
                  }
              })
          }
        })
    },

    getImgPath(e){
          let imgurl = e.target.files[0]
          let that = this
          var reader = new FileReader();
            reader.readAsDataURL(imgurl);//转化成base64数据类型
            reader.onload = function(e){
                that.TypesForm.typeimg=this.result
         }
      },

      addGoodsType() {
          console.log(this.TypesForm)
          let that = this
          axios.post('/ggserver/api/products/saveGoodsTypes',this.TypesForm)
          .then(function(res){
              console.log(res)
              if(res.data.data.success === true){
                that.$message({
                type: 'success',
                message: '添加成功！'
                });
                that.getTypesList()
               }else{
                that.$message({
                type: 'danger',
                message: '错误，请重新添加！'
                });   
               }     
          })
          .catch(function(err){
              console.log(err);  
          });
         this.dialogFormVisible = false  
      
    },

    closeDialog(){
      this.dialogFormVisible = false
      this.TypesForm = {
              typename:'',
              typeimg: '',
          }
    },

    getTypesList(){
      let that = this
      axios.get('/ggserver/api/types/getList')
      .then(function(res){
          console.log(res)
          that.typeList = res.data.content.data.typeInfo
      })
    }
  },

  mounted(){
      this.getTypesList()
  },
}
</script>

<style lang="scss" scoped>
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