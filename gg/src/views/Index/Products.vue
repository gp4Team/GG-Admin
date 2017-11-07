<template>
  <div class="wrapper">
      
      <div class="main">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input size="mini" v-model="searchWord" placeholder="关键字搜索"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" @click="search" type="primary" icon="el-icon-search" plain>搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" @click="addProducts" icon="el-icon-circle-plus-outline" type="primary" plain>添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="modify" size="mini" type="primary" icon="el-icon-edit" plain>修改</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="deletelist" size="mini" type="danger" icon="el-icon-delete" plain>删除</el-button>
            </el-form-item>

          </el-form>

           <el-table
              ref="multipleTable"
              :data="productList"
              highlight-current-row
              height="450"
              @selection-change="selectListInfo"
              >
              <el-table-column type="selection" width="30"> </el-table-column>
              <el-table-column type="index" width="30"> </el-table-column>
              <el-table-column class="pro-url" width="80" label="商品封面"> 
                  <template slot-scope='scope'>
                      <img :src="scope.row.goodsListImg" alt="封面">
                  </template>
              </el-table-column>
              <el-table-column prop="goodsName" label="商品名称" width=""> </el-table-column>
              <el-table-column prop="_id" label="商品ID"> </el-table-column>
              <el-table-column prop="price" width="100" sortable label="商品价格"> </el-table-column>
              <el-table-column prop="info" label="商品描述"> </el-table-column>
              
              <el-table-column prop="className" width="80" label="类型"> </el-table-column>
              <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      round plain type="primary">详情</el-button>
                  </template> 
               </el-table-column>
          </el-table>
          <Pagination :paginInfo="paginInfo" v-on:listenPaginEvent = 'changePageNo'></Pagination>
      </div>
      <product-form :modifyInfo="modifyInfo"  :dialogFormVisible="dialogFormVisible" v-on:listenToChildEvent = 'closeDialog'></product-form>
  </div>
</template>
<script>
import axios from 'axios'
import ProductForm from '../../components/ProductForm.vue'
import Pagination from '../../components/Pagination.vue'
export default {
    data() {
      return {
          productList: [],
          dialogFormVisible: false,
          currentPage : 1,
          paginInfo: {
              pageCount : 1,
              pageSize: 1
          },
          selectList: '',
          modifyInfo: {},
          searchWord: ''
      }
    },
    components:{
        ProductForm,
        Pagination
    },
    mounted(){
        this.getProductsList()
    },
    methods: {
      getProductsList(currentPage) {
          let params = { "pageNo" : currentPage || 1,searchWord: this.searchWord}
          let that = this
          axios.get('/ggserver/api/products/list',{params})
            .then(function(res){
                const data = res.data.content.data.page
                that.paginInfo.pageCount = data.pageCount
                that.paginInfo.pageSize = data.pageSize
                that.productList = data.result
            })
      },
      changePageNo(pageNo){
          this.currentPage = pageNo
          this.getProductsList(this.currentPage)
      },
      addProducts() {
          this.dialogFormVisible = true
      },
      closeDialog(data){
          this.dialogFormVisible = data.isShow
          
          if(data.isGetList){
            
            this.getProductsList()
          }
      },
      selectListInfo(info){
          let idArr = ''
          idArr += info.map((item)=>{
            var pattern = /\"(.*)\"/;
            // var testStr = item._id;
            // var result = testStr.match(pattern);
            return item._id;
          })
          console.log(idArr)
          this.selectList = idArr
      },
      deletelist() {
          let that = this
          this.$confirm('你走吧,我妈不让和傻子玩儿!!', '挽留', {
            confirmButtonText: '(ノ｀Д)ノ滚',
            cancelButtonText: '冷静下',
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
               axios.get('/ggserver/api/products/deletelist',{params})
                .then(function(res){
                  console.log('删除返回')
                  console.log(res.data.data)
                    if(res.data.data.success === true){
                        that.$message({
                          type: 'success',
                          message: '圆润的离开啦!'
                         });
                         that.getProductsList()
                    }else{
                        that.$message({
                          type: 'danger',
                          message: '哈哈，就不走!'
                        });
                    }
                })
            }
          })
      },
      modify() {
          let that = this
          this.dialogFormVisible = true
          let params = {"id": this.selectList}
          axios.get('/ggserver/api/products/getOneList',{params})
            .then(function(res){
                console.log(res.data.data.result)
                that.modifyInfo = res.data.data.result
            })
      },
      search(){
          this.getProductsList(1)
      }
    }
}
</script>
<style lang="scss">
    
    .main{
      .cell{
        img{
          width: 50px;
          height: 50px;
        }
      }
      .el-table td{
        padding: 8px 0 !important;
      }
    }
</style>


