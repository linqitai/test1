<template>
	<div>
             <div class="title"><h4>奖品类别　　　</h4><span>{{formatType(arr.type)}}</span></div>
             <div class="title"><h4>名称　　　　　</h4><span>{{arr.name}}</span></div>
             <div class="title"><h4>总数　　　　　</h4><span>{{arr.totalNumber}}</span></div>
             <div class="title"><h4>已兑数量　　　</h4><span>{{arr.number}}</span></div>
             <div class="title"><h4>剩余数量　　　</h4><span>{{arr.surplusNumber}}</span></div>
             <div class="title"><h4>中奖权重　　　</h4><span>{{arr.weight}}</span></div>
             <div class="title"><h4>状态　　　　　</h4><span>{{formatIsShow(arr.isShow)}}</span></div>
             <div class="title"><h4>奖品简介　　　</h4><span>{{arr.synopsis}}</span></div>
             <div class="title"><h4>奖品说明　　　</h4><span>{{arr.context}}</span></div>
             <div class="title"><h4>抽奖图　　　</h4><img :src="arr.awardImg" class="awaimg" v-if="arr.awardImg"></div>
             <div class="title"><h4>详情图　　　</h4><img :src="lg" class="awaimg" v-if="lg"v-for="lg in detailsLists"></div>
              <div class="btn"> 
            <button  @click="pull" type="button" class="el-button el-button--default"><span>下架</span></button>
            </div>
         </div>
</template>
<script>
	export default{
		data(){
			return{
				//刮刮卡奖品修改页面详情展示
		       apiUrl3:'api/filter/prizeManage/editDetails.json',
		       //修改刮刮卡商品上下架、仅保存等状态
       			apiUrl5:'api/filter/prizeManage/changeShow.json',
		       prizeId:'',
		       arr:[],
		       detailsLists:[],
				}
		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
				vm.prizeId=vm.$route.query.prizeId
				 var prizeId={
                    prizeId:vm.prizeId
                }
                 vm.$http.post(vm.apiUrl3,prizeId,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.arr=response.data.obj
                            vm.value=vm.arr.type
                            vm.value1=vm.arr.isShow
                            var b=vm.arr.detailsList
                            vm.detailsLists=b.split(',')
                        }else{
                            console.log(error)
                        }
                    })
				
			},formatType:function(row){
                
                return row==1?'虚拟物品':row==2?'实物':'未中奖';
            }, formatIsShow:function(row){
                
                return row==0?'未上架':row==1?'已上架':'已下架';
            }, pull:function(){
              var vm=this
               vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      vm.$http.post(vm.apiUrl5,{isShow:2,prizeId:vm.prizeId},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           vm.$router.push('/ScratchPrizes')
                        }else{
                          alert(response.data.error)
                        }
                    })
             
                    }).catch(() => {
                      
                    });
                
            },
			 //提交进件
       
			
		}
		
		
	}
</script>