<template>
	<div style="margin-left: 20px;">
             <div class="title"><h4>奖品类别　　　</h4> 
             <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select></div>
             <div class="title"><h4>名称　　　　　</h4><input type="text" v-model="arr.name"></div>
             <div class="title"><h4>总数　　　　　</h4><input type="text" v-model="arr.totalNumber"></div>
             <div class="title"><h4>已兑数量　　　</h4><input type="text" v-model="arr.number"></div>
             <div class="title"><h4>剩余数量　　　</h4><input type="text" v-model="arr.surplusNumber"></div>
             <div class="title"><h4>中奖权重　　　</h4><input type="text" v-model="arr.weight"></div>
             <div class="title"><h4>奖品简介　　　</h4><textarea v-model="arr.synopsis"></textarea></div>
             <div class="title"><h4>奖品说明　　　</h4><textarea v-model="arr.context"></textarea></div>
             <div class="title"><h4>抽奖图　　　</h4>
               <el-upload
              class="avatar-uploader upload"
              action="api/common/upload/image.do"
              :show-file-list="false"
              :on-success="handleAvatarScucess1"
              :before-upload="beforeAvatarUpload1">
              <img v-if="arr.awardImg" :src="arr.awardImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
             </div>
             <div class="title"><h4>详情图　　　</h4>
             <el-upload
             v-for="(lg,index) in detailsLists"
              class="avatar-uploader upload"
              action="api/common/upload/image.do"
              :show-file-list="false"
              :on-success="handleAvatarScucess"
              :before-upload="beforeAvatarUpload">
              <img v-if="lg" :src="lg" class="avatar" @click="asd(index)">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
             </div>
              <div class="btn"> 
            <button  @click="scartsavese" type="button" class="el-button el-button--default"><span>仅保存</span></button>
            <button  @click="scartpulled" type="button" class="el-button el-button--default"><span>上架</span></button>
            </div>
         </div>
</template>
<script>
	export default{
		data(){
			return{
				//刮刮卡奖品修改页面详情展示
		       apiUrl3:'api/filter/prizeManage/editDetails.json',
		       apiUrl4:'api/filter/prizeManage/edit.json',
		       value:'',
		       options: [{
		          value: 1,
		          label: '实物'
		        }, {
		          value: 2,
		          label: '虚拟物品'
		        }],
		        arr:'',
		        detailsLists:[],
		        imgpath:[],
		        imageUrl1:'',
		        imageUrl:'',
              
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
				
			},
			handleAvatarScucess1(res, file) {
              var vm=this;
	            vm.imageUrl1 = URL.createObjectURL(file.raw);
	            vm.imageUrl1 = file.response.url;
	            vm.arr.awardImg=vm.imageUrl1
	          },
	          beforeAvatarUpload1(file) {

          }, scartsavese:function(){
              var vm=this;
              var cc=vm.detailsLists.join(',')
              var scartsave={
                type:vm.value,
                name:vm.arr.name,
                number:vm.arr.number,
                surplusNumber:vm.arr.surplusNumber,
                isShow:0,
                synopsis:vm.arr.synopsis,
                context:vm.arr.context,
                prizeId:vm.prizeId,
                totalNumber:vm.arr.totalNumber,
                awardImg:vm.arr.awardImg,
                detailsList:cc
              };
              vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       vm.$http.post(vm.apiUrl4,scartsave,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                          vm.isShow=''

                            vm.$router.push('/ScratchPrizes')
                        }else{
                          alert(response.data.error)
                        }
                    })
             
                    }).catch(() => {
                      
                    });
             
              
            },scartpulled:function(){
             var vm=this;
              var cc=vm.detailsLists.join(',')
              var scartsave={
                type:vm.value,
                name:vm.arr.name,
                number:vm.arr.number,
                surplusNumber:vm.arr.surplusNumber,
                isShow:1,
                synopsis:vm.arr.synopsis,
                context:vm.arr.context,
                prizeId:vm.prizeId,
                totalNumber:vm.arr.totalNumber,
                awardImg:vm.arr.awardImg,
                detailsList:cc
              }
              vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      vm.$http.post(vm.apiUrl4,scartsave,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.isShow=''
                            vm.$router.push('/ScratchPrizes')
                        }else{
                          alert(response.data.error)
                        }
                    })
             
                    }).catch(() => {
                      
                    });
             
             
              
            },handleAvatarScucess(res, file) {
            var vm=this;
            vm.imageUrl = URL.createObjectURL(file.raw);
            vm.imageUrl = file.response.url;
            vm.detailsLists.splice(vm.a,1,vm.imageUrl)
            vm.imgpath.push(vm.imageUrl)

          },beforeAvatarUpload(file) {
            
          },asd:function(a){
            this.a=a
            
          }
			
        
			
		}
		
		
	}
</script>