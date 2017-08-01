<template>
	<div v-loading="loading" style="margin-left: 20px;">
        <div style="position: relative"><h4>支付通道　　　　</h4><el-checkbox v-model="checked3" @change="remark4"v-bind:disabled="disabled1">支付宝</el-checkbox> <div style="position:absolute;left: 210px;top:3px;"><h4>商户类别　　　</h4><span v-if="disableval1">{{disableval1.firstLevel}} - </span><span v-if="disableval1">{{disableval1.secondLevel}} - </span><span>{{disableval1.thirdLevel}}　</span><i class="el-icon-edit" @click="editdata1" v-if="disableval1"></i> <el-select v-show="zfb"v-model="value" class="select" @change="rbackvalue"placeholder="请选择">
            <el-option
              v-for="item in zfbDic"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select><el-select v-show="zfb"v-model="value1" class="select" @change="rbackvalue1"placeholder="请选择">
            <el-option
              v-for="item in zfbDic1"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select><el-select v-show="zfb"v-model="value2" class="select" placeholder="请选择">
            <el-option
              v-for="item in zfbDic2"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select></div><br>
<br>
<br>
<br>
          <el-checkbox v-model="checked4" @change="remark5" v-bind:disabled="disabled2" style="margin: 28px 0 0 112px;">微信支付</el-checkbox> <div style=" position:absolute;left: 210px;top:93px;"><h4>商户类别　　　</h4><span v-if="disableval2">{{disableval2.firstLevel}} - </span><span v-if="disableval2">{{disableval2.secondLevel}} - </span><span>{{disableval2.thirdLevel}}</span><i class="el-icon-edit" @click="editdata2" v-if="disableval2"></i><el-select v-show="wx"v-model="value3" class="select" @change="rbackvalue2"placeholder="请选择">
            <el-option
              v-for="item in wxDic"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select><el-select v-show="wx"v-model="value4" class="select" @change="rbackvalue3" placeholder="请选择">
            <el-option
              v-for="item in wxDic1"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select><el-select v-show="wx"v-model="value5" class="select" placeholder="请选择">
            <el-option
              v-for="item in wxDic2"
              
              :value="item.key"
              :label="item.value">
            </el-option>
          </el-select></div><br>
  <br>
          <el-checkbox v-model="checked5" @change="remark6"v-bind:disabled="disabled3" style="margin: 48px 0 0 112px;">QQ钱包</el-checkbox> <div style=" position:absolute;left: 210px;top:178px;" ><h4>商户类别　　　</h4><span v-if="disableval3">{{disableval3.firstLevel}} - </span><span v-if="disableval3">{{disableval3.secondLevel}} - </span><span v-if="disableval3">{{disableval3.thirdLevel}}</span><i class="el-icon-edit" @click="editdata3"v-if="disableval3"></i><el-select v-show="qq"v-model="value6" class="select" @change="rbackvalue4"placeholder="请选择">
            <el-option
              v-for="item in qqDic"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select><el-select v-show="qq"v-model="value7" class="select" @change="rbackvalue5"placeholder="请选择">
            <el-option
              v-for="item in qqDic1"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select><el-select v-show="qq"v-model="value8" class="select" placeholder="请选择">
            <el-option
              v-for="item in qqDic2"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select></div><br>
        <br>
        <br><br>
         <div class="title" ><h4>日限额　　　　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="asd"></el-input>元</div>
         <div class="title" ><h4>月限额　　　　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="asdf"></el-input>元</div>
         <div class="title" ><h4>固定比例费率　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="modifies.fixFeeRate"></el-input>%</div>
         <div class="title" ><h4>开户行　　　　　　</h4>{{openBank}}</div><br>
         <div class="title" ><h4>结算账号　　　　　</h4>{{bankCard}}</div><br>
         <div class="title" ><h4>开户人　　　　　　</h4>{{linkName}}</div>
         <div class="title"  style="position: relative"><h4>选择支行　　　　　</h4><el-select v-model="provinceval"  @change="secondadd"placeholder="请选择省"style="width:10%;margin-right:10px;"><el-option
              v-for="item in addpromeg"
              :label="item.province"
              :value="item.province">
            </el-option>
          </el-select><el-select v-model="cityval"  placeholder="请选择市"style="width:10%;margin-right:10px;"><el-option
              v-for="item in addpromegs"
              :label="item.city"
              :value="item.city">
            </el-option>
          </el-select><el-select v-model="valuees"  placeholder="请选择银行"style="width:10%;margin-right:10px;" @change="deleve"><el-option
              v-for="item in option"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select><br>

            <el-select v-model="pullbankval"  placeholder="请选择支行" @change="deleve1" style="margin:10px 0 0 125px;"><el-option
              v-for="item in addressmegs"
              
              :value="item.unionBankNo"
              :label="item.bankName">
            </el-option>
          </el-select>


            </div>
             <div class="title" ><h4>开户行号　　　　　</h4><el-input placeholder="请输入内容" style="width: 21%;" v-model="modifies.pbcBankId"></el-input></div>
             <div class="title" ><h4>账户类型　　　　　</h4><el-select v-model="values"  placeholder="请选择"><el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></div>
          </div>
          <div class="btn"> <button  @click="bindmodify" type="button" class="el-button el-button--default"><span>修改</span></button></div>
    </div>
