<template>
	 <div v-loading="loading" style="margin-left: 20px;">
         
          <div class="title"><h4>是否持证　　　　　　</h4>
           <el-select v-model="pulldefor" placeholder="请选择" @change="ishave" >
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></div>
          <div class="title"><h4>商户全称　　　　　　</h4><el-input class="inputs"v-model="pullname"  placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>营业执照号　　　　　</h4><el-input class="inputs"v-model="pulllicense" v-bind:disabled="disabled" placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>营业执照有效期　　　</h4><el-input class="inputs"v-model="pulldate" v-bind:disabled="disabled" placeholder="请输入内容"></el-input></div>
          <div class="title"><h4>区域代码　　　　　　</h4><el-input class="inputs"v-model="pullcode" placeholder="请输入内容"></el-input><span v-if="province">{{province}}　</span><span v-if="city">{{city}}　</span><span v-if="area">{{area}}</span></div>
          
          <div class="btn"> 
          <button   type="button" class="el-button el-button--default" @click="entry"><span>录入进件</span></button>
            </div>

        </div>
</template>
<script>
	export default{
		data(){
			return{
				pulldefor:'',
				 options: [{
                value: 1,
                label: '持证商户'
                }, {
                  value: 0,
                  label: '非持证商户'
                }],
                pullname:'',
                pulllicense:'',
                pulldate:'',
                pullcode:'',
                intoId:'',
                shopId:'',
                addressmegs:'',
                province:'',
                city:'',
                area:'',
                loading:false,
                //进件信息保存
             apiUrl10:'api/filter/apply/intoSave.json',
             apiUrl:'api/filter/apply/getAreaCode.json',
             
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
				vm.shopId=vm.$route.query.shopId
				vm.province=vm.$route.query.province
				vm.city=vm.$route.query.city
				vm.area=vm.$route.query.area
        var citycode={
          province:vm.province,
          city:vm.city,
          area:vm.area
        };
         vm.$http.post(vm.apiUrl,citycode,{emulateJSON:true})
              .then((response) => {
                  if(response.data.code===0){
                      vm.pullcode=response.data.obj
                  }else{
                      alert(response.data.error)
                  }
              })
        
				
			},
			entry:function(){
          var vm=this
          
            var jinmegs={
              shopId:vm.shopId,
              mchntFullName:vm.pullname,
              licId:vm.pulllicense,
              licValidity:vm.pulldate,
              acdCode:vm.pullcode,
              isCert:vm.pulldefor
            };
              vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      vm.loading=true
                       vm.$http.post(vm.apiUrl10,jinmegs,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                          vm.intoId=response.data.intoId
                          vm.loading=false
                           vm.$router.push('/CustomerApplication/submit?intoId='+vm.intoId
                          )
                            
                        }else{
                          vm.loading=false
                            alert(response.data.error)
                        }
                    })
                  
                    }).catch(() => {
                      
                    });
            


        },ishave:function(){
        	console.log(this.pulldefor)
        }
		},computed:{
          disabled:function(){
            var vm=this
            console.log(vm.pulldefor)
            if(vm.pulldefor==1){
              console.log(222)
              vm.pulllicense=''
              vm.pulldate=''
             return false
            }if(vm.pulldefor==0){
              console.log(1111)
              vm.pulllicense='-'
              vm.pulldate='-'
              return true
              
            }
          }
        }
		
	}
</script>