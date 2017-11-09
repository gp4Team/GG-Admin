<template>
  <div class="wrapper">
      <el-container style="">
        <el-popover
            ref="popover1"
            placement="bottom"
            width="320"
            trigger="click"
            v-model="showPop">
            <UserInfo :userInfo="userInfo" v-on:isUpdataUser = 'closePop'></UserInfo>
          </el-popover>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="20"><div class="grid-content">逛逛网后台管理系统</div></el-col>
            <el-col :span="4">
              <div class="grid-content" v-popover:popover1>
                  <el-dropdown>
                    <img  v-if="showUname" class="head-img" src="/static/images/default.jpg" alt="">
                    <img  v-if="!showUname" class="head-img" :src="userInfo.userHeadImg ? userInfo.userHeadImg : '/static/images/default.jpg'" alt="">
                    <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item >{{!showUname == true?"注销":"注册"}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span v-if="!showUname">你好，{{userInfo.username}}</span>
                  <span class="warning" v-if="!showUname" @click="logout">注销</span>
                  <span class="warning" @click="login" v-if="showUname">登录</span>
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
                          <el-menu-item-group class="sonMenu">
                            <el-menu-item :class="{'active':i == activeName}" @click="go_path(item,i)" v-for="(i,inx) in leftMenu[is].list" :key="inx" index="1-1">{{i.secondName}}</el-menu-item>
                          </el-menu-item-group>
                        </el-submenu>
                        </el-menu>
                  </el-aside>
              </div>
            </el-col>
            <el-col :span="20" id="content-box">
              <div class="grid-content">
                    <transition
                        name="fade"
                        mode="out-in" >
                        <el-main>
                          <Breadcrumb :breadcrumbInfo = 'breadcrumbInfo'></Breadcrumb>
                          <keep-alive>
                              <router-view></router-view>
                          </keep-alive>
                        </el-main>
                  </transition>
              </div>
            </el-col>
        </el-row>
      </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import Breadcrumb from './components/Breadcrumb.vue'
import UserInfo from './components/UserInfo'
  export default {
    data() {
      return {
          isCollapse:false,
          showUname:false,
          leftMenu: [],
          activeName:'',
          userInfo: {
            username:'',
            userId: '',
            userHeadImg:''
          },
          breadcrumbInfo: {
              titleFirst: '',
              titleSecond: ''
          },
          showPop:false
      }
    },
    components: {
      Breadcrumb,
      UserInfo
    },
    mounted() {
        this.getNavMenu()
        this.isLogin()
    },
    methods:{
      isLogin() {
        let that = this
        console.log('登录状态')
        axios.get('/ggserver/api/users/isLogin')
        .then(function(res){
            that.userInfo.username = res.data.data.username
            that.userInfo.userId = res.data.data.userId
            that.userInfo.userHeadImg = res.data.data.userHeadImg
            // that.userInfo.password = res.data.data.password
            let param = {
                username : res.data.data.username,
                userId: res.data.data.userId
            }
            that.$store.commit('saveUserInfo',param)
            that.showUname = !(res.data.data.login)
        })
      },
      getNavMenu (){
        let that = this;
        axios.get('/ggserver/api/nav/menulist')
          .then(function(res){
            console.log(res.data)
              that.leftMenu = res.data.leftMenu;
          })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      go_path(parant,item) {
        this.activeName = item
        this.$router.push({path:item.path,name:item.name})
        this.breadcrumbInfo.titleFirst = parant.title
        this.breadcrumbInfo.titleSecond = item.secondName
      },
      login() {
        this.$router.push({path:'/'})
      },
      logout() {
        console.log('登出状态')
        let that = this
        axios.get('/ggserver/api/users/isOut')
        .then(function(res){
            if(res.data.data.logout === true){
                that.$router.push({path:'/'})
            }
            
        })
      },
      closePop(has){
          if(has){
            this.showPop = false
          }
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>