<template>
	<div style="margin-left: 20px;">
		<div class="title">
			<h4>发货进度</h4>
			<ul class="nav" :class="[ship]">
				<li class="shipall"@click="delivery('shipall')">全部</li>
				<li class="unship"@click="delivery('unship')">未发货</li>
				<li class="shiped"@click="delivery('shiped')">已发货</li>
				<li class="receive"@click="delivery('receive')">已收货</li>
			</ul>
		</div> <br>
		<div class="title">
			<h4>使用方式</h4>
			<ul class="nav" :class="[use]">
				<li class="useall"@click="usefile('useall')">全部</li>
				<li class="exchange"@click="usefile('exchange')">直接兑换</li>
				<li class="scratch"@click="usefile('scratch')">刮刮卡</li>
			</ul>
		</div> <br>
	

		<div class="title"><h4>兑换人　　　　</h4><input type="text" v-model="ships"></div>
		<div class="title"><h4>手机号码　　　</h4><input type="number" v-model="shipnum"></div>
		 <div class="title" style="position: relative"><h4 style="margin-top: 8px;">申请时间　　　</h4>
                <div class="block">
                <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
                </div>
                <div style="position: absolute;left: 304px;top:8px;">至</div>
                <div class="block" style="position: absolute;left: 330px;top:0px;">
                <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
                </div> 
            </div>
		<button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
		<br>
		<table>
            <thead v-show="listpage">
                <tr>
                    <th>兑换人</th>
                    <th>手机号码</th>
                    <th>所在店铺</th>
                    <th>使用方式</th>
                    <th>使用/剩余积分</th>
                    <th>礼品</th>
                    <th>收货进度</th>
                    <th>兑换时间</th>
                    <th>操作</th>
                </tr>
               <tr v-if="megs" v-for="(info,index) in megs">
                            <td>{{info.name}}</td>
                            <td>{{info.mobile }}</td>
                            <td>{{info.shopName}}</td>
                            <td>{{formattype(info.type)}}</td>
                            <td>{{info.integral}}/{{info.remIntegral}}积分</td>
                            <td>{{info.context}}</td>
                            <td>{{formatstatus(info.deliveryStatus)}}</td>
                            <td>{{format(info.created)}}</td>
                            <td><el-button @click="receiveeidt(index)" type="text">收货信息</el-button></td>
               
                        	</tr>
            </thead>
         
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
	    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px"  ref="editForm">
				<el-form-item label="收货人" prop="name"style="text-align: left">
					<el-input v-model="addressmegs.phone" auto-complete="off" style="margin-left: 9%; width: 60%;"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="name">
					<el-input v-model="addressmegs.consignee" auto-complete="off" style="margin-left: 9%;width: 60%;"></el-input>
				</el-form-item>
				<div class="title" style="position: relative"><h4>店铺地址　　　　　</h4><address-picker :opts="obj" v-model="address"style="display:inline-block;margin:10px 0 0 0px;" v-show="seleaddress"></address-picker>
	           <br>
	           <el-input v-model="addressmegs.address" auto-complete="off" style="margin-left:20%;width: 53%;"></el-input></div>
	           <div class="title"><h4 style="margin-top:5px;">收货状态　　　　　</h4> <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select></div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" >提交</el-button>
			</div>
		</el-dialog>
	
	</div>
