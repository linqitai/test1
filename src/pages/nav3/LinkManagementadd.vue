<template>
	<div style="margin-left: 20px;">
		<div class="title"><h4>所在端　　　　</h4><el-select v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :label="item.label"
		      :value="item.value">
		      </el-option>
		  	</el-select></div>
	  	<div class="title"><h4>所在位置　　　</h4><el-select v-model="value1" placeholder="请选择">
	    <el-option
	      v-for="item in options1"
	      :label="item.label"
	      :value="item.value">
	      </el-option>
	  	</el-select></div>
		<div class="title"><h4>名称　　　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="nameval"></el-input></div>
		<div class="title"><h4>连接方式　　　</h4><el-select v-model="value2" placeholder="请选择"@change="jump">
	    <el-option
	    
	      v-for="item in options2"
	      :label="item.label"
	      :value="item.value">
	      </el-option>
	  	</el-select></div>
        <div class="title" v-if="linkAddress"><h4>链接地址　　　</h4><el-input placeholder="请输入内容" style="width: 30%;" v-model="linkaddr"></el-input></div>
	  	<div class="title"><h4>展示图　　　　</h4><el-upload
            class="avatar-uploader"
            action="api/common/upload/image.do"
            :show-file-list="false"
            :on-success="handleAvatarScucess1"
            :before-upload="beforeAvatarUpload1">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br></div><br>
	  	<div class="title"><h4>发布时间　　　</h4>

            <div class="block" v-if="timer" style="display: inline-block">
                <el-date-picker
                  v-model="value3"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker> </div>
                <el-checkbox v-model="checked" @change="remark1">发布即上线</el-checkbox>
               </div><br>
                <div class="title" ><h4>下线时间　　　</h4><div style="display: inline-block"class="block" v-if="timers">
                <el-date-picker

                  v-model="value4"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker></div> <el-checkbox v-model="checked1" @change="remark2" >不设置</el-checkbox>
                
                </div> 
                 <div class="btn"> <button  @click="linksave" type="button" class="el-button el-button--default"><span>仅保存</span></button>
            <button  @click="linksubmit" type="button" class="el-button el-button--default"><span>发布</span></button></div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				value2: '',
				value1: '',
				value3: '',
				value4: '',
				value: '',
				//新建链接
                apiUrl1:'api/filter/link/add.json',
				options: [{
			          value: 1,
			          label: 'APP'
			        }],
			     options1: [{
			          value: 1,
			          label: '首页banner条'
			        }, {
			          value: 2,
			          label: '首页弹框'
			        }],
			        nameval: '',
			    options2: [{
			          value: 0,
			          label: '不跳转'
			        }, {
			          value: 1,
			          label: 'html5跳转'
			        }/*, {
			          value: 2,
			          label: '内部跳转'
			        }*/],
			    linkAddress:false,
			    imageUrl1:'',
			    timer:true,
                timers:true,
                checked:false,
                checked1:false,
                linkaddr: '',
                datas: '',
              
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
				
				
			},
			jump:function(){
                var vm=this
            	if(vm.value2==1){
                    vm.linkAddress=true
                }else{
                    vm.linkAddress=false
                }
            }, handleAvatarScucess1(res, file) {
              console.log(file)
              var vm=this;
            vm.imageUrl1 = URL.createObjectURL(file.raw);
            vm.imageUrl1 = file.response.url;
            console.log(vm.imageUrl1)
          },
         beforeAvatarUpload1(file) {

          },
          pickerOptions0:function(){},
            remark1:function(){
            	var vm=this;
            	if(vm.checked==true){
            		vm.timer=false
                    vm.datas=new Date()
                    vm.datas=Date.parse(vm.datas)
            	}else{
            		vm.timer=true
            	}
            	
            },remark2:function(){
            	var vm=this;
            	if(vm.checked1==true){
            		vm.timers=false
            	}else{
            		vm.timers=true
            	}
            },linksave:function(){
                var vm=this;
                if(vm.checked==false&&vm.checked1==false){
                    vm.issueType=1
                }if(vm.checked==true&&vm.checked1==false){
                    vm.issueType=2
                    vm.value3=''
                }if(vm.checked==false&&vm.checked1==true){
                    vm.issueType=3
                    vm.value4=''
                }if(vm.checked==true&&vm.checked1==true){
                    vm.issueType=4
                    vm.value3=''
                    vm.value4=''
                }if(vm.value3==''&&vm.checked==false){
                    alert('不能为空')
                }if(vm.value4==''&&vm.checked1==false){
                    alert('不能为空')
                }
            	var vm=this;
                if(vm.checked==true){
                     var startTime=vm.datas
                }else{
                    startTime=(vm.value3==''?vm.value3:Date.parse(vm.value3))
                }if(vm.checked1==true){
                    var endTime=''
                }else{
                    endTime=(vm.value4==''?vm.value4:Date.parse(vm.value4))
                }
            	var savemegs={
            		linkType:vm.value1,
            		side:vm.value,
            		name:vm.nameval,
            		linkMethod:vm.value2,
            		linkAddr:vm.linkaddr,
                    img:vm.imageUrl1,
            		status:0,
                    issueType:vm.issueType,
                    _startTime:startTime,
                    _endTime:endTime

            	};
                console.log(savemegs)
                if(vm.value3 !==''||vm.checked !==false&&vm.value4 !==''||vm.checked1 !==false){
                    vm.$confirm('确认保存？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$http.post(vm.apiUrl1,savemegs,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.$router.push('/LinkManagement')
                        }else{
                            alert(response.data.error)
                        }
                    })
                   
                    }).catch(() => {
                      vm.$message({
                        type: 'info',
                        message: '已取消'
                      });          
                    });
                }
                
                 
                
            },jump:function(){
                var vm=this
            	if(vm.value2==1){
                    vm.linkAddress=true
                }else{
                    vm.linkAddress=false
                }
            },
            linksubmit:function(){
                var vm=this;
                if(vm.checked==false&&vm.checked1==false){
                    vm.issueType=1
                }if(vm.checked==true&&vm.checked1==false){
                    vm.issueType=2
                    vm.value3=''
                }if(vm.checked==false&&vm.checked1==true){
                    vm.issueType=3
                    vm.value4=''
                }if(vm.checked==true&&vm.checked1==true){
                    vm.issueType=4
                    vm.value3=''
                    vm.value4=''
                }if(vm.value3==''&&vm.checked==false){
                    alert('不能为空')
                }if(vm.value4==''&&vm.checked1==false){
                    alert('不能为空')
                }
                var vm=this;
                 if(vm.checked==true){
                     var startTime=vm.datas
                }else{
                    startTime=(vm.value3==''?vm.value3:Date.parse(vm.value3))
                }if(vm.checked1==true){
                    var endTime=''
                }else{
                    endTime=(vm.value4==''?vm.value4:Date.parse(vm.value4))
                }
                var savemegs={
                    linkType:vm.value1,
                    side:vm.value,
                    name:vm.nameval,
                    linkMethod:vm.value2,
                    linkAddr:vm.linkaddr,
                    img:vm.imageUrl1,
                    status:1,
                    issueType:vm.issueType,
                    _startTime:startTime,
                    _endTime:endTime

                };
                console.log(savemegs)
                if(vm.value3 !==''||vm.checked !==false&&vm.value4 !==''||vm.checked1 !==false){
                    vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$http.post(vm.apiUrl1,savemegs,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.$router.push('/LinkManagement')
                           
                        }else{
                            alert(response.data.error)
                        }
                    })
                  
                    }).catch(() => {
                      
                    });
                }
                
               
                
                
            },
			 //提交进件
       
			
		}
		
		
	}
</script>