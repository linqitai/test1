

<template>
	 <div style="margin-left:20px;">
	            <h1>申请信息</h1>
    	          <div class="title"><h4 style="display:inline-block">申请人类型　　　　</h4><span> {{formatsort(editemegs.sort.value)}}</span></div>
    	          <div class="title"><h4 style="display:inline-block">收银台　　　　　　</h4><span>民生银行收银台</span></div>
    	          <div class="title"><h4 style="display:inline-block">申请时间　　　　　</h4><span v-if="editemegs.created">{{format(editemegs.created.value)}}</span></div>
    	          <div class="title"><h4 style="display:inline-block">申请状态　　　　　</h4><span v-if="editemegs.status">{{formatstatus(editemegs.status.value)}}</span></div>
	          <h1>店铺信息</h1>
	           <div class="title"><h4>店铺名称　　　　　</h4><input type="text" name="" v-if="editemegs.shopName"v-model="editemegs.shopName.value"></div>
	            <div class="title" style="position: relative"><h4>店铺地址　　　　　</h4><div><span v-if="editemegs.province">{{editemegs.province.value}}　　</span><span v-if="editemegs.city">{{editemegs.city.value}}　　</span><span v-if="editemegs.area">{{editemegs.area.value}}　　</span><i class="el-icon-edit" @click="editaddress('addaddress')"></i></div><address-picker :opts="obj" v-model="shopaddres"style="display:inline-block;margin:10px 0 0 0px;" v-show="seleaddress"></address-picker>
	           <br>
	           <input type="text" name="" style="margin-left:125px;" placeholder="请输入详细地址" v-if="editemegs.address" v-model="editemegs.address.value"></div>
	            <div class="title"><h4>店铺电话　　　　　</h4><input type="text" v-model="state3"><!-- <el-row class="demo-autocomplete">
	            <el-col :span="12">
	              <el-autocomplete
	                class="inline-input"
	                v-model="state3"
	                :fetch-suggestions="querySearch"
	                placeholder="请输入店铺电话"
	                :trigger-on-focus="false"
	                @select="handleSelect"
	              ></el-autocomplete>
	            </el-col>
	                     </el-row> --></div>
	           <div class="title"><h4>经营类型　　　　　</h4>
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
	             <div class="title"><h4>法人姓名　　　　　</h4><input type="text" v-if="editemegs.linkName" v-model="editemegs.linkName.value"></div>
	             <div class="title"><h4>身份证号　　　　　</h4><input type="text" v-if="editemegs.cardNum"  v-model="editemegs.cardNum.value"></div>
	             <div class="title"><h4>手机号码　　　　　</h4><input type="text" v-if="editemegs.linkPhone" v-model="editemegs.linkPhone.value"></div>
	           <h1>银行卡</h1>  
	             <div class="title"><h4>开户人　　　　　　</h4><input type="text" v-if="editemegs.linkName" v-model="editemegs.linkName.value"></div>
	             <div class="title"><h4>开户行　　　　　　</h4><input type="text" v-if="editemegs.openBank" v-model="editemegs.openBank.value"></div>
	             <div class="title"><h4>卡号　　　　　　　</h4><input type="text" v-if="editemegs.bankCard" v-model="editemegs.bankCard.value"></div>
	            <h1>相关照片</h1>
	               <div  class="title"><h4>营业执照　　　　　</h4><!-- <img class="eideimg" v-if="editemegs.imageList[0]" :src="editemegs.imageList[0].path" >
	               <i class="el-icon-edit" @click="editaddress('eidturl1')"></i> -->
	               <el-upload
	              class="avatar-uploader upload"
	              action="api/common/upload/image.do"
	              :show-file-list="false"
	              :on-success="handleAvatarScucess5"
	              :before-upload="beforeAvatarUpload5">
	              <img v-if="imageUrl5" :src="imageUrl5" class="avatar">
	              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	            </el-upload></div> <br>
	               <div  class="title"><h4>身份证正面　　　　</h4><!-- <img class="eideimg" v-if="editemegs.imageList[1]" :src="editemegs.imageList[1].path" >
	               <i class="el-icon-edit" @click="editaddress('eidturl2')"></i> -->
	            <el-upload
	            
	              class="avatar-uploader upload"
	              action="api/common/upload/image.do"
	              :show-file-list="false"
	              :on-success="handleAvatarScucess6"
	              :before-upload="beforeAvatarUpload6">
	              <img v-if="imageUrl6" :src="imageUrl6" class="avatar">
	              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	            </el-upload>
	               </div><!-- <div  class="title"><h4>身份证反面　　　</h4><img class="eideimg" v-if="editemegs.imageList[1]" :src="editemegs.imageList[1].path" >
	               <i class="el-icon-edit" @click="editaddress('eidturl2')"></i>
	                           <el-upload
	                           v-show="uploadimg2"
	                             class="avatar-uploader upload"
	                             action="api/common/upload/image.do"
	                             :show-file-list="false"
	                             :on-success="handleAvatarScucess2"
	                             :before-upload="beforeAvatarUpload2">
	                             <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
	                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	                           </el-upload>
	               </div> <br> -->
	               <div  class="title"><h4>身份证反面　　　　</h4><!-- <img class="eideimg" v-if="editemegs.imageList[2]" :src="editemegs.imageList[2].path" >
	               <i class="el-icon-edit" @click="editaddress('eidturl3')"></i> -->
	            <el-upload
	              class="avatar-uploader upload"
	              action="api/common/upload/image.do"
	              :show-file-list="false"
	              :on-success="handleAvatarScucess7"
	              :before-upload="beforeAvatarUpload7">
	              <img v-if="imageUrl7" :src="imageUrl7" class="avatar">
	              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	            </el-upload>
	               </div><br>
	               <div  class="title"><h4>半身照　　　　　　</h4><!-- <img class="eideimg" v-if="editemegs.imageList[3]" :src="editemegs.imageList[3].path" >
	               <i class="el-icon-edit" @click="editaddress('eidturl4')"></i> -->
	            <el-upload
	              class="avatar-uploader upload"
	              action="api/common/upload/image.do"
	              :show-file-list="false"
	              :on-success="handleAvatarScucess8"
	              :before-upload="beforeAvatarUpload8">
	              <img v-if="imageUrl8" :src="imageUrl8" class="avatar">
	              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	            </el-upload>
	              
	               </div>
	            <div class="btn"> 
	             <button  @click="addsave" type="button" class="el-button el-button--default"><span>仅保存</span></button>
	            	
	             </div>
	        
	        </div>  
