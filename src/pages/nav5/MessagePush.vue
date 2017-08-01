<template>
	<div style="margin-left: 20px;">
		<div v-show="title">
			<div class="title">
				<h4>发送方式　</h4>
				<!-- <ul class="nav" :class="[asaa]">
					<li class="alst" @click="sendstyle('alst')">全部</a></li>
					<li class="app" @click="sendstyle('app')">APP消息</a></li>
					<li class="messages" @click="sendstyle('messages')">手机短信</a></li>
				</ul> -->
				<ul class="nav" :class="[asaa]">
					<li class="alst" >全部</a></li>
					<li class="app" >APP消息</a></li>
					<li class="messages">手机短信</a></li>
				</ul>
			</div> <br>
			<div class="title"><h4>标题　　　　　　　　</h4><input type="text" v-model="serch"></div>
			<div class="title" style="position: relative"><h4 style="margin-top: 8px;">申请时间　　　　　　</h4>
		    	<div class="block">
			      	<el-date-picker
				        v-model="value1"
				        type="datetime"
				        placeholder="选择日期时间">
			      	</el-date-picker>
		    	</div>
	  			<div style="position: absolute;left: 340px;top:8px;">至</div>
		  		<div class="block" style="position: absolute;left: 360px;top:0px;">
				    <el-date-picker
				      v-model="value2"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
		  		</div> 
		  	</div>
	  		<button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
	  		<router-link :to="{ name: 'MessagePushAdd'}"><button  type="button" class="el-button el-button--default" style="float:right;margin-right:330px;"><span>新增</span></button></router-link>
	  		<!-- <button  @click="addds" type="button" class="el-button el-button--default" style="float: right;margin-right:150px;"><span>新增</span></button> -->
  		
  			<br>
			<table v-show="listpage">
	            <thead>
	                <tr>
	                    <th>标题</th>
	                    <th>发送方式</th>
	                    <th>接收人</th>
	                    <th>发送内容</th>
	                    <th>发送结果</th>
	                    <th>发送时间</th>
	                </tr>
	            </thead>
	          <tr v-for="(info,index) in megs">
	              <td>{{info.title}}</td>
	              <td>手机短信</td>
	              <td><el-button @click="toview(index)" type="text">{{formatcusTypes(info.cusType)}}</el-button><span>{{formatcusType(info.cusType)}}</span>
	              <td>{{info.content}}</td>
	              <td>成功：{{info.successCounts}}<br>失败：{{info.defCount}}</td>
	              <td>{{format(info.created)}}</td>
	              	
	          </tr>
	        </table>
	        <h1 v-show="!listpage" style="text-align:center">暂无数据......</h1>
	        <div class="block" v-show="showPageTag">		
	           	<el-pagination
	             @size-change="handleSizeChange"
	             @current-change="handleCurrentChange"
	             :current-page="pageIndex"
	             :page-size="pageSize"
	             layout="prev, pager, next, jumper"
	             :total="total">
	           	</el-pagination>
	        </div>
	    </div>
		        <!-- <div v-show="newmessage">
		        
		        	<div class="title"><h4>推送方式　　　　　</h4><input type="text"></div>
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
		        							<div class="title"><h4>所在区域　　　</h4><address-picker :opts="obj" v-model="address"></address-picker><input type="text" v-model="detal" placeholder="请输入详细地址" style="margin: 20px 0 0 120px;"></div>
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
		        								</ul>
		        							</div> <br>
		        					  </div>
		        					  <div v-show="contshow">
		        					  	<textarea id="cont" v-model="inputcontent" @keyup="iptcont"></textarea>
		        					  </div>
		        					  <div class="title"><h4>发送内容　　　　　</h4><textarea class="conts" v-model="content"></textarea></div>
		        					  <div class="btn"> <button  @click="send" type="button" class="el-button el-button--default"><span>发送</span></button>
		                    			</div>
		        
		        </div> -->
		        <div>
		        	 <el-dialog  v-model="editFormVisible" :close-on-click-modal="false">
		        	 <table style="width:50%" v-if="select">
		        	 	<tr>
		        	 		<th>接收人</th>
		        	 	</tr>
					    <tr>
					    	<td align="left">
					    		<h4 style="margin-top:3px;">性别　　　</h4><span>{{formatcussex(receives.sex)}}</span><br>
					    		<h4 style="margin-top:3px;">区域　　　</h4><span>{{receives.province}}{{receives.city}}{{receives.area}}{{receives.address}}</span><br>
					    		<h4 style="margin-top:3px;">收银台　　</h4><span>{{formatcasType(receives.cashType)}}</span><br>
					    		<h4 style="margin-top:3px;">角色　　　</h4><span>{{formatuseType(receives.userType)}}</span><br>
					    	</td>
					    </tr>

		        	 </table> 
		        	 <table style="width:50%" v-if="tellspecil">
		        	 	<tr>
		        	 		<th>接收人</th>
		        	 	</tr>
					    <tr v-for="(infos,index) in meg">
					    	<td >
					    		{{infos}}
					    	</td>
					    </tr>

		        	 </table>

		        	 	
		            <div slot="footer" class="dialog-footer">
		                <el-button @click="editFormVisible = false">取消</el-button>
		                <el-button type="primary" @click="editSubmit" >确定</el-button>
		            </div>
        </el-dialog>
		        </div>
		         <el-button v-if="newmessage"type="text" class="rback"@click="rbackbtn">返回</el-button>
		
	</div>