</template>
<script>
	export default{
		data(){
			return{
				checked3:false,
                 checked4:false,
                 checked5:false,
                 loading:false,
                 valuees:'',
                 values:'',
                 cityval:'',
                 provinceval:'',
                 zfbDic: [],
                 zfbDic1: [],
                 zfbDic2: [],
                 wxDic: [],
                 wxDic1: [],
                 wxDic2: [],
                 qqDic: [],
                 qqDic1: [],
                 qqDic2: [],
                 modifies: [],
                 addressmegs: [],
                 addpromeg:[],
                 addpromegs:[],
                 disableval1: '',
                 bankCard:'',
                 openBank:'',
                 linkName:'',
                 wx:false,
                 zfb:false,
                 qq:false,
                  value:'',
                  asd:'',
                  asdf:'',
                 value1:'',
                 value2:'',
                 value3:'',
                 value4:'',
                 value5:'',
                 value6:'',
                 value7:'',
                 value8:'',
                 qqindustryId:'',
                 wxindustryId:'',
                 zfbindustryId:'',
                 channelId1:'',
                 channelId2:'',
                 channelId3:'',
                 disable1:'',
                 disable2:'',
                 disable3:'',
                 disableval2: '',
                 disableval3: '',
                 pullbankval:'',
                  options: [{
                      value: '1',
                      label: '对私'
                    },{
                      value: '2',
                      label: '对公'
                    }],
                 //获取支付通道绑定详情
                 apiUrl9:'api/filter/customer/channelDetail.json',
                  //支付宝经营类型下拉
                 apiUrl2:'api/filter/customer/zfbDic.json',
                 //微信经营类型下拉框
		 		         apiUrl3:'api/filter/customer/wxDic.json',
                 //qq经营类型下拉框
                 apiUrl4:'api/filter/customer/qqDic.json',
                 //支行下拉
                 apiUrl6:'api/filter/customer/bankCodeDrop.json',
                 apiUrl8:'api/filter/customer/areaDrop.json',
                 apiUrl10:'api/filter/customer/editChannel.json',
                  option: [{
                      value: '上海浦东发展银行',
                      label: '上海浦东发展银行'
                    },{
                      value: '中信实业银行',
                      label: '中信实业银行'
                    },{
                      value: '中国光大银行',
                      label: '中国光大银行'
                    },{
                      value: '中国农业银行',
                      label: '中国农业银行'
                    },{
                      value: '中国工商银行',
                      label: '中国工商银行'
                    },{
                      value: '中国建设银行',
                      label: '中国建设银行'
                    },{
                      value: '中国民生银行',
                      label: '中国民生银行'
                    },{
                      value: '中国邮政储蓄银行',
                      label: '中国邮政储蓄银行'
                    },{
                      value: '中国银行',
                      label: '中国银行'
                    },{
                      value: '交通银行',
                      label: '交通银行'
                    },{
                      value: '其他银行',
                      label: '其他银行'
                    },{
                      value: '华夏银行',
                      label: '华夏银行'
                    },{
                      value: '平安银行',
                      label: '平安银行'
                    },{
                      value: '广发银行',
                      label: '广发银行'
                    },{
                      value: '招商银行',
                      label: '招商银行'
                    },{
                      value: '渤海银行',
                      label: '渤海银行'
                    },{
                      value: '福建兴业银行',
                      label: '福建兴业银行'
                    }]
              
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
				 vm.$http.post(vm.apiUrl8,{level:1},{emulateJSON:true})
          .then((response) => {
              if(response.data.code===0){
                  vm.addpromeg=response.data.list
                  console.log(response.data)
                  
              }else{
                  console.log(response.data.error)
              }
              
          }) 
				vm.openBank=vm.$route.query.openBank
				vm.bankCard=vm.$route.query.bankCard
				vm.linkName=vm.$route.query.linkName
				vm.shopId=vm.$route.query.shopId
				console.log(11)
				console.log(vm.$route.query.bankCard)
				console.log(11)
				 vm.$http.post(vm.apiUrl9,{shopId:vm.shopId},{emulateJSON:true})
                     .then((response) => {
                        if(response.data.code===0){
                            vm.modifies=response.data.obj
                            vm.values=vm.modifies.acctType
                            vm.asd=vm.modifies.dayLimit/100
                            vm.asdf=vm.modifies.monthLimit/100

                            console.log(111)
                            console.log(vm.modifies)
                            console.log(111)
                            if(vm.modifies.operates.length==0){
                              console.log(1)
                            }
                            for(var i=0;i<vm.modifies.operates.length;i++){

                                if(vm.modifies.operates[i].type&&vm.modifies.operates[i].type=='zfb'){
                                     vm.disable1=1
                                     vm.disableval1=vm.modifies.operates[i]
                                     vm.channelId1=vm.disableval1.channelId
                                     vm.zfbindustryId=vm.modifies.operates[i].industryId
                                 }if(vm.modifies.operates[i].type&&vm.modifies.operates[i].type=='wx'){
                                    vm.disable2=2
                                    vm.disableval2=vm.modifies.operates[i]
                                    vm.channelId2=vm.disableval2.channelId
                                    vm.wxindustryId=vm.modifies.operates[i].industryId
                                }if(vm.modifies.operates[i].type&&vm.modifies.operates[i].type=='qq'){
                                    vm.disable3=3
                                    vm.disableval3=vm.modifies.operates[i]
                                    vm.channelId3=vm.disableval3.channelId
                                    vm.qqindustryId=vm.modifies.operates[i].industryId
                                }
                            }
                            console.log(response.data.obj)
                        }else{
                            alert(response.data.error)
                        }
                
                    })
				
			},
			editdata1:function(){
                var vm=this;
                if(vm.zfb==false){
                    vm.zfb=true
                    vm.$http.post(vm.apiUrl2,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.zfbDic=response.data.list
                            console.log(response.data)
                            console.log(vm.pageSize)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.zfb=false
                    vm.zfbDic=[]
                }

            },editdata2:function(){
                var vm=this;
                if(vm.wx==false){
                    vm.wx=true
                    vm.$http.post(vm.apiUrl3,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.wxDic=response.data.list
                            console.log(response.data)
                            console.log(vm.pageSize)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.wx=false
                    vm.wxDic=[]
                }

            },editdata3:function(){
                var vm=this;
                if(vm.qq==false){
                    vm.qq=true
                     vm.$http.post(vm.apiUrl4,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.qqDic=response.data.list
                            console.log(response.data)
                            console.log(vm.pageSize)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.qq=false
                    vm.qqDi=[]
                }

            },remark4:function(){
                var vm=this;
                if(vm.checked3==true){
                    vm.zfb=true
                    vm.$http.post(vm.apiUrl2,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.zfbDic=response.data.list
                            console.log(response.data)
                            console.log(vm.pageSize)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.zfb=false
                    vm.zfbDic=[]
                }
            }, rbackvalue:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl2,{level:2,firstLevelCategory:vm.value},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.zfbDic1=response.data.list                           
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })

            },
            rbackvalue1:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl2,{level:3,firstLevelCategory:vm.value,secondLevelCategory:vm.value1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.zfbDic2=response.data.list 
                           console.log(vm.zfbDic2)     
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })

            },rbackvalue2:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl3,{level:2,merchantType:vm.value3},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.wxDic1=response.data.list                           
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })

            },rbackvalue3:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl3,{level:3,merchantType:vm.value3,tradeOutline:vm.value4},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            console.log(111)
                           vm.wxDic2=response.data.list 
                           console.log(vm.wxDic2)      
                           console.log(111)      
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })

            },rbackvalue4:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl4,{level:2,firstLevelIndustry:vm.value6},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.qqDic1=response.data.list                           
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })

            },rbackvalue5:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl4,{level:3,firstLevelIndustry:vm.value6,secondLevelIndustry:vm.value7},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.qqDic2=response.data.list    
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })

            },remark5:function(){
                var vm=this;
                if(vm.checked4==true){
                	console.log(10)
                    vm.wx=true
                    vm.$http.post(vm.apiUrl3,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.wxDic=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.wx=false
                    vm.wxDic=[]
                }
            },remark6:function(){
                var vm=this;
                if(vm.checked5==true){
                    vm.qq=true
                    vm.$http.post(vm.apiUrl4,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.qqDic=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.qq=false
                    vm.qqDic=[]
                }
            },
            deleve:function(){
                var vm=this;
                var addressmeg={
                    province:vm.provinceval,
                    city:vm.cityval,
                    bankType:vm.valuees
                };
                console.log(addressmeg)
                vm.$http.post(vm.apiUrl6,addressmeg,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.addressmegs=response.data.list
                            console.log(response.data)
                            console.log(vm.pageSize)
                           
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
            },deleve1:function(){
                var vm=this;
                vm.modifies.pbcBankId=vm.pullbankval
            },
            secondadd:function(){
                var vm=this;

                 vm.$http.post(vm.apiUrl8,{level:2,province:vm.provinceval},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.addpromegs=response.data.list
                            console.log(response.data)
                            console.log(vm.pageSize)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
            },
            //提交修改绑定
            bindmodify:function(){
              var vm=this;
              
              if(vm.value2==''){
                var eidval1='{"channelId":'+'"'+vm.channelId1+'"'+','+'"type":'+'"zfb",'+'"industryId":'+'"'+vm.zfbindustryId+'"'+'},'
              }else{
                var eidval1='{"channelId":'+'"'+vm.channelId1+'"'+','+'"type":'+'"zfb",'+'"industryId":'+'"'+vm.value2+'"'+'},'
              }
              if(vm.value5==''){
                var eidval2='{"channelId":'+'"'+vm.channelId2+'"'+','+'"type":'+'"wx",'+'"industryId":'+'"'+vm.wxindustryId+'"'+'},'
              }else{
                var eidval2='{"channelId":'+'"'+vm.channelId2+'"'+','+'"type":'+'"wx",'+'"industryId":'+'"'+vm.value5+'"'+'},'
              }
              if(vm.value8==''){
                var eidval3='{"channelId":'+'"'+vm.channelId3+'"'+','+'"type":'+'"qq",'+'"industryId":'+'"'+vm.qqindustryId+'"'+'},'
              }else{
                var eidval3='{"channelId":'+'"'+vm.channelId3+'"'+','+'"type":'+'"qq",'+'"industryId":'+'"'+vm.value8+'"'+'},'
              }
              var alleidval={
                operates:'['+eidval1+eidval2+eidval3+']'
              };
              var h=alleidval.operates;
              if(h=='[]'){
                var h=''
              }else{
                var h=h.split('}');
                h.pop()
                h.push(']')
                var h=h.join('}');
              }

              var eidtval={
                shopId:vm.shopId,
                dayLimit:vm.asd,
                monthLimit:vm.asdf,
                fixFeeRate:vm.modifies.fixFeeRate,
                account:vm.bankCard,
                pbcBankId:vm.modifies.pbcBankId,
                acctName:vm.linkName,
                acctType:vm.values,
                operates:h
              }; 

               vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      vm.loading=true
                        vm.$http.post(vm.apiUrl10,eidtval,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        vm.loading=false
                       vm.$router.push('/CustomerManagement')
                      }else{
                        vm.loading=false
                        alert(response.data.error)
                      }
                        
                    })
                  
                    }).catch(() => {
                      
                    });
              
              
            },
       
			
		},
		computed:{
          disabled1:function(){
            var vm=this
           
            if(vm.disable1==1){
                vm.checked3=true
                return true
                }else{
                  return false
                  
                }
              
            
          },disabled2:function(){
            var vm=this
           
            if(vm.disable2==2){
                vm.checked4=true
                return true
                }else{
                  return false               
                }
              
            
          },disabled3:function(){
            var vm=this
           
            if(vm.disable3==3){
                vm.checked5=true
                return true
                }else{
                  return false
                  
                }
              
            
          }
        }
		
		
	}
</script>
