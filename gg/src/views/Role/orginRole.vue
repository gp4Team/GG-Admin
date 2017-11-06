<template>    
  <div class="wrapper">
      <el-form :inline="true" class="demo-form-inline">
      			<el-form-item>
              <el-input  v-model="inputSearch" size="mini" placeholder="关键字搜索"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary"  icon="el-icon-search" v-on:click=" getUserList(2)" plain>搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-circle-plus-outline" type="primary" plain>添加</el-button>
            </el-form-item>
      </el-form>
      
     <el-table ref="singleTable" :data="tableData" border highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
				<el-table-column type="index" label="序列" width="80">
				</el-table-column>
				<el-table-column property="username" label="用户名" width="200">
				</el-table-column>
				<el-table-column property="userPhone" label="推荐人电话号码" width="250">
				</el-table-column>
				<el-table-column property="createTime" label="注册时间" width="250">
				</el-table-column>
				</el-table-column>
				<el-table-column  label="操作" >
					<template slot-scope="scope">
    				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
		</el-table>
		
		<div class="block">
   	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="100">
		</el-pagination>
  </div>
  </div>
</template>
<script>
		import axios from 'axios'
		
		export default {
	    data() {
		    return {
		      inputSearch: '',
		      tableData:[],
		      currentPage4: 4
		     }
	    },
		    
		  mounted(){
		   	 
      },
       
	    methods: {
	      setCurrent(row) {
	        this.$refs.singleTable.setCurrentRow(row);
	      },
	      handleCurrentChange(val) {
	        this.currentRow = val
	      },
	      handleEdit(index, row) {
	        console.log(index, row);
	        
	      },
	      handleDelete(index, row) {
	        console.log(index, row)
	      },
	      
	      handleSizeChange(val) {
           console.log(`每页 ${val} 条`);
        },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	      getUserList(pageNo){
		      	axios.post('/ggserver/api/usersList',{
		      		 pageNo:1
		      	})
		      	.then((res) => {
		      		console.log(res.data.content.data.results)
		      		const datalist =  res.data.content.data.results
		      	})
		      	.catch(function(err){
		      		console.log(err)
		       })
				 }  
	     
	    }
		}
</script>
<style lang="scss" scoped>

</style>


