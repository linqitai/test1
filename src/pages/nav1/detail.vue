<template>
	<div>
	 <div style="margin-left:20px;">
          <h1>申请信息</h1>
             <div class="title">
               <h4>申请人类型　　　</h4>
                  <el-select v-model="value4" clearable placeholder="请选择">
                 <el-option
                   v-for="item in option1"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
                 </el-select>
             </div>
          <div class="title">
               <h4>收银台　　　　　</h4>
                <el-select v-model="value5" clearable placeholder="请选择">
               <el-option
                 v-for="item in option2"
                 :label="item.label"
                 :value="item.value">
               </el-option>
               </el-select>
          </div>
        <h1>店铺信息</h1>
        <div class="title"><h4>店铺名称　　　　</h4><input type="text" v-model="addform.addshopname"></div>
         <div class="title"><h4>店铺地址　　　　</h4><address-picker :opts="obj" v-model="addform.addshopaddress"></address-picker><br>
        <input type="text" v-model="addform.adddetaladdress" style="margin-left:110px;"placeholder="请输入详细地址"></div>
                 <div class="title"><h4>店铺电话　　　　</h4><input type="text" v-model="addform.addshopphone"></div>
        
        
        
         <div class="title"><h4>经营类型　　　　</h4>
         <el-select v-model="valuestyle" clearable placeholder="请选择" @change="rbackvalue">
          <el-option
            v-for="item in stylemeg"
            :label="item.type"
            :value="item.type"
            >
          </el-option>
        </el-select> <el-select v-model="valuestyles" clearable placeholder="请选择">
          <el-option v-if="stylemegs"
            v-for="item in stylemegs"
            :value="item.operateTypeId"
            :label="item.details"
            >
          </el-option>
        </el-select>
        </div>
       <h1>法人信息</h1>
        <div class="title"><h4>法人姓名　　　　</h4><input type="text" v-model="addform.addname"></div>
        <div class="title"><h4>身份证号　　　　</h4><input type="text" v-model="addform.addidcard"></div>
         <div class="title"><h4>手机号码　　　　</h4><el-row class="demo-autocomplete">
          <el-col :span="12">
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="请输入电话"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row></div>
        
         <h1>银行卡</h1>
        <div class="title"><h4>开户人　　　　　</h4><input type="text" v-model="addform.addidname"></div>
        <div class="title"><h4>开户行　　　　　</h4><input type="text" v-model="addform.addidbank"></div>
        <div class="title"><h4>卡号　　　　　　</h4><input type="text" v-model="addform.addidnum"></div> 
           <h1>相关照片</h1>
            <h4>营业执照　　　　</h4>
           <el-upload
            class="avatar-uploader"
            action="api/common/upload/image.do"
            :show-file-list="false"
            :on-success="handleAvatarScucess1"
            :before-upload="beforeAvatarUpload1">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br>
            <h4>身份证正面　　　</h4>
           <el-upload
            class="avatar-uploader"
            action="api/common/upload/image.do"
            :show-file-list="false"
            :on-success="handleAvatarScucess2"
            :before-upload="beforeAvatarUpload2">
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br> 
            <h4>身份证反面　　　</h4>
           <el-upload
            class="avatar-uploader"
            action="api/common/upload/image.do"
            :show-file-list="false"
            :on-success="handleAvatarScucess3"
            :before-upload="beforeAvatarUpload3">
            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br> 
            <h4>半身照　　　　　</h4>
           <el-upload
            class="avatar-uploader"
            action="api/common/upload/image.do"
            :show-file-list="false"
            :on-success="handleAvatarScucess4"
            :before-upload="beforeAvatarUpload4">
            <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br>
            <div class="btn"> <button  @click="save" type="button" class="el-button el-button--default"><span>仅保存</span></button>
            <button  @click="submit" type="button" class="el-button el-button--default"><span>提交审核</span></button></div>
           
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				stylemeg:[],
				stylemegs:[],
				value4:'',
				value5:'民生银行收银台',
				option1: [{
	              value: 2,
	              label: '臻e盾商户'
	              }, {
	              value: 1,
	              label: '普通用户'
	              }],
	              option2: [],
	             addform:{
              addshopname: '',
              addshopaddress:{
                province:'',
                district:'',
                city:'',
              },
              adddetaladdress: '',
              addname: '',
              addidcard: '',
              addshopphone: '',
              addidname: '',
              addidbank: '',
              addidnum: '',
            },
            obj:{},
            valuestyle:'',
            valuestyles:'',
            apiUrl3:'api/filter/apply/customerDrop.json',
            apiUrl2:'api/filter/apply/add.json',
            state2: '',
            imageUrl1: '',
             imageUrl2: '',
             imageUrl3: '',
             imageUrl4: '',
             valuemobile:'',
             labelid:'',
            }
		},
		 created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
        methods:{
        	getCustomer:function(){
        		var vm=this;
                vm.$http.post('api/filter/apply/firstOperateDrop.json',{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                        	vm.stylemeg=response.data.list
                        	console.log(response.data.list)
                        }
                    })
        	},add:function(){
        		console.log(111)
        		
        	},rbackvalue:function(){
              var vm=this
               var type={
                type:vm.valuestyle
               }
               vm.$http.post('api/filter/apply/secondOperateDrop.json',type,{emulateJSON:true})
                          .then((response) => {
                              if(response.data.code===0){
                                  vm.stylemegs=response.data.list
                                  
                        }else{
                            console.log(error)
                        }
                    })
            },
            querySearch(queryString, cb) {
           var vm=this
           var news={
            mobile:vm.state2
           }
         vm.$http.post(vm.apiUrl3,news,{emulateJSON:true})
            .then((response) => {
                if(response.data.code===0){
                    vm.restaurants=response.data.list
                    console.log(vm.restaurants)
                    
                }else{

                    console.log(response.data.error)
                }
            })
            /*var restaurants=vm.restaurants*/
        cb(vm.restaurants);
        }, handleSelect(item) {
          console.log(111)
          console.log(item)
          console.log(111)
          
          this.valuemobile=item.value
          this.labelid=item.label
          
        }, handleAvatarScucess1(res, file) {
            var vm=this;
            vm.imageUrl1 = URL.createObjectURL(file.raw);
            vm.imageUrl1 = file.response.url;
          }, handleAvatarScucess2(res, file) {
             var vm=this;
            vm.imageUrl2 = URL.createObjectURL(file.raw);
            vm.imageUrl2 = file.response.url;
            
          },handleAvatarScucess3(res, file) {
            var vm=this;
            vm.imageUrl3 = URL.createObjectURL(file.raw);
            vm.imageUrl3 = file.response.url;
          },beforeAvatarUpload1(file) {

          },beforeAvatarUpload2(file) {

          },beforeAvatarUpload3(file) {

          },
           handleAvatarScucess4(res, file) {
            var vm=this;
            vm.imageUrl4 = URL.createObjectURL(file.raw);
            vm.imageUrl4 = file.response.url;
          },
          beforeAvatarUpload4(file) {
          },

        	save:function(){
              var vm=this
             var imgpath=(vm.imageUrl1!==''?'1|'+vm.imageUrl1+',':'')+(vm.imageUrl2!==''?'2|'+vm.imageUrl2+',':'')+(vm.imageUrl3!==''?'3|'+vm.imageUrl3+',':'')+(vm.imageUrl4!==''?'4|'+vm.imageUrl4+',':'');
              var imgpath=imgpath.split('');
              imgpath.pop()
              var imgpath=imgpath.join('')
              var addmegs={
                sort:vm.value4,
                status:-2,
                customerId:vm.labelid,
                servTel:vm.valuemobile,
                shopName:vm.addform.addshopname,
                province:vm.addform.addshopaddress.province,
                city:vm.addform.addshopaddress.city,
                area:vm.addform.addshopaddress.district,
                address:vm.addform.adddetaladdress,
                linkName: vm.addform.addname,
                cardNum:vm.addform.addidcard,
                linkPhone:vm.addform.addshopphone,
                bankCard:vm.addform.addidnum,
                openBank:vm.addform.addidbank,
                cashType:1,
                imagePaths:imgpath,
                operateTypeId:vm.valuestyles,
                mobile:vm.state2
              }
              console.log(addmegs)
              if(addmegs.sort==''&&addmegs.customerId==''&&addmegs.servTel==''&&addmegs.shopName==''&&addmegs.province==''&&addmegs.city==''&&addmegs.area==''&&addmegs.address==''&&addmegs.linkName==''&&addmegs.cardNum==''&&addmegs.linkPhone==''&&addmegs.bankCard==''&&addmegs.openBank==''&&addmegs.imagePaths==''&&addmegs.operateTypeId==''){
               alert('不能为空')
              }else{
              	 vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$http.post(vm.apiUrl2,addmegs,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.$router.push('/CustomerApplication')
                        }else{
                            console.log(error)
                        }
                    })
                  
                    }).catch(() => {
                      
                    });
               
              }
              
            },submit:function(){
              var vm=this
              var imgpath=(vm.imageUrl1!==''?'1|'+vm.imageUrl1+',':'')+(vm.imageUrl2!==''?'2|'+vm.imageUrl2+',':'')+(vm.imageUrl3!==''?'3|'+vm.imageUrl3+',':'')+(vm.imageUrl4!==''?'4|'+vm.imageUrl4+',':'');
              var imgpath=imgpath.split('');
              imgpath.pop()
              var imgpath=imgpath.join('')
              var addmegs={
                sort:vm.value4,
                status:2,
                customerId:vm.labelid,
                servTel:vm.valuemobile,
                shopName:vm.addform.addshopname,
                province:vm.addform.addshopaddress.province,
                city:vm.addform.addshopaddress.city,
                area:vm.addform.addshopaddress.district,
                address:vm.addform.adddetaladdress,
                linkName: vm.addform.addname,
                cardNum:vm.addform.addidcard,
                linkPhone:vm.addform.addshopphone,
                bankCard:vm.addform.addidnum,
                openBank:vm.addform.addidbank,
                cashType:1,
                imagePaths:imgpath,
                operateTypeId:vm.valuestyles,
                mobile:vm.state2
              }

              

             if(addmegs.sort==''&&addmegs.customerId==''&&addmegs.servTel==''&&addmegs.shopName==''&&addmegs.province==''&&addmegs.city==''&&addmegs.area==''&&addmegs.address==''&&addmegs.linkName==''&&addmegs.cardNum==''&&addmegs.linkPhone==''&&addmegs.bankCard==''&&addmegs.openBank==''&&addmegs.imagePaths==''&&addmegs.operateTypeId==''){
               alert('不能为空')
              }else{

              	vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                       vm.$http.post(vm.apiUrl2,addmegs,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.$router.push('/CustomerApplication')
                        }else{
                            console.log(response.data.error)
                        }
                    })
                  
                    }).catch(() => {
                      
                    });
                
              }
            },
        }
		
	}
</script>