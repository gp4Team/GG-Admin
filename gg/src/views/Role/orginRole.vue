<template>    
  <div class="wrapper">
      <el-form :inline="true" class="demo-form-inline">
      			<el-form-item>
              <el-input  v-model="inputSearch" size="mini" placeholder="关键字搜索"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search" plain>搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-circle-plus-outline" type="primary" plain>添加</el-button>
            </el-form-item>
      </el-form>
      
     <el-table ref="singleTable" :data="tableData" border highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
				<el-table-column type="index" label="序列" width="80">
				</el-table-column>
				<el-table-column property="userName" label="用户名" width="200">
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
  </div>
</template>
<script>
export default {
   data() {
    return {
      inputSearch: '',
      tableData: [{
          userName: '王小虎',
          userPhone: '13471134339',
          createTime: '2014-08-09'
      }]
      }
    },
    
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>
<style lang="scss" scoped>

</style>


