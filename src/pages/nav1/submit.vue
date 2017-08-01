<template>
	 <div  v-loading="loading" style="margin-left: 20px;">

          <div class="title"><h4>商户全称　　　　　　</h4><el-input class="inputs"v-model="pullname" placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>营业执照号　　　　　</h4><el-input class="inputs"v-model="pulllicense" placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>营业执照有效期　　　</h4><el-input class="inputs"v-model="pulldate" placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>区域代码　　　　　　</h4><el-input class="inputs"v-model="pullcode" placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>是否持证　　　　　　</h4>
           <el-select v-model="pulldefor1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :value="item.value"
                :label="item.label"
                >
              </el-option>
            </el-select></div>
          <div class="btn"> 
          <button   type="button" class="el-button el-button--default" @click="entrysubmit"><span>提交进件</span></button>
            </div>
        </div>
</template>
<script>
	export default{
		data(){
			return{
				pulldefor1:'',
				 options: [{
                value: '1',
                label: '持证商户'
                }, {
                  value: '0',
                  label: '非持证商户'
                }],
                pullname:'',
                pulllicense:'',
                pulldate:'',
                pullcode:'',
                intoId:'',
                addressmegs:'',
                loading:false,
                //获取进件信息
    			 apiUrl12:'api/filter/apply/intoDetail.json',
    			 //提交进件
             apiUrl11:'api/filter/apply/intoSubmit.json',
              
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
				vm.intoId=vm.$route.query.intoId
				vm.shopId=vm.$route.query.shopId
				if(vm.intoId){
					var val={
						intoId:vm.intoId
					}
				}if(vm.shopId){
					var val={
						shopId:vm.shopId
					}
				}
				vm.$http.post(vm.apiUrl12,val,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        console.log(response.data)
                          vm.entrymegs=response.data.obj
                          vm.pullname=vm.entrymegs.mchntFullName,
                          vm.pulllicense=vm.entrymegs.licId,
                          vm.pulldate=vm.entrymegs.licValidity,
                          vm.pulldefor1=vm.entrymegs.isCert,
                          vm.txnSeq=vm.entrymegs.txnSeq,
                          vm.pullcode=vm.entrymegs.acdCode
                       }else{
                       	alert(response.data.error)
                       } 
                    })
				
			},
			 //提交进件
        entrysubmit:function(){
          var vm=this;
         
          
          var entryval={
            mchntFullName:vm.pullname,
            licId:vm.pulllicense,
            licValidity:vm.pulldate,
            acdCode:vm.pullcode,
            isCert:vm.pulldefor1,
            intoId:vm.entrymegs.intoId
          };
          vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => { 
                      vm.loading=true
                       vm.$http.post(vm.apiUrl11,entryval,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                          vm.loading=false
                         vm.$router.push('/CustomerApplication')
                        }else{
                          vm.loading=false
                           alert(response.data.error)
                        }
                    })
                    }).catch(() => {
                      
                    });
          
        },
			
		}
		
		
	}
</script>