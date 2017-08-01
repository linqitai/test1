<template>
	<div style="margin-left: 20px;">
	 <button  @click="add" type="button" class="el-button el-button--default"style="margin-right: 330px;float: right;"><span>添加</span></button>
		<table>
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>角色</th>
                    <th>状态</th>
                    <th>操作</th>
                    
                </tr>
               <tr v-if="megs" v-for="(info,index) in megs">
                            <td>{{info.realName}}</td>
                            <td>{{info.mobile }}</td>
                            <td>{{info.roleName}}</td>
                            <td>{{formatforbidden(info.forbidden)}}</td>
                            <td><el-button type="text"@click="disable(index)">{{formattype(info.forbidden)}}</el-button><el-button type="text"@click="accounteidt(index)">编辑</el-button></td>
               
                        	</tr>
            </thead>
         
        </table>
         <el-dialog  v-model="editFormVisible" :close-on-click-modal="false">
    <div ><h4>姓名　　　　　　　</h4><el-input auto-complete="off" v-model="addval.name" style="width: 39%;"></el-input></div><br>
    <div ><h4>手机号码　　　　　</h4><el-input auto-complete="off" v-model="addval.mobile" style="width: 39%;"></el-input></div><br>
    <div ><h4>密码　　　　　　　</h4><el-input auto-complete="off" v-model="addval.password" style="width: 39%;"></el-input></div><br>
    <div ><h4>角色　　　　　　　</h4><el-select v-model="addval.value" placeholder="请选择">
								    <el-option
								      v-for="item in options"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select></div><br>
    <div ><h4>状态　　　　　　　</h4>
	<el-select v-model="addval.value1" placeholder="请选择">
								    <el-option
								      v-for="item in options1"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
   								 </div>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" >提交</el-button>
            </div>
        </el-dialog> 
        <el-dialog  v-model="editFormVisibles" :close-on-click-modal="false">
    <div ><h4>姓名　　　　　　　</h4><el-input auto-complete="off" v-model="meg.realName" style="width: 39%;"></el-input></div><br>
    <div ><h4>手机号码　　　　　</h4><el-input auto-complete="off" v-model="meg.mobile" style="width: 39%;"></el-input></div><br>
    <div ><h4>角色　　　　　　　</h4><el-select v-model="meg.roleId" placeholder="请选择">
								    <el-option
								      v-for="item in options"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select></div><br>
    <div ><h4>状态　　　　　　　</h4>
	<el-select v-model="meg.forbidden" placeholder="请选择">
								    <el-option
								      v-for="item in options1"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
   								 </div>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmits" >提交</el-button>
            </div>
        </el-dialog>
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
</template>
<script>
	export default{
		data(){
			return {
				apiUrl:'api/filter/user/view.json',
				apiUrl1:'api/filter/user/add.json',
				apiUrl2:'api/filter/user/editInfo.json',
				megs:[],
				meg:[],
				userId:'',
				pageIndex: 1,
		        pageSize: 10,
		        total: 1,
		        userId: '',
				addval:{
					name:'',
					mobile:'',
					value1: '',
					value: '',
					password:''
				},
				editFormVisible:false,
				editFormVisibles:false,
				showPageTag:false,
				options: [{
			          value: 1,
			          label: '管理员'
			        }, {
			          value: 4,
			          label: '测试角色'
			        }, {
			          value: 2,
			          label: '新增测试'
			        }, {
			          value: 3,
			          label: '发标员'
			        }],
			        
			        options1: [{
			          value: 0,
			          label: '启用'
			        }, {
			          value: 1,
			          label: '禁用'
			        }],
			        
			}
		},
	
		created: function() {
            this.getCustomers() 
        },
        methods:{
        	formattype:function(row){
        		return row==0?'禁用':row==1?'启用':'';
        	},formatforbidden:function(row){
        		return row==0?'启用':row==1?'禁用':'';
        	},
        	getCustomers: function() {
                var vm = this
                vm.$http.post(vm.apiUrl,{pageIndex:vm.pageIndex,pageSize:vm.pageSize},{emulateJSON:true})
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
            },add:function(){
            	var vm=this;
            	vm.editFormVisible=true
            },editSubmit:function(){
            	var vm=this;
            	var addmeg={
            		roleId:vm.addval.value,
            		password:vm.addval.password,
            		realName:vm.addval.name,
            		mobile:vm.addval.mobile,
            		forbidden:vm.addval.value1
            	};
            	vm.$http.post(vm.apiUrl1,addmeg,{emulateJSON:true})
                    .then((response) => {
                    	if(response.data.code===0){
                    		
                    	}else{
                    		console.log(response.data.error)
                    	}
                    })
              vm.addval={}
              setTimeout(function(){vm.getCustomers()},200)
             vm.editFormVisible=false
            },handleSizeChange(val) {		
	        	console.log(`每页 ${val} 条`);
	      	},
	     	handleCurrentChange(val) {
	     		
	        	this.pageIndex= val;
	        	this.getCustomers();
	        	console.log(`当前页: ${val}`);
	        	console.log(val);
	      	},accounteidt:function(index){
	      		var vm=this;
	      		vm.meg=vm.megs[index]
	      		console.log(vm.meg.roleId)
	      		vm.userId=vm.megs[index].userId
	      		vm.editFormVisibles=true
	      	},editSubmits:function(){
	      		var vm=this;
            	var eidtmeg={
            		userId:vm.userId,
            		roleId:vm.meg.roleId,
            		realName:vm.meg.realName,
            		mobile:vm.meg.mobile,
            		forbidden:vm.meg.forbidden
            	}
            	vm.$http.post(vm.apiUrl2,eidtmeg,{emulateJSON:true})
                    .then((response) => {
                    	if(response.data.code===0){
                    		
                    	}else{
                    		console.log(response.data.error)
                    	}
                    })
             vm.editFormVisibles=false
             setTimeout(function(){vm.getCustomers()},100)
	      	},disable:function(index){
	      		var vm=this;
	      		if(vm.megs[index].forbidden==0){
	      			var a=1
	      		}if(vm.megs[index].forbidden==1){
	      			var a=0
	      		}

	      		vm.$http.post(vm.apiUrl2,{userId:vm.megs[index].userId,forbidden:a},{emulateJSON:true})
                    .then((response) => {
                    	if(response.data.code===0){
                    		
                    	}else{
                    		console.log(response.data.error)
                    	}
                    })
                setTimeout(function(){vm.getCustomers()},100)
	      	}
        }
    }
</script>