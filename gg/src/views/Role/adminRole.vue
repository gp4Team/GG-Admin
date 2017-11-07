<template>
  <div class="wrapper">
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input size="mini" v-model="searchWord" placeholder="关键字搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="search" type="primary" icon="el-icon-search" plain>搜索</el-button>
        </el-form-item>
    </el-form>
      <el-table
    :data="usersList"
    style="width: 100%">
    <el-table-column
      type="index"
    >
    </el-table-column>
    <el-table-column
      prop="userHeadImg"
      label="头像">
      <template slot-scope='scope'>
          <img :src="scope.row.userHeadImg" alt="封面">
      </template>
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="_id"
      label="用户ID"
      width="250">
    </el-table-column>
    <el-table-column
      prop="roles"
      label="角色"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="deleteOne(scope.$index, scope.row)">删除</el-button>
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
        usersList:[],
        currentPage: 1,
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
      console.log('管理员管理')
      this.getUsersList()
    },
    methods:{
      getUsersList(currentPage){
        let that = this
        let params ={
          "pageNo" : currentPage || 1,
          "roles": 0,
          searchWord: this.searchWord
        }
        axios.get('/ggserver/api/users/list',{params})
        .then(function(res){
          console.log(res)
          const data = res.data.content.data.page
          that.paginInfo.pageCount = data.pageCount
          that.paginInfo.pageSize = data.pageSize
          that.usersList = data.result
          let storeuserId = that.$store.state.userInfo.userId
          console.log(that.$store.state.userInfo)
          for(let i in that.usersList){
            if(that.usersList[i].roles == '0'){
                that.usersList[i].roles = '管理员'
                if(that.usersList[i]._id == storeuserId){
                  console.log('是自己的')
                  console.log(that.usersList[i]._id)
                    console.log(that.usersList[i].username)
                }
            }
          }
        })
      },
      changePageNo(pageNo){
          this.currentPage = pageNo
          this.getUsersList(this.currentPage)
      },
      deleteOne(i,item){
        console.log(item._id)
        let that = this
        this.$confirm('确定要删除吗？','挽留',{
          confirmButtonText: '狠心删除',
            cancelButtonText: '再想想',
            type: 'warning',
            center: true
        }).then(()=>{
            let params = {id:item._id}
            axios.get('/ggserver/api/users/delete',{params})
            .then((res)=>{
                console.log(res)
                that.$message({
                    type: 'danger',
                    message: '删除成功'
                });
                that.getUsersList()
            })
        })
      },
      search(){
          this.getUsersList(1)
      }
    }
}
</script>
<style lang="scss" scoped>
  .cell{
    img{
      width: 50px;
      height: 50px;
    }
  }
</style>