</template>
<script>
	export default{
		data(){
			return{
				use:'useall',
				ship:'shipall',
				apiUrl:'api/filter/conversion/view.json',
				apiUrl1:'api/filter/delivery/editDetail.json',
				apiUrl2:'api/filter/delivery/edit.json',
				listpage: true,
				pageIndex: 1,
		        pageSize: 10,
		        total: 1,
		        value1: '',
		        value2: '',
		        ships: '',
		        shipnum: '',
		        deliveryId: '',
		        address: {
		        	province:'',
		        	city:'',
		        	district:''

		        },
		        obj: {},
		        addressmegs: [],
		        deliveryStatus: '',
		        type: '',
		        deliveryId: '',
		        editForm:{
		        	name:'',
		        	num:'',
		        },
		        megs: [],
		        showPageTag:false,
		       editFormVisible:false,
		       seleaddress:true,
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
		        }, options: [{
			          value: 0,
			          label: '未发货'
			        }, {
			          value: 1,
			          label: '已发货'
			        }, {
			          value: 2,
			          label: '已收货'
			        }, {
			          value: 3,
			          label: '已退回'
			        }],
			        value: ''
			}
		},
		created: function() {
            this.getCustomers() 
        },
		methods:{
			formattype:function(row){
        		return row==1?'直接兑换':row==2?'刮刮卡':row==0?'刮刮卡':'';
        	},formatstatus:function(row){
        		return row==1?'已发货':row==2?'已收货':row==3?'已退回':'未发货';
        	},
			delivery:function(cur){
				var vm=this;
				vm.ship=cur
				if(cur=='shipall'){
					vm.deliveryStatus=''
					var shipmegs={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}if(cur=='unship'){
					vm.deliveryStatus=0
					var shipmegs={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}if(cur=='shiped'){
					vm.deliveryStatus=1
					var shipmegs={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}if(cur=='receive'){
					vm.deliveryStatus=2
					var shipmegs={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}
				vm.$http.post(vm.apiUrl,shipmegs,{emulateJSON:true})
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
                    		console.log(response.data.error)
                    	}
                    })
			},
			usefile:function(cur){
				var vm=this;
				vm.use=cur
				if(cur=='useall'){
					vm.type=''
					var shipmeg={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}if(cur=='exchange'){
					vm.type='1'
					var shipmeg={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}if(cur=='scratch'){
					vm.type='0,2'
					var shipmeg={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					}
				}
				 vm.$http.post(vm.apiUrl,shipmeg,{emulateJSON:true})
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
                    		console.log(response.data.error)
                    	}
                    })
			},getCustomers: function() {
                var vm = this
                var parameterData={
	              deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };
                	console.log(parameterData)
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
                    		console.log(response.data.error)
                    	}
                    })
            },handleSizeChange(val) {		
	        	console.log(`每页 ${val} 条`);
	      	},
	     	handleCurrentChange(val) {
	     		
	        	this.pageIndex= val;
	        	this.getCustomers();
	        	console.log(`当前页: ${val}`);
	        	console.log(val);
	      	},addd:function(){
	      		var vm=this;
	      		var shipmessage={
						deliveryStatus:vm.deliveryStatus,
						types:vm.type,
						name:vm.ships,
						mobile:vm.shipnum,
						pageIndex: vm.pageIndex,
                		pageSize: vm.pageSize,
						_startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                		_endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
					};
					console.log(shipmessage)
				vm.$http.post(vm.apiUrl,shipmessage,{emulateJSON:true})
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
                    		console.log(response.data.error)
                    	}
                    })

	      	},
	      	receiveeidt:function(index){
	      		var vm=this;
	      		vm.editFormVisible=true
	      		vm.deliveryId=vm.megs[index].deliveryId
	      		vm.$http.post(vm.apiUrl1,{deliveryId:vm.megs[index].deliveryId},{emulateJSON:true})
                    .then((response) => {
                    	if(response.data.code===0){
                    		vm.addressmegs=response.data.obj
                    		vm.obj={default:{province: vm.addressmegs.province,city:vm.addressmegs.city,district:vm.addressmegs.area}}
                    		vm.value=vm.addressmegs.deliveryStatus
                        	console.log(vm.addressmegs)
                        	
                    	}else{
                    		console.log(response.data.error)
                    	}
                    })
	      	},editSubmit:function(){
	      		var vm=this;
	      		var uploadmeg={
	      			deliveryId:vm.deliveryId,
	      			consignee:vm.addressmegs.consignee,
	      			phone:vm.addressmegs.phone,
	      			province:vm.address.province,
	      			city:vm.address.city,
	      			area:vm.address.district,
	      			address:vm.addressmegs.address,
	      			deliveryStatus:vm.value
	      		};
	      		console.log(uploadmeg)
	      		vm.$http.post(vm.apiUrl2,uploadmeg,{emulateJSON:true})
                    .then((response) => {
                    	if(response.data.code===0){
                    		vm.editFormVisible=false
                    		vm.getCustomers()
                    	}else{
                    		console.log(response.data.error)
                    	}
                    })
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
        	
    		}
		}
	}
</script>
<style type="text/css">
	.shipall .shipall,.unship .unship,.shiped .shiped,.receive .receive{
        background: #81C9ED;
        color: white;
    }
    .useall .useall,.exchange .exchange,.scratch .scratch{
        background: #81C9ED;
        color: white;
    }
</style>