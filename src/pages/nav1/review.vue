<template>

		  <div  style="margin-left:20px;">
		            <h1>申请信息</h1>
		            <div class="title"><h4 style="display:inline-block">申请人类型　　　　</h4><span> {{formatsort(editemegs.sort.value)}}</span></div>
    	          <div class="title"><h4 style="display:inline-block">收银台　　　　　　</h4><span>民生银行收银台</span></div>
    	          <div class="title"><h4 style="display:inline-block">申请时间　　　　　</h4><span v-if="editemegs.created">{{format(editemegs.created.value)}}</span></div>
    	          <div class="title"><h4 style="display:inline-block">申请状态　　　　　</h4><span v-if="editemegs.status">{{formatstatus(editemegs.status.value)}}</span></div>
		             
		           <h1>店铺信息</h1>
		             <div class="title"><h4>店铺名称　　　</h4><span v-if="editemegs.shopName">{{editemegs.shopName.value}}　　</span>　<el-checkbox v-model="checked1" @change="checkeds1('shopName')">未通过　</el-checkbox><input v-if="editemegs.shopName" v-model="editemegs.shopName.common" type="text" placeholder="备注" name="" v-show="places1"></div>
		             <div class="title" style="position: relative;overflow:hidden"><h4>店铺地址　　　</h4><div ><span v-if="editemegs.province">{{editemegs.province.value}}　　</span><span v-if="editemegs.city">{{editemegs.city.value}}　　</span><span v-if="editemegs.area">{{editemegs.area.value}}　　</span></div>
		              <div style="position: absolute;top:0px;left: 350px;" ><el-checkbox v-model="checked2" @change="checkeds2('address')">未通过　</el-checkbox><input v-if="editemegs.address"v-model="editemegs.address.common" type="text" placeholder="备注" name="" v-show="places2"></div>
		             <br><span style="margin-left:100px;" v-if="editemegs.address">{{editemegs.address.value}}</span></div>
		             <div class="title"><h4>法人姓名　　　</h4><span v-if="editemegs.linkName">{{editemegs.linkName.value}}　　</span><el-checkbox v-model="checked3" @change="checkeds3('linkName')">未通过　</el-checkbox><input v-if="editemegs.linkName"v-model="editemegs.linkName.common" type="text" placeholder="备注" name="" v-show="places3"></div>
		            <div class="title"><h4>身份证号　　　</h4><span v-if="editemegs.cardNum">{{editemegs.cardNum.value}}　　</span><el-checkbox v-model="checked4"  @change="checkeds4('cardNum')">未通过　</el-checkbox><input v-if="editemegs.cardNum"v-model="editemegs.cardNum.common"type="text" placeholder="备注" name="" v-show="places4"></div>
		            <div class="title"><h4>手机号码　　　</h4><span v-if="editemegs.linkPhone">{{editemegs.linkPhone.value}}　　</span><el-checkbox v-model="checked5" @change="checkeds5('linkPhone')">未通过　</el-checkbox><input v-if="editemegs.linkPhone"v-model="editemegs.linkPhone.common"type="text" placeholder="备注" name="" v-show="places5" ></div>
		           
		            <div class="title"><h4>开户行　　　　</h4><span v-if="editemegs.openBank">{{editemegs.openBank.value}}　　</span><el-checkbox v-model="checked7" @change="checkeds7('openBank')">未通过　</el-checkbox><input v-if="editemegs.openBank"v-model="editemegs.openBank.common"type="text" placeholder="备注" name="" v-show="places7"></div>
		            <div class="title"><h4>卡号　　　　　</h4><span v-if="editemegs.bankCard">{{editemegs.bankCard.value}}　　</span><el-checkbox v-model="checked8" @change="checkeds8('bankCard')">未通过　</el-checkbox><input v-if="editemegs.bankCard"v-model="editemegs.bankCard.common"type="text" placeholder="备注" name="" v-show="places8"></div>
		             <div  class="title"><h4>营业执照　　　　</h4><img class="eideimg" v-if="img1" :src="img1" >
		               <el-checkbox v-model="checked9" @change="checkeds9('imageId')">未通过　</el-checkbox><input v-if="error1||places9"v-model="error1" type="text" placeholder="备注" name="" >
		             </div><br>
		             <div  class="title"><h4>身份证正面　　　</h4><img class="eideimg" v-if="img2" :src="img2" >
		              <el-checkbox v-model="checked10" @change="checkeds10('imageId')">未通过　</el-checkbox><input v-model="error2" type="text" placeholder="备注" name="" v-if="error2||places10">
		             		             </div><br>
		            <div  class="title"><h4>身份证反面　　　</h4><img class="eideimg" v-if="img3" :src="img3" >
		               <el-checkbox v-model="checked11" @change="checkeds11('imageId')">未通过　</el-checkbox><input  v-model="error3" type="text" placeholder="备注" name="" v-show="places11||error3">
		             </div><br>
		             <div  class="title"><h4>半身照　　　　　</h4><img class="eideimg" v-if="img4" :src="img4" >
		               <el-checkbox v-model="checked12" @change="checkeds12('imageId')">未通过　</el-checkbox><input v-model="error4" type="text" placeholder="备注" name="" v-show="places12||error4">
		             </div>
		             <div class="btn"> 
		             <button  @click="blacklist" type="button" class="el-button el-button--default"><span>加入黑名单</span></button>
		             <button  @click="addsubmit" type="button" class="el-button el-button--default"><span>完成审核</span></button>
		             </div>
		         </div>  

