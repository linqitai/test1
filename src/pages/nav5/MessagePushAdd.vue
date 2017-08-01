<template>
	 <div style="margin-left: 20px;">
		        
		        	<div class="title"><h4>推送方式　　　　　</h4> <el-select v-model="value8" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select></div>
		        	<div class="title"><h4>标题　　　　　　　</h4><input type="text" v-model="serchtitle"></div>
					<div class="title"><h4>接收人　　　　　　</h4> <el-radio-group v-model="radio2" @change="become">
						  <el-radio :label="1">全部用户</el-radio>
						  <el-radio :label="2">分类选择</el-radio>
						  <el-radio :label="3">输入账号/号码</el-radio>
						  </el-radio-group>
					</div>
					  <div class="lists"v-show="listshow">
						  	<div class="title">
								<h4>发送方式　</h4>
								<ul class="nav" :class="[sendtype]">
									<li class="sendall" @click="sendmeg('sendall')">全部</li>
									<li class="sendmale" @click="sendmeg('sendmale')">男性用户</li>
									<li class="sendfmale" @click="sendmeg('sendfmale')">女性用户</li>
								</ul>
							</div> <br>
							<div class="title"><h4>所在区域　　　</h4><address-picker :opts="obj" v-model="address"></address-picker><!-- <input type="text" v-model="detal" placeholder="请输入详细地址" style="margin: 20px 0 0 120px;"> --></div>
							<div class="title">
								<h4>收银台　　</h4>
								<ul class="nav" :class="[cash]">
									<li class="cashall" @click="casher('cashall')">全部</li>
									<li class="cashmin" @click="casher('cashmin')">民生银行</li>
									<li class="cashzho" @click="casher('cashzho')">中信银行</li>
									<li class="cashnan" @click="casher('cashnan')">南京银行</li>
								</ul>
							</div> <br>
							<div class="title">
								<h4>角色　　　</h4>
								<ul class="nav" :class="[sole]">
									<li class="solers" @click="solerchan('solers')">全部</li>
									<li class="solerman" @click="solerchan('solerman')">管理员</li>
									<li class="solercash" @click="solerchan('solercash')">收银员</li>
									<li class="solercasher" @click="solerchan('solercasher')">出纳</li>
								</ul>
							</div> <br>
					  </div>
					  <div v-show="contshow">
					  	<textarea id="cont" v-model="inputcontent" @keyup="iptcont" placeholder="请输入电话号码，每个号码以英文 , 隔开" ></textarea>
					  </div>
					  <div class="title"><h4>发送内容　　　　　</h4><textarea class="conts" v-model="content"></textarea></div>
					  <div class="btn"> <button  @click="send" type="button" class="el-button el-button--default"><span>发送</span></button>
            			</div>

		        </div>
