<template>
    <div>
        <el-button size="mini" :icon="hasChoose ? 'el-icon-success': 'el-icon-upload'" type="primary" plain @click="choose" >{{hasChoose ? '已选择' : '修改头像'}}</el-button>
        <input type="file" id="inputImg" style="display: none" accept=" image/jpeg, image/png" @change="chooseImg($event)">
    </div>
</template>
<script>
export default {
  data(){
      return{
          hasChoose: false,
          imgFile:null
      }
  },
  methods:{
      choose(){
          let input = document.getElementById('inputImg')
          input.click()
      },
      chooseImg(e){
          
          let that = this
          const file = e.target.files[0]
            if (file === undefined) return
            this.hasChoose = true
            // this.imgFile = file
            let previewUrl = e.target.value
            var reader = new FileReader();
                reader.readAsDataURL(file);//转化成base64数据类型
                reader.onload = function(e){
                    let data = {
                        baseUrl : this.result,
                        preview : file
                    }
                    that.hasChoose = true
                    that.$emit('choose-file', data)
            }
      }
  }
}
</script>
