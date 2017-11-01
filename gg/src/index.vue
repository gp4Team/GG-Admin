<template>
  <div class="wrapper">
      <el-container style="">
        <el-header>
          <el-row :gutter="20">
            <el-col :span="21"><div class="grid-content">逛逛网后台管理系统</div></el-col>
            <el-col :span="3">
              <div class="grid-content">
                  <el-dropdown>
                    <img  v-if="showUname" class="head-img" src="/static/images/default.jpg" alt="">
                    <img  v-if="!showUname" class="head-img" src="/static/images/headimg.jpg" alt="">
                    <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item >{{!showUname == true?"注销":"注册"}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span v-if="!showUname">你好,{{this.$store.state.userInfo.username}}</span>
                  <span v-if="!showUname" @click="login">注销</span>
                  <span @click="login" v-if="showUname">登录</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-row :gutter="22">
            <el-col :span="4">
              <div class="grid-content">
                  <el-aside>
                      <el-menu :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff">
                        <el-submenu :index="item.dataIndex" v-for="(item,is) in leftMenu" :key="is">
                          <template slot="title">
                            <i :class="item.iconClass"></i>
                            <span>{{item.title}}</span>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item :class="{'active':i == activeName}" @click="go_path(i)" v-for="(i,inx) in leftMenu[is].list" :key="inx" index="1-1">{{i.secondName}}</el-menu-item>
                          </el-menu-item-group>
                        </el-submenu>
                        </el-menu>
                  </el-aside>
              </div>
            </el-col>
            <el-col :span="20" id="content-box">
              <div class="grid-content">
                  <el-main>
                    <transition
                      name="page-change-transition"
                      mode="out-in"
                      enter-active-class="animate-time zoomInUp"
                      leave-active-class="animate-time zoomOutLeft">
                      <keep-alive>
                          <router-view></router-view>
                      </keep-alive>
                  </transition>
                  </el-main>
              </div>
            </el-col>
        </el-row>
      </el-container>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
          isCollapse:false,
          showUname:this.$store.state.userInfo.username == '',
          leftMenu: [],
          activeName:''
      }
    },
    mounted() {
        let that = this;
        axios.get('/ggserver/api/nav/menulist')
          .then(function(res){
            console.log(res.data)
              that.leftMenu = res.data.leftMenu;
          })
          
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      go_path(item) {
        this.activeName = item
        this.$router.push({path:item.path,name:item.name})
      },
      login() {
        this.$router.push({path:'/'})
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #bb00b6;
    color: #fff;
    line-height: 60px;
    font-size: 20px;
    border-bottom: 1px solid #fff;
    .head-img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: middle;
    }
  }
  .el-aside {
    color: #333;
    max-width: 100%;
    .el-menu{
      border-right: none;
    }
  }
  .grid-content > span{
      font-size: 13px;
  }
  .el-row,.el-col,.grid-content{
    height: 100%
  }
  .el-menu-item.is-active{
    color: #fff;
    &.active{
      color: #ff35f7;
    }
  }
  #content-box{
    margin-top: 20px;
  }
  .el-menu-vertical-demo{
    width: 90px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
  }
  #content-box .grid-content{
    background: #fff;
  }
  
</style>