</template>
<script>
	 export default{
	 	data(){
	 		return{
	 			//详细信息获取接口
             apiUrl6:'api/filter/apply/editDetail.json',
             //获取第一级经营类型接口
             apiUrl4:'api/filter/apply/firstOperateDrop.json',
             //根据第一级选择，获取第二级经营类型接口
             apiUrl5:'api/filter/apply/secondOperateDrop.json',
             apiUrl3:'api/filter/apply/customerDrop.json',
              //客户编辑
             apiUrl8:'api/filter/apply/eidtSave.json',
             editemegs:[],
             shopId:'',
             seleaddress: false,
             state3:'',
             obj:{},
             stylemeg:'',
             stylemegs:'',
             valuestyle:'',
             valuestyles:'',
              shopaddres:{
              province:'',
              district:'',
              city:''
            },
            imageUrl5:'',
            imageUrl6:'',
            imageUrl7:'',
            imageUrl8:'',
	 		}
	 	},
	 	 created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
	 	methods:{
	 		aaa:function(){
	 			console.log(this.$route.query)
	 		},
	 		formatsort:function(row){
        		return row==1?'普通用户':row==2?'臻e盾用户':'';
        	},
        	format(t) {
        	//shijianchuo是整数，否则要parseInt转换
        	var time = new Date(t);
        	var y = time.getFullYear();
        	var m = time.getMonth() + 1;
        	var d = time.getDate();
        	var h = time.getHours();
        	var mm = time.getMinutes();
        	var s = time.getSeconds();
        	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
        	
    		},
    		formatstatus:function(row){
        		return row==-1?'黑名单':row==0?'审核驳回':row==1?'未审核':row==2?'审核通过':row==3?'进件中':row==4?'进件完成':row==5?'未绑定支付通道':row==6?'已绑定支付通道':'仅保存';
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
          
        },
        handleAvatarScucess5(res, file) {
            var vm=this;
            vm.imageUrl5 = URL.createObjectURL(file.raw);
            vm.imageUrl5 = file.response.url;
            console.log(555555)
          },
          handleAvatarScucess6(res, file) {
             var vm=this;
            vm.imageUrl6 = URL.createObjectURL(file.raw);
            vm.imageUrl6 = file.response.url;
          },handleAvatarScucess7(res, file) {
            var vm=this;
            vm.imageUrl7 = URL.createObjectURL(file.raw);
            vm.imageUrl7 = file.response.url;
          },
          handleAvatarScucess8(res, file) {
            var vm=this;
            vm.imageUrl8 = URL.createObjectURL(file.raw);
            vm.imageUrl8 = file.response.url;
          },
          beforeAvatarUpload5(file) {

          },beforeAvatarUpload6(file) {

          },beforeAvatarUpload7(file) {

          },beforeAvatarUpload8(file) {
          },
        editaddress:function(cur){
              var vm=this
              if(cur=='addaddress'){
                if(vm.seleaddress){
                  vm.seleaddress=false
                }else{
                  vm.seleaddress=true
                }
              }if(cur=='eidturl1'){
                if(vm.uploadimg1){
                  vm.uploadimg1=false
                }else{
                  vm.uploadimg1=true
                }
              }if(cur=='eidturl2'){
                if(vm.uploadimg2){
                  vm.uploadimg2=false
                }else{
                  vm.uploadimg2=true
                }
              }if(cur=='eidturl3'){
                if(vm.uploadimg3){
                  vm.uploadimg3=false
                }else{
                  vm.uploadimg3=true
                }
              }if(cur=='eidturl4'){
                if(vm.uploadimg4){
                  vm.uploadimg4=false
                }else{
                  vm.uploadimg4=true
                }
              }
            },
        rbackvalue:function(){
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
            },//编辑保存
            addsave:function(){
              var vm=this;
              var imgpath=(vm.imageUrl5!==''?'1|'+vm.imageUrl5+',':'')+(vm.imageUrl6!==''?'2|'+vm.imageUrl6+',':'')+(vm.imageUrl7!==''?'3|'+vm.imageUrl7+',':'')+(vm.imageUrl8!==''?'4|'+vm.imageUrl8+',':'');
              var imgpath=imgpath.split('');
              imgpath.pop()
              var imgpath=imgpath.join('')
              var addsavecontent={
                  shopId:vm.shopId,
                  shopName:vm.editemegs.shopName.value,
                  province:vm.shopaddres.province,
                  city:vm.shopaddres.city,
                  area:vm.shopaddres.district,
                  address:vm.editemegs.address.value,
                  servTel:vm.state3,
                  linkName:vm.editemegs.linkName.value,
                  linkPhone:vm.editemegs.linkPhone.value,
                  cardNum:vm.editemegs.cardNum.value,
                  imagePaths:imgpath,
                  operateTypeId:vm.valuestyles,
                  openBank:vm.editemegs.openBank.value,
                  bankCard:vm.editemegs.bankCard.value

              };
              vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$http.post(vm.apiUrl8,addsavecontent,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                             vm.$router.push('/CustomerApplication')
                        }else{
                            alert(response.data.error)
                        }
                    })
                  
                    }).catch(() => {
                      
                    });
             
            },
        	getCustomer:function(){
	 			var vm=this
	 			vm.shopId=this.$route.query.shopId
	 			var index=this.$route.query.index;
                var shopId={
                    shopId:vm.shopId
                };
                vm.$http.post(vm.apiUrl6,shopId,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){

                        vm.editemegs=response.data.obj
                        if(vm.editemegs.imageList.length==0){
                          vm.imageUrl5=''
                          vm.imageUrl6=''
                          vm.imageUrl7=''
                          vm.imageUrl8=''
                        }if(vm.editemegs.imageList.length==1){
                          vm.imageUrl5=vm.editemegs.imageList[0].path
                          vm.imageUrl6=''
                          vm.imageUrl7=''
                          vm.imageUrl8=''

                        }if(vm.editemegs.imageList.length==2){
                          vm.imageUrl5=vm.editemegs.imageList[0].path
                          vm.imageUrl6=vm.editemegs.imageList[1].path
                          vm.imageUrl7=''
                          vm.imageUrl8=''
                        }if(vm.editemegs.imageList.length==3){
                          vm.imageUrl5=vm.editemegs.imageList[0].path
                          vm.imageUrl6=vm.editemegs.imageList[1].path
                          vm.imageUrl7=vm.editemegs.imageList[2].path
                          vm.imageUrl8=''
                        }if(vm.editemegs.imageList.length==4){
                          vm.imageUrl5=vm.editemegs.imageList[0].path
                          vm.imageUrl6=vm.editemegs.imageList[1].path
                          vm.imageUrl7=vm.editemegs.imageList[2].path
                          vm.imageUrl8=vm.editemegs.imageList[3].path

                        }
                        console.log(111)
                        console.log(vm.editemegs)
                        console.log(111)
                        
                        vm.state3=vm.editemegs.servTel.value
                        vm.valuestyles=vm.editemegs.operateTypeId.value
                        vm.valuestyle=vm.editemegs.type.value
                        //请求选择类型下拉列表
                        vm.$http.post(vm.apiUrl4,{emulateJSON:true})
                        .then((response) => {
                            if(response.data.code===0){
                                vm.stylemeg=response.data.list
                                console.log(vm.stylemeg)
                            }else{
                                console.log(error)
                            }
                        })
                      //请求第二个下拉列表
                        var type={
                          type:vm.valuestyle
                         }
                         vm.$http.post(vm.apiUrl5,type,{emulateJSON:true})
                          .then((response) => {
                              if(response.data.code===0){
                                  vm.stylemegs=response.data.list
                                  
                        }else{
                            console.log(error)
                        }
                    })
                          if(!vm.editemegs.shopName.errorId==0){
                             vm.checked1=true
                             vm.places1=true
                          }if(!vm.editemegs.linkName.errorId==0){
                             vm.checked3=true
                             vm.places3=true
                          }if(!vm.editemegs.cardNum.errorId==0){
                             vm.checked4=true
                             vm.places4=true
                          }if(!vm.editemegs.linkPhone.errorId==0){
                             vm.checked5=true
                             vm.places5=true
                          }if(!vm.editemegs.linkName.errorId==0){
                             vm.checked6=true
                             vm.places6=true
                          }if(!vm.editemegs.bankCard.errorId==0){
                             vm.checked7=true
                             vm.places7=true
                          }if(!vm.editemegs.cardNum.errorId==0){
                             vm.checked8=true
                             vm.places8=true
                          }if(!vm.editemegs.address.errorId==0){
                             vm.checked2=true
                             vm.places2=true
                          } 

                      }else{
                        console('数据请求失败')
                      }
                    })
	 		}
	 		
              
	 	}
	 }
</script>