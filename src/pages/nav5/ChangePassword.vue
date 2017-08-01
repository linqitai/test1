<template>
	<div style="margin-left: 20px;">
    <div class="title"><h4>当前密码　　　　</h4><input type="text" v-model="passwordval.beforepassword"></div>
    <div class="title"><h4>新密码　　　　　</h4><input type="text" v-model="passwordval.newpassword"></div>
    <div class="title"><h4>确认密码　　　　</h4><input type="text" v-model="passwordval.confirm"></div>
     <div class="btn"> <button  @click="changepassword" type="button" class="el-button el-button--default"><span>修改密码</span></button></div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        apiUrl:'api/filter/user/editPassword.json',
        apiUrl1:'api/common/userInfo.json',
        passwordval:{
         beforepassword:'',
         newpassword:'',
         confirm:'',
        },
       megs:[],
      };
    },
    created:function(){
      this.getCustomers() 
    },
    methods: {

      getCustomers:function(){
        var vm=this;
        vm.$http.post(vm.apiUrl1,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        vm.megs=response.data.obj
                         
                          console.log(response.data)
                          
                      }else{
                        console.log(response.data.error)
                      }
                    })
      },
     changepassword:function(){
            var vm=this;
      if(vm.passwordval.newpassword.length<6||vm.passwordval.newpassword!==vm.passwordval.confirm){
        alert('密码不能少于6位，且修改密码必须保持一致')
      }else{
         var password={
        userId:vm.megs.userId,
        currentPwd:vm.passwordval.beforepassword,
        newPwd:vm.passwordval.newpassword,
        newPwd1:vm.passwordval.confirm
      };
      vm.$http.post(vm.apiUrl,password,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        vm.megs=response.data.obj
                      }else{
                        console.log(response.data.error)
                      }
                    })
        vm.passwordval={}
      }
     
     }
    }
  }
</script>