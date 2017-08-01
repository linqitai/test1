<template>
	 <div style="margin-left: 20px;">
        <h1>收银台信息</h1>
            <div class="title"><h4>申请人类型　　　　</h4><span>{{detailmegs.sort}}</span></div>
            <div class="title"><h4>收银台　　　　　　</h4><span>{{detailmegs.cashType}}</span></div>
            <div class="title"><h4>申请时间　　　　　</h4><span>{{detailmegs.created}}</span></div>
            <div class="title"><h4>使用状态　　　　　</h4><span>{{detailmegs.status}}</span></div>
        <h1>店铺信息</h1>
            <div class="title"><h4>店铺名称　　　　　</h4><span>{{detailmegs.shopName}}</span></div>
            <div class="title"><h4>店铺地址　　　　　</h4><span>{{detailmegs.province}}{{detailmegs.city}}{{detailmegs.area}}{{detailmegs.address}}</span></div>
            <div class="title"><h4>店铺电话　　　　　</h4><span>{{detailmegs.servTel}}</span></div>
            <div class="title"><h4>经营类型　　　　　</h4><span>{{detailmegs.operateType}}</span></div>
        <h1>法人信息</h1>
            <div class="title"><h4>法人姓名　　　　　</h4><span>{{detailmegs.linkName}}</span></div>
            <div class="title"><h4>身份证号　　　　　</h4><span>{{detailmegs.cardNum}}</span></div>
            <div class="title"><h4>手机号码　　　　　</h4><span>{{detailmegs.linkPhone}}</span></div>
        <h1>银行卡</h1>
            <div class="title"><h4>开户人　　　　　　</h4><span>{{detailmegs.linkName}}</span></div>
            <div class="title"><h4>开户行　　　　　　</h4><span>{{detailmegs.openBank}}</span></div>
            <div class="title"><h4>卡号　　　　　　　</h4><span>{{detailmegs.bankCard}}</span></div>
        <h1>相关照片</h1>
          　<div class="title"><h4>营业执照　　　　　</h4><img :src="detailmegs.imageList[0].path" v-if="detailmegs.imageList" style="width: 220px;height: 178px;"></div>
          　<div class="title"><h4>身份证正面　　　　</h4><img :src="detailmegs.imageList[1].path" v-if="detailmegs.imageList" style="width: 220px;height: 178px;"></div>
          　<div class="title"><h4>身份证反面　　　　</h4><img :src="detailmegs.imageList[2].path" v-if="detailmegs.imageList" style="width: 220px;height: 178px;"></div>
          　<div class="title"><h4>半身照　　　　　　</h4><img :src="detailmegs.imageList[3].path" v-if="detailmegs.imageList" style="width: 220px;height: 178px;"></div>
          　<div class="btn"> <button  @click="rbackbtn" type="button" class="el-button el-button--default"><span>确定</span></button></div>
    </div>
</template>
<script>
	export default{
		data(){
			return{
				detailmegs:[],
				apiUrl7:'api/filter/customer/detail.json',
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
				vm.$http.post(vm.apiUrl7,{shopId:vm.shopId},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.detailmegs=response.data.obj
                            console.log(response.data)
                            console.log(vm.pageSize)
                           
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
				
			},rbackbtn:function(){
                var vm=this;
                 vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$router.push('/CustomerManagement')
                  
                    }).catch(() => {
                      
                    });
				
			 
			}
       
			
		}
		
		
	}
</script>
<style>
	[v-cloak]{
    display: none;
}
</style>