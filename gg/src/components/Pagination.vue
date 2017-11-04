<template>
    <div class="wrapper pagin">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="paginInfo.pageSize"
            layout="prev, pager, next, jumper"
            :total="paginInfo.pageSize * paginInfo.pageCount">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props:{
        paginInfo: {
            type:Object,
            required: true
        }
    },
    data() {
      return {
        currentPage: 1
      };
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$emit('listenPaginEvent',this.currentPage)
      }
    }
    
}
</script>
<style lang="scss" scoped>
    .pagin{
        margin-top: 50px;
        text-align: center;
    }
</style>
