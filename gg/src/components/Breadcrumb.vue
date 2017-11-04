<template>
<div class="brea-head">
    <el-breadcrumb v-if="breadcrumbInfo.titleFirst != ''" separator="/" class="brea-head">
        <el-breadcrumb-item>{{breadcrumbInfo.titleFirst}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadcrumbInfo.titleSecond}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
  
</template>
<script>
export default {
  props: {
      breadcrumbInfo: {
          type: Object,
          required:true
      }
  },
  data() {
      return {

      }
  }
}
</script>
<style lang="scss" scoped>
    .brea-head{
        margin-bottom: 15px;
        height: 30px;
        border-bottom: 1px solid #efefef;
    }
</style>

