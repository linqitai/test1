<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input  type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <div style="position:relative">
    <el-input v-model="ruleForm2.input" placeholder="请输入验证码" style="margin-bottom:35px;width:70%;"auto-complete="off"></el-input><span style="position: absolute;top:3px;right: 3px;"><img @click="newimg" :src="myurl"></span></div>
    <span style="margin: -30px 0 5px 5px;color:red;display:block;font-size: 10px">{{errorinfo}}</span>
    <!-- <el-form-item prop="">
      <el-input type="text" v-model="" auto-complete="off" placeholder="验证码"></el-input>
    </el-form-item> -->
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
/*  import { requestLogin } from '../api/api';
  import NProgress from 'nprogress'*/

  export default {
    data() {
      return {
        realName:'',
        apiUrl:'api/checkCode.jpg',
        apiUrl1:'api/login.json',
        logining: false,
        ruleForm2: {
          account: 'huangkai',
          checkPass: '123456',
          input:''
        },
        myurl:'',
        errorinfo:'',
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    created: function() {
            this.getCustomers()
 
    },
    methods: {
    handleReset2() {

      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var vm=this
      var inpt={
          username : vm.ruleForm2.account,
          password:vm.ruleForm2.checkPass,
          inputCode:vm.ruleForm2.input
        };
        //登陆请求
        vm.$http.post(vm.apiUrl1,inpt,{emulateJSON:true})
         .then((response) => {
            if(response.data.code===0){
            vm.$router.push({ path: '/CustomerApplication' });
            }else{
              vm.errorinfo=response.data.error
              }
          })
        },
      
       getCustomers: function() {
        var vm = this
        vm.$http.get(vm.apiUrl)
        .then((response) => {
          vm.myurl=response.url+'?'+Math.random()
          console.log(Math.random())
          console.log(vm.myurl)
        })
       },
      newimg:function(){
        this.getCustomers()
      }
    }
  }

</script>


<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    border: 2px solid #8492A6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>