</template>
<script>
	export default{
		data(){
			return{
				options: [/*{
		          value: '1',
		          label: 'App消息'
		        }, */{
		          value: '2',
		          label: '手机短信'
		        }],
		        value8:'',
		        serchtitle:'',
		        radio2:1,
		        detal:'',
		        sole:'solers',
		        sendtype:'sendall',
				cash:'cashall',
		        content:'',
		        listshow:false,
				contshow:false,
				obj:{default: { province: '', city: '', district:'' }},
				address:{
	        	province:'',
	            district:'',
	            city:''
		      	},
		      	inputcontent:'',
		      	apiUrl1:'api/filter/sms/insert.json ',
		      	apiUrl:'api/common/userInfo.json',
		      	megs:[],
		      	sender:'',
		      	sex:'',
		      	cashType:'',
		      	userType:'',
              	obj:{}
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this
			vm.$http.post(vm.apiUrl,{emulateJSON:true})
                    .then((response) => {
                        if(response){
                            vm.megs=response.data.obj
                           	vm.sender=vm.megs.userId
                              console.log(vm.megs)
                           
                        }else{
                            console.log(response.data.error)
                        }
                    })
				
				
			},
			become(value){
    			this.value=value
    			var vm=this
				if(value==2){
					vm.content=''
					vm.listshow=true;
					vm.address.province='',
					vm.address.district='',
					vm.address.city=''
				}else{
					vm.listshow=false;
					vm.content=''

				}if(value==3){
					vm.contshow=true;
					vm.content=''
				}else{
					vm.contshow=false;
					vm.content=''
				}
				
				
			},
			solerchan(cur){
				this.sole=cur
				console.log(cur)
        		var vm=this
        		if(cur=='solers'){
                vm.userType=''
                }if(cur=='solerman'){
                   vm.userType=1
                }if(cur=='solercash'){
                   vm.userType=2
                }if(cur=='solercasher'){
                	vm.userType=3
                }
                    
			},
			sendmeg(cur){
				this.sendtype=cur
        		var vm=this
        		if(cur=='sendall'){
                vm.sex=''
                }if(cur=='sendmale'){
                    vm.sex=1
                }if(cur=='sendfmale'){
                   vm.sex=2
                }
               
	        	
			},casher(cur){
				this.cash=cur
        		var vm=this
        		if(cur=='cashall'){
                vm.cashType=''
                }if(cur=='cashmin'){
                    vm.cashType=0
                }if(cur=='cashzho'){
                    vm.cashType=1
                }if(cur=='cashnan'){
                    vm.cashType=2
                }
                    
			},
			iptcont(){
				var vm=this; 
				
				/*var inputcontent=this.inputcontent;
				var leg=this.inputcontent.length;*/
				/*var str='18867119186,18867119186,185666'
				var inputs=str.split(',');
				var reg=/^1[3|8|5|7|4]\d{9}$/;
				for(var i=0;i<inputs.length;i++){
					console.log(inputs[i])
					if(!reg.test(inputs[i])){
						arr.push(inputs[i])
						console.log(arr)
					}
				}
				console.log(arr.length)*/
				/*for(var i=0;i<=10;i++){
					var inputs=inputcontent.split('')
					if(leg==0){
						this.inputcontent=inputcontent
						return
					}else
					if(leg==12*i){
						var inputcontent=inputcontent.split('');
						inputcontent.splice((11*i+i-1),0,',');
						var inputcontent=inputcontent.join('');
						this.inputcontent=inputcontent
						break

					}
				}*/
			},send(){
				var vm=this;
				if(vm.radio2==1){
					var news={
						receiver:'all',
                         title:vm.serchtitle,
                         content:vm.content,
                         sender:vm.sender
					}
				}if(vm.radio2==2){
					if(vm.address.district=='请选择'){
						vm.address.district=''
					}if(vm.address.city=='请选择'){
						vm.address.city=''
					}
					var receiver ='{"sex":'+'"'+vm.sex+'"'+',"cashType":'+'"'+vm.cashType+'"'+',"userType":'+'"'+vm.userType+'"'+',"province":'+'"'+vm.address.province+'"'+',"city":'+'"'+vm.address.city+'"'+',"area":'+'"'+vm.address.district+'"'+'}'
					
					/*,{"address":'+vm.detal+'}*/
					console.log(receiver)
                    var news={
                        receiver:receiver,
                        title:vm.serchtitle,
                        content:vm.content,
                        sender:vm.sender
                    }
                    
				}if(vm.radio2==3){
					if(vm.inputcontent!==''){
						var arr=[];
						var inputcontent=vm.inputcontent;
						var inputs=inputcontent.split(',');
						console.log(111111)
						console.log(inputs)
						var leg=inputs.length;
						console.log(leg)
						var reg=/^1[3|8|5|7|4]\d{9}$/;
						for(var i=0;i<leg;i++){
							if(!reg.test(inputs[i])){
								arr.push(inputs[i])
							}
						}
						

						var Leng=arr.length
						if(Leng>0){
							vm.$alert('手机号码格式错误', '标题名称', {
					          confirmButtonText: '确定',
					          callback: action => {
					           
					          }
					        });
						}else{
							var inputs=inputs.join(',')
							console.log(inputs)
		                    var news={
		                    	receiver:inputs,
		                        title:vm.serchtitle,
		                        content:vm.content,
		                        sender:vm.sender
		                    }
		                
						}
					}else{

					vm.$alert('接收人不能为空', {
					          confirmButtonText: '确定',
					          callback: action => {
					           return false
					          }
					        });
				
					}
				
				
				/*
                if(vm.value==2){
                	var receiver ='[{"sex":'+vm.sex+'},{"cashType":'+vm.cashType+'},{"userType":'+vm.userType+'},{"province":'+vm.address.province+'},{"city":'+vm.address.district+'},{"area":'+vm.address.city+'},{"address":'+vm.detal+'}]'
                    var news={
                        receiver:receiver,
                        title:vm.serchtitle,
                        content:vm.content
                    }
                    console.log(news)
                    vm.$http.post(vm.apiUrl1,news,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.list
                            vm.total=response.data.count
                            console.log(response.data)
                            if(vm.total<=vm.pageSize){
                                vm.showPageTag=false;
                            }else{
                                vm.showPageTag=true;
                            }
                        }else{
                            console.log(error)
                        }
                    })
                }if(vm.value==3){
                    var news={
                         receiver:vm.inputcontent,
                         title:vm.serchtitle,
                         content:vm.content
                    }
                }

                	console.log(news)*/
                
                   
				}
				
				if(vm.radio2==1||vm.radio2==2||vm.radio2==3&&vm.inputcontent!==''&&Leng==0){
					
				vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       vm.$http.post(vm.apiUrl1,news,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.$router.push('/MessagePush')
                        }else{
                            alert(response.data.error)
                        }
                    })
                    }).catch(() => {
                      
                    });
					
				}
				
				
	        		
			},
		
			
		}
		
		
	}
</script>