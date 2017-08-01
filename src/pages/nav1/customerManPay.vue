<template>
	 <div style="margin-left: 20px;">
       <div style="position: relative"><h4>支付通道　　　　</h4><el-checkbox v-model="checked" @change="remark1">支付宝</el-checkbox> <div class="titles"><h4>商户类别　　　</h4><el-select v-model="value" class="select" @change="rbackvalue"placeholder="请选择">
          <el-option
            v-for="item in zfbDic"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select><el-select v-model="value1" class="select" @change="rbackvalue1"placeholder="请选择">
          <el-option
            v-for="item in zfbDic1"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select><el-select v-model="value2" class="select" placeholder="请选择">
          <el-option
            v-for="item in zfbDic2"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select></div><br>
        
         <el-checkbox v-model="checked1" @change="remark2" style="margin: 30px 0 0 112px;">微信支付</el-checkbox> <div class="titles1"><h4>商户类别　　　</h4><el-select v-model="value3" class="select" @change="rbackvalue2"placeholder="请选择">
          <el-option
            v-for="item in wxDic"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select><el-select v-model="value4" class="select" @change="rbackvalue3" placeholder="请选择">
          <el-option
            v-for="item in wxDic1"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select><el-select v-model="value5" class="select" placeholder="请选择">
          <el-option
            v-for="item in wxDic2"
            
            :value="item.key"
            :label="item.value">
          </el-option>
        </el-select></div><br>
        <br>
        <el-checkbox v-model="checked2" @change="remark3" style="margin: 10px 0 0 112px;">QQ钱包</el-checkbox> <div class="titles2"><h4>商户类别　　　</h4><el-select v-model="value6" class="select" @change="rbackvalue4"placeholder="请选择">
          <el-option
            v-for="item in qqDic"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select><el-select v-model="value7" class="select" @change="rbackvalue5"placeholder="请选择">
          <el-option
            v-for="item in qqDic1"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select><el-select v-model="value8" class="select" placeholder="请选择">
          <el-option
            v-for="item in qqDic2"
            :label="item.key"
            :value="item.value">
          </el-option>
        </el-select></div><br>
      <br>
        <div class="title" ><h4>日限额　　　　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="limtday"></el-input>元</div>
       <div class="title" ><h4>月限额　　　　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="limtmoth"></el-input>元</div>
       <div class="title" ><h4>固定比例费率　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="ratio"></el-input>%</div>
       <div class="title" ><h4>开户行　　　　　　</h4>{{openBank}}</div><br>
       <div class="title" ><h4>结算账号　　　　　</h4>{{bankCard}}</div><br>
       <div class="title" ><h4>开户人　　　　　　</h4>{{linkName}}</div><br>
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
      
          <el-select v-model="pullbankval"  placeholder="请选择支行" @change="deleve" style="margin:10px 0 0 125px;"><el-option
            v-for="item in addressmegs"
            
            :value="item.unionBankNo"
            :label="item.bankName">
          </el-option>
        </el-select>
      
      
          </div>
           <div class="title" ><h4>开户行号　　　　　</h4><el-input placeholder="请输入内容" style="width: 21%;" v-model="pullbankval"></el-input></div>
           <div class="title" ><h4>账户类型　　　　　</h4><el-select v-model="values"  placeholder="请选择"><el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></div>
        </div>
        <div class="btn"> <button  @click="bind" type="button" class="el-button el-button--default"><span>绑定</span></button></div> 
    </div>
</template>
<script>
	export default{
		data(){
			return{
				//获取支付通道绑定详情
                 apiUrl9:'api/filter/customer/channelDetail.json',
                  apiUrl2:'api/filter/customer/zfbDic.json',
                 //微信经营类型下拉框
		 		  apiUrl3:'api/filter/customer/wxDic.json',
                 //qq经营类型下拉框
                 apiUrl4:'api/filter/customer/qqDic.json',
                 //支付通道绑定
                 apiUrl5:'api/filter/customer/payChannelBind.json',
                 apiUrl8:'api/filter/customer/areaDrop.json',
                 apiUrl6:'api/filter/customer/bankCodeDrop.json',
                 shopId:'',
                 disable1:'',
                 disable2:'',
                 disable3:'',
                 pullbankval:'',
                 values:'',
                 value:'',
                 value1:'',
                 value2:'',
                 value3:'',
                 value4:'',
                 value5:'',
                 value6:'',
                 value7:'',
                 value8:'',
                  addpromeg:[],
        		 addpromegs:[],
        		 addressmegs: [],
                 provinceval:'',
                 limtday:'',
                 limtmoth:'',
                 ratio:'',
                 openBank:'',
                 bankCard:'',
                 linkName:'',
                 shopId:'',
                 valuees:'',
                 cityval:'',
                  zfbDic: [],
                 zfbDic1: [],
                 zfbDic2: [],
                 wxDic: [],
                 wxDic1: [],
                 wxDic2: [],
                 qqDic: [],
                 qqDic1: [],
                 qqDic2: [],
                 checked:false,
                 checked1:false,
                 checked2:false,
                 options: [{
                      value: '1',
                      label: '对私'
                    },{
                      value: '2',
                      label: '对公'
                    }],
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
				vm.openBank=vm.$route.query.openBank
				vm.bankCard=vm.$route.query.bankCard
				vm.linkName=vm.$route.query.linkName
				vm.shopId=vm.$route.query.shopId
				console.log(1111)
				console.log(vm.$route.query.openBank)
				console.log(vm.$route.query.bankCard)
				console.log(1111)
				
				vm.$http.post(vm.apiUrl8,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.addpromeg=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    }) 
				
				
			},
			remark1:function(){
                var vm=this;
                if(vm.checked==true){
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
                    vm.zfbDic=[]
                }
            },remark2:function(){
                var vm=this;
                if(vm.checked1==true){
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
                    vm.wxDic=[]
                }
            },remark3:function(){
                var vm=this;
                if(vm.checked2==true){
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
            rbackvalue:function(){
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

            },bind:function(){
                var vm=this;
                if(vm.value2!==''||vm.value5!==''||vm.value8!==''){
              var aa=(vm.value2)?'{"type":'+'"zfb"'+','+'"industryId":'+'"'+vm.value2+'"'+'},':'';
              var bb=(vm.value5)?'{"type":'+'"wx"'+','+'"industryId":'+'"'+vm.value5+'"'+'},':'';
              var cc=(vm.value8)?'{"type":'+'"qq"'+','+'"industryId":'+'"'+vm.value8+'"'+'},':'';
              var allmegs={
                operates:'['+aa+bb+cc+']'};
              var a=allmegs.operates
              var a=a.split('}')
                a.pop()
                a.push(']')
              var a=a.join('}');
                var bindmeg={
                    shopId:vm.shopId,
                    dayLimit:vm.limtday,
                    monthLimit:vm.limtmoth,
                    fixFeeRate:vm.ratio,
                    pbcBankId:vm.pullbankval,
                    acctType:vm.values,
                    operates:a
                };
                vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$http.post(vm.apiUrl5,bindmeg,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                          vm.$router.push('/CustomerManagement')
                        }else{
                            alert(response.data.error)
                        }
                        
                    })
                  
                    }).catch(() => {
                      
                    });
               
                
                }else{

                    alert('商户类别不能为空')
                }
            },deleve:function(){
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
            },secondadd:function(){
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
			 //提交进件
       
			
		}
		
		
	}
</script>