</template>
<script>

	export default{
		data(){
			return {
				serchtitle:'',
				title:true,
				newmessage:false,
				select:false,
				tellspecil:false,
				listpage:true,
				address:'',
				receives:[],
				content:'',
				value:1,
				
				editFormVisible:false,
				
				radio2:1,
				asaa:'messages',
				apiUrl:'api/filter/sms/view.json',
				
				megs:[],
				meg:[],
				receive:'',
				address:{
	        	province:'',
	            district:'',
	            city:''
		      	},
				pageIndex: 1,
		        pageSize: 10,
		        total: 1,
		        serch:'',
		        sex:'',
		        userType:'',
		        cashType:'',
		        showPageTag:false,
		       pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1:'',
        value2:''
        }
			
		},

		created: function() {
            this.getCustomers() 
        },
        methods:{

        	 formatcusType:function(row){
                
                return row==1?'所有人':'';
            },formatcusTypes:function(row){
                
                return row==2?'查看':row==3?'查看':'';
            },
            formatcussex:function(row){
                
                return row==1?'男':row==2?'女':'';
            },formatcasType:function(row){
                
                return row==0?'民生银行':row==1?'中信银行':row==2?'南京银行':'';
            },formatuseType:function(row){
                
                return row==1?'管理员':row==2?'收银员':'';
            },
			getCustomers:function() {
                var vm = this
                var parameterData={
	                pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    title : vm.serch,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };

                vm.$http.post(vm.apiUrl,parameterData,{emulateJSON:true})
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
                    		console('数据请求失败')
                    	}
                    })
            },handleSizeChange(val) {		
	        	console.log(`每页 ${val} 条`);
	      	},
	     	handleCurrentChange(val) {
	     		if(val>1){
	     			this.showPageTag=true
	     		}
	        	this.pageIndex= val;
	        	this.getCustomers();
	        	console.log(`当前页: ${val}`);
	        	console.log(val);
	      	},
            addd:function(){
            var vm=this
            var inpt={
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    title : vm.serch,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };
                console.log(inpt)
                vm.$http.post(vm.apiUrl,inpt,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.list
                            vm.total=response.data.count
                            if(vm.megs==''){
                              vm.listpage=false
                            }else{
                              vm.listpage=true
                            }
                            if(vm.total<=vm.pageSize){
                                vm.showPageTag=false;
                            }else{
                                vm.showPageTag=true;
                            }
                        }else{
                            console.log(error)
                        }
                    })
            },editSubmit:function(){
            	this.tellspecil=false
            	this.select=false
            	this.editFormVisible=false
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
    		
			
			
			
			rbackbtn:function(){
              var vm=this;
              vm.title=true
              vm.newmessage=false

            },toview:function(index){
            	var vm=this;
            	vm.cusType=vm.megs[index].cusType
            	if(vm.megs[index].cusType==3){
            		vm.tellspecil=true
            	var a=vm.megs[index].receiver
            	var a=a.split(',')
            	vm.meg=a
            	vm.editFormVisible=true
            	}if(vm.megs[index].cusType==2){
            		vm.editFormVisible=true
            		vm.select=true
            	vm.receives=vm.megs[index].receiver
            	var aaaaa=JSON.parse(vm.receives)
            	vm.receives=aaaaa
            	}
            	
            },
			
			/*sendstyle(cur){
				this.asaa=cur
	        		var vm=this
	        		if(cur=='alst'){
                    var scash={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        sort:''
                    }
                }if(cur=='app'){
                    var scash={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        sort:2
                    }
                }if(cur=='messages'){
                    var scash={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        sort:1
                    }
                }
                    vm.$http.post(vm.apiUrl,scash,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.list
                            vm.total=response.data.count
                            if(vm.total<=vm.pageSize){
                                vm.showPageTag=false;
                            }else{
                                vm.showPageTag=true;
                            }
                        }else{
                            console.log(error)
                        }
                    })
			},*/
			
		}
		
       
         
	}
</script>
<style>
  .nav li{
	cursor: pointer;
	width: 85px;
	height: 25px;
	text-align: center;
	line-height: 25px;
}
.alst .alst,.app .app,.messages .messages
{
	background: #81C9ED;
	color: white;
}
.sendall .sendall,.sendmale .sendmale,.sendfmale .sendfmale{
        background: #81C9ED;
        color: white;
    }
.cashall .cashall,.cashmin .cashmin,.cashnan .cashnan,.cashzho .cashzho{
        background: #81C9ED;
        color: white;
    }
.solers .solers,.solerman .solerman,.solercash .solercash,.solercasher .solercasher{
        background: #81C9ED;
        color: white;
    }
.lists{
	width: 80%;
	height: 200px;
	border: 1px solid #ccc;
	margin-left: 125px;
	padding-left: 10px;
}
#cont{
	width: 700px;
	height: 150px;
	margin-left: 125px;
}
.conts{
	width:70%;
	height: 200px; 
}
</style>