<template>
    <div class="wraper">
        <el-dialog :show-close=false width="40%" title="商品信息" :visible.sync="dialogFormVisible">
        <el-form :model="goods_form" :rules="rules" ref="goods_form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="goods_form.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="goodsBrand">
                <el-input v-model="goods_form.goodsBrand"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="price">
                <el-input v-model="goods_form.price"></el-input>
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
                <el-input v-model="goods_form.discount"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="className">
                <el-select v-model="goods_form.className" placeholder="请选择商品类型">
                <el-option label="衬衫" value="衬衣"></el-option>
                <el-option label="连衣裙" value="连衣裙"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="uploadImg" label="上传商品封面">
                <div class="upload-demo el-input">
                    <input @change="getImgPath" autocomplete="off" type="file" rows="3" validateevent="true" class="el-input__inner" style="
                    border: none;">
                </div>
            </el-form-item>
            <el-form-item label="商品描述" prop="info">
                <el-input type="textarea" v-model="goods_form.info"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="sendProductsInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
import mime from 'mime'
export default {
  props: {
    dialogFormVisible: {
        type:Boolean,
        required:true
    },
    modifyInfo: {
        type:Object,
        required:false
    }
},
  data() {
      return {
          goods_form: {
               goodsName : '',
               discount: 1,
               price: '',
               className: '',
               info: '',
               goodsListImg: '',
               imgsUrl: [],
               goodsBrand:'',
               _id: ''
          },
          
          rules: {
            goodsName: [
                { required: true, message: '请输入商品名称', trigger: 'blur' },
                { min: 3, max: 20, message: '长度在 3 到 30个字符', trigger: 'blur' }
            ],
            price: [
                { required: true, message: '请输入商品价格', trigger: 'blur' },
            ],
            className : [
                {required: true, message: '请输入商品类型', trigger: 'blur'}
            ],
            goodsBrand: [
                {required: true, message: '请输入商品品牌', trigger: 'blur'}
            ],
            info: [
                {required: true, message: '简单介绍一下', trigger: 'blur'},
                { min: 0, max: 40, message: '长度在 0 到 40个字符', trigger: 'blur' }
            ]
          },
         closeParam: {
             isShow: false,
             isGetList:false
         }
      }
  },
  watch:{
      modifyInfo(){
          if(this.modifyInfo._id){
              this.goods_form=this.modifyInfo
          }
          
      }
  },
  methods: {
      sendProductsInfo() {
        let that = this
        axios.post('/ggserver/api/products/saveList',this.goods_form)
          .then(function(res){
              console.log(res)
              that.closeParam.isGetList = true
             that.closeDialog()
             
          })
          .catch(function(err){
              console.log(err);
          });
      },
      closeDialog(){
          this.$emit('listenToChildEvent',this.closeParam)
          this.goods_form = {
               goodsName : '',
               discount: 1,
               price: '',
               className: '',
               info: '',
               goodsListImg: '',
               imgsUrl: [],
               goodsBrand:'',
               id: ''
          }
          
      },
      getImgPath(e){
          let imgurl = e.target.files[0]
          let that = this
          var reader = new FileReader();
            reader.readAsDataURL(imgurl);//转化成base64数据类型
            reader.onload = function(e){
                that.goods_form.goodsListImg=this.result
         }
      }
  }
}
</script>
<style lang="scss" >
    .uploadImg{
        .upload-demo.el-input{
            width: 200px;
            .el-input__inner{
                border: none !important;
                width: 200px;
                height: 20px;
            }
        }
    }
    .el-table__row:hover{
         background-color: rgba(253, 146, 250, 0.14) !important;
     }
     .el-table--enable-row-hover .el-table__body tr:hover>td{
          background-color: rgba(253, 146, 250, 0.14);
     }
     .el-table__body tr.current-row>td {
        background: rgba(253, 146, 250, 0.14) !important;
    }
</style>


