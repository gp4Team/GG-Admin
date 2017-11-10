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
            <el-form-item label="颜色分类">
                <el-tag
                :key="tag"
                v-for="tag in dynamicTagsColor"
                closable
                :disable-transitions="false"
                @close="colorClose(tag)">
                {{tag}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="inputVisibleColor"
                v-model="inputValueColor"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleColorConfirm"
                @blur="handleColorConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showColor">+ 添加</el-button>
            </el-form-item>
            <el-form-item label="尺寸分类">
                <el-tag
                :key="tag"
                v-for="tag in dynamicTagsSize"
                closable
                :disable-transitions="false"
                @close="sizeClose(tag)">
                {{tag}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="inputVisibleSize"
                v-model="inputValueSize"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleSizeConfirm"
                @blur="handleSizeConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showSize">+ 添加</el-button>
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
                { min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur' }
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
                {required: true, message: '简单介绍一下', trigger: 'blur'}
            ]
          },
         closeParam: {
             isShow: false,
             isGetList:false
         },
        //  颜色 标签
        dynamicTagsColor: [],
        inputVisibleColor: false,
        inputValueColor: '',
        //  尺寸 标签
        dynamicTagsSize: [],
        inputVisibleSize: false,
        inputValueSize: ''
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
        this.goods_form.dynamicTagsColor = this.dynamicTagsColor
        this.goods_form.dynamicTagsSize = this.dynamicTagsSize
        console.log(this.goods_form)
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
               id: '',
               dynamicTagsSize:[],
               dynamicTagsColor:[]
          }
          
      },
      getImgPath(e){
          let imgurl = e.target.files[0]
          console.log('图片imgurl')
          console.log(imgurl)
          let that = this
          var reader = new FileReader();
            reader.readAsDataURL(imgurl);//转化成base64数据类型
            reader.onload = function(e){
                that.goods_form.goodsListImg=this.result
         }
      },
     // 颜色
      colorClose(tag) {
        this.dynamicTagsColor.splice(this.dynamicTagsColor.indexOf(tag), 1);
      },

      showColor() {
        this.inputVisibleColor = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleColorConfirm() {
        let inputValueColor = this.inputValueColor;
        if (inputValueColor) {
          this.dynamicTagsColor.push(inputValueColor);
        }
        this.inputVisibleColor = false;
        this.inputValueColor = '';
      },
      // 尺寸
      sizeClose(tag) {
        this.dynamicTagsSize.splice(this.dynamicTagsSize.indexOf(tag), 1);
      },

      showSize() {
        this.inputVisibleSize = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleSizeConfirm() {
        let inputValueSize = this.inputValueSize;
        if (inputValueSize) {
          this.dynamicTagsSize.push(inputValueSize);
        }
        this.inputVisibleSize = false;
        this.inputValueSize = '';
      }
  }
}
</script>
<style lang="scss" >
    .uploadImg{
        margin-bottom: 10px;
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


