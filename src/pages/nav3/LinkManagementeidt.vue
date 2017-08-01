<template>
	<!-- 详情页面 -->
    <div style="margin-left: 20px;">
        <div class="title"><h4>所在端　　　　</h4><span>{{formatside(arr.side)}}</span></div>
        <div class="title"><h4>所在位置　　　</h4><span>{{formatlinkType(arr.linkType)}}</span></div>
        <div class="title"><h4>名称　　　　　</h4><span>{{arr.name}}</span></div>
        <div class="title"><h4>连接方式　　　</h4><span>{{formatMethod(arr.linkMethod)}}</span></div>
        <div class="title"><h4>链接地址　　　</h4><span>{{arr.linkAddr}}</span></div>
        <div class="title"><h4>展示图　　　　</h4><img :src="arr.img" class="img"></div>
        <div class="title"><h4>发布时间　　　</h4><span>{{format(arr.startTime)}}</span></div>
        <div class="title"><h4>下线时间　　　</h4><span>{{format(arr.endTime)}}</span></div>
        <div class="title"><h4>状态　　　　　</h4><span>{{formatStatus(arr.status)}}</span></div>
         <div class="btn"> <button  @click="sheif" type="button" class="el-button el-button--default"><span>{{formatStatues(arr.status)}}</span></button></div>
    </div>
</template>
<script>
	export default{
		data(){
			return{
				linkId:'',
				arr:[],
				//链接详情
                apiUrl3:'api/filter/link/queryLinkInfo.json',
                //修改链接状态
                apiUrl2:'api/filter/link/editStatus.json',
              
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
				vm.linkId=vm.$route.query.linkId
				 vm.$http.post(vm.apiUrl3,{linkId:vm.linkId},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            console.log(response.data)
                           vm.arr=response.data.obj
                           console.log(111)
                           console.log(vm.arr)
                            console.log(111)
                        }else{
                            console.log(response.data.error)
                        }
                    })
			},formatStatues:function(row){
        		return row==3?'确定':'下架';
        	},formatside:function(row){
        		return row==1?'App':row==2?'Wechat':'PC';
        	},formatlinkType:function(row){
        		return row==1?'首页banner条':row==2?'首页弹框':'';
        	},formatMethod:function(row){
        		return row==1?'html5跳转':row==2?'内部跳转':'不跳转';
        	},format(t) {
                if(t==null){
                    return '未设置'
                }else{
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
        	
    		},formatStatus:function(row){
        		return row==1?'已发布':row==2?'已上线':row==3?'已下线':'未发布';
        	},sheif:function(){
                var vm=this;
                vm.arr.img=''
                
                 vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       if(vm.arr.status!==3){
                     vm.$http.post(vm.apiUrl2,{linkId:vm.linkId,status:3},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.$router.push('/LinkManagement')
                            
                        }else{
                            alert(response.data.error)
                        }
                    })
                }else{
                    vm.$router.push('/LinkManagement')
                }
                    }).catch(() => {
                      
                    });
                
               
            },
			 //提交进件
        
			
		}
		
		
	}
</script>