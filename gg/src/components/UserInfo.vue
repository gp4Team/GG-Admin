<template>
  <div class="user-wrapper">
     <el-row :gutter="20">
        <el-col :span="18">
            <div class="goodInfo"><i class="el-icon-bell warning"></i>亲爱的主人，上午好！</div>
        </el-col>
        <el-col :span="6">
            <i class="el-icon-edit-outline"></i>
            <i>修改</i>
        </el-col>
     </el-row>
     <div class="padding-lr-50">
         <el-row :gutter="20">
             
            <el-col :span="10">
                
                <img class="headimg" :src="dataInfo.userHeadImg" alt="">
            </el-col>
            
            <el-col :span="14">
                <el-form>
                    <el-form-item class="uploadImg">
                        <Upload ref="uploader" @choose-file="preview"  @upload-over="uploadOver"></Upload>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row :gutter="20" class="margin-t-10">
            <el-col :span="10">
                <el-button @click="modifyName"  plain size="mini" icon="">修改大名</el-button>
            </el-col>
            <el-col :span="14">
                <el-form ref="form" :model="dataInfo" size="mini">
                    <el-form-item>
                        <el-input @blur="isFocus = false" v-namefocus="isFocus" v-model="dataInfo.username"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="margin-t-10">
            <el-col :span="10">
                <el-button @click="modifyPwd"  plain size="mini" icon="">修改密码</el-button>
            </el-col>
            <el-col :span="14">
                <el-form ref="form" :model="dataInfo" size="mini">
                    <el-form-item>
                        <el-input type="password" @blur="ispwdFocus = false" v-pwdfocus="ispwdFocus" v-model="dataInfo.password"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
     </div>
     <div class="center">
         <el-button @click="saveUserInfo" type="primary" size="mini" plain>确定</el-button>
     </div>
  </div>
</template>
<script>
import Upload from '../components/Upload'
import axios from 'axios'
export default {
    props:{
        userInfo:{
            type:Object,
            required:true,
        }

    },
    components:{
        Upload
    },
    data(){
        return{
            isFocus:false,
            ispwdFocus:false,
            baseUrl: '',
            isModify:true,
            dataInfo:this.userInfo
        }
    },
    methods: {
        modifyName(){
            this.isFocus = true
        },
        modifyPwd(){
            this.ispwdFocus = true
        },
        saveUserInfo(){
            let that = this
            // this.dataInfo = {}
            let params = {
                username:this.dataInfo.username,
                password:this.dataInfo.password,
                roles:0,
                userHeadImg:this.baseUrl,
                modify:this.isModify,
                id:this.dataInfo.userId
            }
            axios.post('/ggserver/api/users/signUp',params)
            .then(function(res){
                console.log('数据返回')
                that.dataInfo = res.data.data.result
                that.$message({
                    message: '修改成功',
                    type: 'success'
                });
                that.dataInfo.password = ''
                that.uploadOver(true)
            })
            .catch(function(err){
                console.log(err);
            });
        },
        preview(data){
           this.baseUrl =  data.baseUrl;
            this.dataInfo.userHeadImg = data.baseUrl;
        },
        uploadOver(has){
            this.$emit('isUpdataUser',has)
        }
    }
}
</script>
<style lang="scss">
    .headimg{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: middle;
        border: 1px solid #ffe2fe;
    }
    .el-popover{
        background: rgba(255, 243, 255, 0.96);
    }
</style>