</template>
<script>
	export default{
		data(){
			return{
					//详细信息获取接口
             apiUrl6:'api/filter/apply/editDetail.json',
             //客户审核
             apiUrl7:'api/filter/apply/check.json',
             editemegs:[],
             checked1: false,
             checked2: false,
             checked3: false,
             checked4: false,
             checked5: false,
             checked7: false,
             checked8: false,
             checked9: false,
             checked10: false,
             checked11: false,
             checked12: false,
             places1: false,
             places2: false,
             places3: false,
             places4: false,
             places5: false,
             places7: false,
             places8: false,
             places9: false,
             places10: false,
             places11: false,
             places12: false,
             levalue1:'',
             levalue2:'',
             levalue3:'',
             levalue4:'',
             levalue5:'',
             levalue7:'',
             levalue8:'',
             levalue9:'',
             levalue10:'',
             levalue11:'',
             levalue12:'',
             img1:'',
             img2:'',
             img3:'',
             img4:'',
             error1:'',
             error2:'',
             error3:'',
             error4:'',
             status:'',
             addressjinjian:{},
			}
		},
		created:function(){
			this.getcustomer()
		},
		methods:{
			formatsort:function(row){
        		return row==1?'普通用户':row==2?'臻e盾用户':'';
        	},
        	 blacklist:function(){
              var vm=this;
                if(vm.checked9==false &&vm.checked10==false &&vm.checked11==false&& vm.checked12==false){
                  var erroeinfo8='';
                  var erroeinfo9='';
                  var erroeinfo10='';
                  var erroeinfo11='';
               }if(vm.checked9==true&&vm.error1==undefined){
               vm.error1=''
               }if(vm.checked10==true&&vm.error2==undefined){
                vm.error2=''
               }if(vm.checked11==true&&vm.error3==undefined){
                vm.error3=''
               }if(vm.checked12==true&&vm.error4==undefined){
                vm.error4=''
               }
                  var erroeinfo8=(vm.checked9==true)?'{"field":'+'"'+vm.levalue9+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[0].imageId+'"'+','+'"common":'+'"'+vm.error1+'"'+'},':''
                
                  
                  var erroeinfo9=(vm.checked10==true)?'{"field":'+'"'+vm.levalue10+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[1].imageId+'"'+','+'"common":'+'"'+vm.error2+'"'+'},':''
                
               
                  var erroeinfo10=(vm.checked11==true)?'{"field":'+'"'+vm.levalue11+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[2].imageId+'"'+','+'"common":'+'"'+vm.error3+'"'+'},':''
         
              
                  var erroeinfo11=(vm.checked12==true)?'{"field":'+'"'+vm.levalue12+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[3].imageId+'"'+','+'"common":'+'"'+vm.error4+'"'+'},':''
               if(vm.checked1==true&&vm.editemegs.shopName.common==null){
                  vm.editemegs.shopName.common=''
                 }if(vm.checked2==true&&vm.editemegs.address.common==null){
                  vm.editemegs.address.common=''
                 }if(vm.checked3==true&&vm.editemegs.linkName.common==null){
                  vm.editemegs.linkName.common=''
                 }if(vm.checked4==true&&vm.editemegs.cardNum.common==null){
                  vm.editemegs.cardNum.common=''
                 }if(vm.checked5==true&&vm.editemegs.linkPhone.common==null){
                  vm.editemegs.linkPhone.common=''
                 }if(vm.checked7==true&&vm.editemegs.openBank.common==null){
                  vm.editemegs.openBank.common=''
                 }if(vm.checked8==true&&vm.editemegs.bankCard.common==null){
                  vm.editemegs.bankCard.common=''
                 }
              var erroeinfo1=(vm.checked1==true)?'{"field":'+'"'+vm.levalue1+'"'+','+'"common":'+'"'+vm.editemegs.shopName.common+'"'+'},':''
              var erroeinfo2=(vm.checked2==true)?'{"field":'+'"'+vm.levalue2+'"'+','+'"common":'+'"'+vm.editemegs.address.common+'"'+'},':''
              var erroeinfo3=(vm.checked3==true)?'{"field":'+'"'+vm.levalue3+'"'+','+'"common":'+'"'+vm.editemegs.linkName.common+'"'+'},':''
              var erroeinfo4=(vm.checked4==true)?'{"field":'+'"'+vm.levalue4+'"'+','+'"common":'+'"'+vm.editemegs.cardNum.common+'"'+'},':''
              var erroeinfo5=(vm.checked5==true)?'{"field":'+'"'+vm.levalue5+'"'+','+'"common":'+'"'+vm.editemegs.linkPhone.common+'"'+'},':''
              var erroeinfo6=(vm.checked7==true)?'{"field":'+'"'+vm.levalue7+'"'+','+'"common":'+'"'+vm.editemegs.openBank.common+'"'+'},':''
              var erroeinfo7=(vm.checked8==true)?'{"field":'+'"'+vm.levalue8+'"'+','+'"common":'+'"'+vm.editemegs.bankCard.common+'"'+'},':''
               var allmegs={
                errorInfo:'['+erroeinfo1+erroeinfo2+erroeinfo3+erroeinfo4+erroeinfo5+erroeinfo6+erroeinfo7+erroeinfo8+erroeinfo9+erroeinfo10+erroeinfo11+']'}
               
              var a=allmegs.errorInfo
               if(a=='[]'){
               var a='';
              }else{
                var a=a.split('}')
              a.pop()
               a.push(']')
              var a=a.join('}');

              }
             /* var a=a.split('}')
              a.pop()
               a.push(']')
              var a=a.join('}');*/
              var kkk={
                errorInfo:a,
                status:-1,
                shopId:vm.shopId
              }
             vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       vm.$http.post(vm.apiUrl7,kkk,{emulateJSON:true})
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
            addsubmit:function(){
               var vm=this;
                if(vm.checked9==false &&vm.checked10==false &&vm.checked11==false&& vm.checked12==false){
                  var erroeinfo8='';
                  var erroeinfo9='';
                  var erroeinfo10='';
                  var erroeinfo11='';
               }if(vm.checked9==true&&vm.error1==undefined){
               vm.error1=''
               }if(vm.checked10==true&&vm.error2==undefined){
                vm.error2=''
               }if(vm.checked11==true&&vm.error3==undefined){
                vm.error3=''
               }if(vm.checked12==true&&vm.error4==undefined){
                vm.error4=''
               }
                  var erroeinfo8=(vm.checked9==true)?'{"field":'+'"'+vm.levalue9+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[0].imageId+'"'+','+'"common":'+'"'+vm.error1+'"'+'},':''
                
                  
                  var erroeinfo9=(vm.checked10==true)?'{"field":'+'"'+vm.levalue10+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[1].imageId+'"'+','+'"common":'+'"'+vm.error2+'"'+'},':''
                
               
                  var erroeinfo10=(vm.checked11==true)?'{"field":'+'"'+vm.levalue11+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[2].imageId+'"'+','+'"common":'+'"'+vm.error3+'"'+'},':''
         
              
                  var erroeinfo11=(vm.checked12==true)?'{"field":'+'"'+vm.levalue12+'"'+','+'"imageId":'+'"'+vm.editemegs.imageList[3].imageId+'"'+','+'"common":'+'"'+vm.error4+'"'+'},':''
               if(vm.checked1==true&&vm.editemegs.shopName.common==null){
                  vm.editemegs.shopName.common=''
                 }if(vm.checked2==true&&vm.editemegs.address.common==null){
                  vm.editemegs.address.common=''
                 }if(vm.checked3==true&&vm.editemegs.linkName.common==null){
                  vm.editemegs.linkName.common=''
                 }if(vm.checked4==true&&vm.editemegs.cardNum.common==null){
                  vm.editemegs.cardNum.common=''
                 }if(vm.checked5==true&&vm.editemegs.linkPhone.common==null){
                  vm.editemegs.linkPhone.common=''
                 }if(vm.checked7==true&&vm.editemegs.openBank.common==null){
                  vm.editemegs.openBank.common=''
                 }if(vm.checked8==true&&vm.editemegs.bankCard.common==null){
                  vm.editemegs.bankCard.common=''
                 }
              var erroeinfo1=(vm.checked1==true)?'{"field":'+'"'+vm.levalue1+'"'+','+'"common":'+'"'+vm.editemegs.shopName.common+'"'+'},':''
              var erroeinfo2=(vm.checked2==true)?'{"field":'+'"'+vm.levalue2+'"'+','+'"common":'+'"'+vm.editemegs.address.common+'"'+'},':''
              var erroeinfo3=(vm.checked3==true)?'{"field":'+'"'+vm.levalue3+'"'+','+'"common":'+'"'+vm.editemegs.linkName.common+'"'+'},':''
              var erroeinfo4=(vm.checked4==true)?'{"field":'+'"'+vm.levalue4+'"'+','+'"common":'+'"'+vm.editemegs.cardNum.common+'"'+'},':''
              var erroeinfo5=(vm.checked5==true)?'{"field":'+'"'+vm.levalue5+'"'+','+'"common":'+'"'+vm.editemegs.linkPhone.common+'"'+'},':''
              var erroeinfo6=(vm.checked7==true)?'{"field":'+'"'+vm.levalue7+'"'+','+'"common":'+'"'+vm.editemegs.openBank.common+'"'+'},':''
              var erroeinfo7=(vm.checked8==true)?'{"field":'+'"'+vm.levalue8+'"'+','+'"common":'+'"'+vm.editemegs.bankCard.common+'"'+'},':''
               var allmegs={
                errorInfo:'['+erroeinfo1+erroeinfo2+erroeinfo3+erroeinfo4+erroeinfo5+erroeinfo6+erroeinfo7+erroeinfo8+erroeinfo9+erroeinfo10+erroeinfo11+']'}
               
              var a=allmegs.errorInfo;
              console.log(11)
              console.log(erroeinfo8)
              console.log(11)
              console.log(allmegs)
              if(a=='[]'){
               var a='';
              }else{
                var a=a.split('}')
                a.pop()
                a.push(']')
              var a=a.join('}');

              }
              
              var kkk={
                errorInfo:a,
                shopId:vm.shopId
              }
              if(vm.status<2){
                 vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        vm.$http.post(vm.apiUrl7,kkk,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        var aaa=vm.addressjinjian
                        if(vm.checked1||vm.checked2||vm.checked3||vm.checked4||vm.checked4||vm.checked6||vm.checked7||vm.checked8||vm.checked9||vm.checked10||vm.checked11||vm.checked12){
                          vm.$router.push('/CustomerApplication')
                        }else{
                          vm.$router.push('/CustomerApplication/jinjian?province='+vm.editemegs.province.value+'&city='+vm.editemegs.city.value+'&area='+vm.editemegs.area.value)
                        }
                       

                      }else{
                        alert(response.data.error)
                      }
                    })
                  
                    }).catch(() => {
                      
                    });
              	
                }else{
                	alert('以及完成审核，无需审核')
                }
             
              
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
        	checkeds1:function(cur){
              var vm=this;
              if(vm.checked1){
                vm.places1=true
                vm.levalue1=cur  
              }else{
               vm.places1=false
              }},
              checkeds2:function(cur){
              var vm=this;
              if(vm.checked2){
                vm.places2=true
                vm.levalue2=cur
              }else{
               vm.places2=false
              }},
              checkeds3:function(cur){
              var vm=this;
              if(vm.checked3){
                vm.places3=true
                vm.levalue3=cur
              }else{
               vm.places3=false
              }},
              checkeds4:function(cur){
              var vm=this;
              if(vm.checked4){
                vm.places4=true
                vm.levalue4=cur
              }else{
               vm.places4=false
              }},
              checkeds5:function(cur){
              var vm=this;
              if(vm.checked5){
                vm.places5=true
                vm.levalue5=cur
              }else{
               vm.places5=false
              }},
              checkeds7:function(cur){
              var vm=this;
              if(vm.checked7){
                vm.places7=true
                vm.levalue7=cur
              }else{
               vm.places7=false
              }},
              checkeds8:function(cur){
              var vm=this;
              if(vm.checked8){
                vm.places8=true
                vm.levalue8=cur 
              }else{
               vm.places8=false
              }},
              checkeds9:function(cur){
              var vm=this;
              if(vm.checked9){
                vm.places9=true
                vm.levalue9=cur 
              }else{
               vm.places9=false
              }},checkeds10:function(cur){
              var vm=this;
              if(vm.checked10){
                vm.places10=true
                vm.levalue10=cur 
              }else{
               vm.places10=false
              }},checkeds11:function(cur){
              var vm=this;
              if(vm.checked11){
                vm.places11=true
                vm.levalue11=cur 
              }else{
               vm.places11=false
              }},checkeds12:function(cur){
              var vm=this;
              if(vm.checked12){
                vm.places12=true
                vm.levalue12=cur 
              }else{
               vm.places12=false
              }},
			getcustomer:function(){
				var vm=this
	 			vm.shopId=this.$route.query.shopId
	 			var index=this.$route.query.index;
	 			vm.status=this.$route.query.status;
	 			console.log(vm.status)
                var shopId={
                    shopId:vm.shopId
                };
				vm.$http.post(vm.apiUrl6,shopId,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        vm.editemegs=response.data.obj
                        console.log(11)
                        console.log(vm.editemegs)
                        console.log(11)
                        var reviewval={
                          province:vm.editemegs.province.value,
                          city:vm.editemegs.city.value,
                          area:vm.editemegs.area.value
                        };
                        vm.addressjinjian=reviewval
                        console.log(vm.addressjinjian)
                        var Leng=vm.editemegs.imageList.length
                          if(vm.editemegs.shopName.errorId){
                            vm.checked1=true,
                            vm.places1= true
                            vm.levalue1="shopName"
                          }if(vm.editemegs.address.errorId){
                            vm.checked2=true,
                             vm.places2= true
                             vm.levalue2="address"
                          }if(vm.editemegs.linkName.errorId){
                            vm.checked3=true,
                            vm.places3= true
                            vm.levalue3="linkName"
                          }if(vm.editemegs.cardNum.errorId){
                            vm.checked4=true
                            vm.places4= true
                            vm.levalue4="cardNum"
                          }if(vm.editemegs.linkPhone.errorId){
                            vm.checked5=true
                             vm.places5= false
                             vm.levalue4="linkPhone"
                          }if(vm.editemegs.openBank.errorId){
                            vm.checked7=true
                             vm.places7= true
                             vm.levalue7="openBank"
                          }if(vm.editemegs.bankCard.errorId){
                            vm.checked8=true
                            vm.places8= true
                            vm.levalue8="bankCard"
                          }
                        for(let i=0;i<Leng;i++){

                          if(vm.editemegs.imageList[i].errorId){
                            if(i==0){
                              vm.checked9=true
                              vm.levalue9="imageId"
                            }if(i==1){
                              vm.checked10=true
                              vm.levalue10="imageId"
                            }if(i==2){
                              vm.checked11=true
                              vm.levalue11="imageId"
                            }if(i==3){
                              vm.checked12=true
                              vm.levalue12="imageId"
                            }
                          }
                        }
                        if(Leng==0){
                        	vm.img1=''
                        	vm.img2=''
                        	vm.img3=''
                        	vm.img4=''
                        }
                        if(Leng==1){
                          if(vm.editemegs.imageList[0].errorId){
                            vm.error1=vm.editemegs.imageList[0].common
                            vm.img1=vm.editemegs.imageList[0].path
                            vm.img2=''
                            vm.img3=''
                            vm.img4=''
                          }
                        	
                        }if(Leng==2){
                          if(vm.editemegs.imageList[0].errorId){
                            vm.error1=vm.editemegs.imageList[0].common
                            vm.img1=vm.editemegs.imageList[0].path
                            vm.img2=''
                            vm.img3=''
                            vm.img4=''
                          }if(vm.editemegs.imageList[1].errorId){

                          }
                        	vm.error1=vm.editemegs.imageList[0].common
                        	vm.error2=vm.editemegs.imageList[1].common
                        	vm.img1=vm.editemegs.imageList[0].path
                        	vm.img2=vm.editemegs.imageList[1].path
                        	vm.img3=''
                        	vm.img4=''
                        }if(Leng==3){
                        	vm.error1=vm.editemegs.imageList[0].common
                        	vm.error2=vm.editemegs.imageList[1].common
                        	vm.error3=vm.editemegs.imageList[2].common
                        	vm.img1=vm.editemegs.imageList[0].path
                        	vm.img2=vm.editemegs.imageList[1].path
                        	vm.img3=vm.editemegs.imageList[2].path
                        	vm.img4=''
                        }if(Leng==4){
                        	vm.error1=vm.editemegs.imageList[0].common
                        	vm.error2=vm.editemegs.imageList[1].common
                        	vm.error3=vm.editemegs.imageList[2].common
                        	vm.error4=vm.editemegs.imageList[3].common
                        	vm.img1=vm.editemegs.imageList[0].path
                        	vm.img2=vm.editemegs.imageList[1].path
                        	vm.img3=vm.editemegs.imageList[2].path
                        	vm.img4=vm.editemegs.imageList[3].path
                        }
                        
                        /*vm.state3=vm.editemegs.servTel.value
                        vm.valuestyles=vm.editemegs.operateTypeId.value
                        vm.valuestyle=vm.editemegs.type.value*/
                      }else{
                        console.log(error)
                      }
                    vm.reviewpage=true
                  })
			}
		}
	}
</script>