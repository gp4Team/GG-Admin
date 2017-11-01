<template>
  <div class="wrapper">
      <div class="cover">
          <el-card class="box-card">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">登录</el-menu-item>
                    <el-menu-item index="2">注册</el-menu-item>
                </el-menu>
                <div class="form-box">
                    <template v-if="activeIndex == '1'">
                        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="90px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="loginName">
                                <el-input type="text" v-model="ruleForm1.loginName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="loginPass">
                                <el-input type="password" v-model="ruleForm1.loginPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item class="btn-ok">
                                <el-button type="primary" @click="loginForm('ruleForm1')">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                    <template v-if="activeIndex == '2'">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="90px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                            </el-form-item>
                           <el-form-item label="密码" prop="registerPass">
                                <el-input type="password" v-model="ruleForm2.registerPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="regcheckPass">
                                <el-input type="password" v-model="ruleForm2.regcheckPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item class="btn-ok">
                                <el-button type="primary" @click="registerForm('ruleForm2')">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </div>
        </el-card>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    //注册
    var checkUname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else {
            callback();
        }
      };
       var registerPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var regPass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.registerPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //登录
      var loginUname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else {
            callback();
        }
      };
      var loginPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      
      return {
        activeIndex: '1',
        ruleForm2: {
          registerPass: '',
          regcheckPass: '',
          username: ''
        },
        ruleForm1: {
            loginPass: '',
            loginName: ''
        },
        rules2: {
         registerPass: [
            { validator: registerPass, trigger: 'blur' }
          ],
          regcheckPass: [
            { validator: regPass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkUname, trigger: 'blur' }
          ]
        },
        rules1: {
          loginPass: [
            { validator: loginPass, trigger: 'blur' }
          ],
          loginName: [
            { validator: loginUname, trigger: 'blur' }
          ]
        }
      };
  },
  methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key;
      },
      //注册
      registerForm(formName) {
          let that = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
                axios.post('/ggserver/api/users/signUp',{username:this.ruleForm2.username,password:this.ruleForm2.registerPass})
                .then(function(res){
                    that.$message({
                        message: '注册成功，请登录',
                        type: 'success'
                    });
                    that.activeIndex = '1'
                })
                .catch(function(err){
                    console.log(err);
                });
            } else {
                this.$message.error('注册失败');
                return false;
            }
            });
        },
        loginForm(formName) {
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/ggserver/api/users/signIn',{username:this.ruleForm1.loginName,password:this.ruleForm1.loginPass})
                    .then(function(res){
                        console.log(res.data)
                        if(res.data.data.login === true){
                            
                            that.$router.push({path: '/index'})
                            that.$store.commit('saveUserInfo',res.data.data.username)
                        }else{
                            that.$message.error('密码输入错误');
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        background: url('/static/images/bg.jpg') no-repeat 0 0;
        background-size: cover;
    }
    .cover{
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .3);
    }
    .el-card{
        width: 380px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 400px;
    }
    .el-menu{
        display: flex;
    }
    .el-menu li{
        flex:1;
        text-align: center;
        font-size: 24px;
        font-weight: 300;
    }
    .form-box{
        width: 100%;
        height: 300px;
    }
    .el-form.demo-ruleForm{
        margin-top: 20px;
    }
    .el-form-item{
        margin-right: 20px;
    }
    .el-form-item.btn-ok{
        margin-left: 55px !important;
    }
</style>

