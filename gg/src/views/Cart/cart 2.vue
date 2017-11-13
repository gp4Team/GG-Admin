<template>
    <div class="main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input size="mini" v-model="searchWord" placeholder="关键字搜索"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" @click="search" type="primary" icon="el-icon-search" plain>搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="cartList" style="width: 100%"> 
            <el-table-column align="center" label="购物车 ID" prop="_id"></el-table-column>
            <el-table-column align="center" label="用户名" prop="username"></el-table-column>
            <el-table-column align="center" label="用户 ID" prop="userId"></el-table-column>
            <el-table-column align="center" label="购物车数量" prop="cartCount"></el-table-column>
            <el-table-column align="center" type="expand">
                <template slot-scope="props">
                    <!-- props.row -->
                    <el-form label-position="left" inline class="demo-table-expand" id="center-table">
                        <el-table :data="props.row.cartInfoList" height="250" border style="width: 100%;background:none">
                            <el-table-column align="center" label="商品图片"  width="80">
                                <template slot-scope='scope'>
                                    <img style="width:50px;height:50px;" :src="scope.row.goodsUrl" alt="封面">
                                </template>
                            </el-table-column>
                            <el-table-column style="background:none;" align="center" label="商品 ID" prop="goodsId" width="300"></el-table-column>
                            <el-table-column align="center" label="商品名" prop="goodsName" width="300"></el-table-column>
                            <el-table-column align="center" label="价格(元)" prop="price"></el-table-column>
                            <el-table-column align="center" label="数量" sortable prop="count"></el-table-column>
                            <el-table-column align="center" label="尺寸" prop="size"></el-table-column>
                            <el-table-column align="center" label="颜色分类" prop="color"></el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :paginInfo="paginInfo" v-on:listenPaginEvent = 'changePageNo'></Pagination>
    </div>
</template>
<script>
import axios from 'axios'
import Pagination from '../../components/Pagination.vue'
export default {
  data(){
    return {
        cartList: [],
        currentPage : 1,
        paginInfo: {
            pageCount : 1,
            pageSize: 1
        },
        searchWord: ''
    }
  },
  components:{
      Pagination
  },
  mounted(){
      this.getCartList()
  },
  methods: {
      getCartList(currentPage){
          let params = { "pageNo" : currentPage || 1, searchWord : this.searchWord }
          let that = this
          axios.get('ggserver/api/cart/allCartList', {params})
          .then(function(res){
              console.log(res)
              const data = res.data.content.data.page
              that.paginInfo.pageCount = data.pageCount
              that.paginInfo.pageSize = data.pageSize
              let list = data.result
              for(let i in list){
                  list[i].cartCount = list[i].cartInfoList.length
              }
              that.cartList = list
              
          })
      },
      changePageNo(pageNo){
          this.currentPage = pageNo
          this.getCartList(this.currentPage)
      },
      search(){
          this.getCartList(1)
      }
  }
}
</script>
<style lang="scss" scoped>
    #center-table {
        .el-table tr{
            background-color: #fdf8f8 !important;
        }
    }
</style>


