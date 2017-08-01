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
             <div class="title"><h4>名称　　　　　</h4><input type="text" v-model="editForm.name"></div>
             <div class="title"><h4>总数　　　　　</h4><input type="text" v-model="editForm.totalNumber"></div>
             <div class="title"><h4>中奖权重　　　</h4><input type="text" v-model="editForm.weight"></div>
             
             <div class="title"><h4>奖品简介　　　</h4><textarea v-model="editForm.synopsis"></textarea></div>
             <div class="title"><h4>奖品说明　　　</h4><textarea v-model="editForm.context"></textarea></div>
             <h4>抽奖图　　　　</h4>
           <el-upload
            class="avatar-uploader"
            action="api/common/upload/image.do"
            :show-file-list="false"
            :on-success="handleAvatarScucess1"
            :before-upload="beforeAvatarUpload1">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br>
          <h4>详情图　　　　</h4>
                <el-upload
                  action="api/common/upload/image.do"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleAvatarScucess0"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              <div class="btn"> 
            <button  @click="addscartsaves" type="button" class="el-button el-button--default"><span>仅保存</span></button>
            <button  @click="addscartpull" type="button" class="el-button el-button--default"><span>上架</span></button>
            </div>
         </div>
</template>
<script>
	export default{
		data(){
			return{value: '',
				options: [{
		          value: 1,
		          label: '实物'
		        }, {
		          value: 2,
		          label: '虚拟物品'
		        }],
		        editForm: {
              type:'',
              name: '',
              totalNumber:'',
              number: 0,
              surplusNumber: '',
              weight: '',
              isShow: '',
              synopsis: '',
              context: '',
              awardImg: '',
              detailsList: '',
            },
            imageUrl1: '',
            dialogVisible: false,
            dialogImageUrl: '',
            arrs:[],
            imageUrl1:'',
            userId:'',
            //添加刮刮奖奖品
	 		 apiUrl2:'api/filter/prizeManage/add.json',

		    }
				

		},
		created: function() {
		 	var vm=this
		 	vm.getCustomer()
             
        },
		methods:{
			getCustomer:function(){
				var vm=this;
            vm.$http.post('api/common/userInfo.json',{emulateJSON:true})
                    .then((response) => {
                        if(response){
                          vm.userId=response.data.obj.userId
                        }else{
                            console.log(error)
                        }
                    })
			},handleAvatarScucess1(res, file) {
              var vm=this;
            vm.imageUrl1 = URL.createObjectURL(file.raw);
            vm.imageUrl1 = file.response.url;
          },beforeAvatarUpload1(file) {

          },handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
      }, addscartsaves:function(){
               var vm=this
               if(vm.arrs!=='[]'){
                var aaa=vm.arrs.join(',')
               vm.arrs=aaa
	             }else{
	              vm.arrs=[]
	             }
              var addscartsave={
                sender:vm.userId,
                type:vm.value,
                totalNumber:vm.editForm.totalNumber,
                weight:vm.editForm.weight,
                isShow:0,
                name:vm.editForm.name,
                awardImg:vm.imageUrl1,
                detailsList:vm.arrs,
                synopsis:vm.editForm.synopsis,
                context:vm.editForm.context
               
              }
               vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       vm.$http.post(vm.apiUrl2,addscartsave,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.isShow=''
                            vm.editForm={}
                            vm.imageUrl1=''
                            vm.value=''
                            this.$refs.upload.clearFiles();
                            vm.handleRemove()
                            vm.getCustomers()
                             vm.$router.push('/ScratchPrizes')
                        }else{
                            alert(response.data.error)

                        }
                    })
                    }).catch(() => {
                      
                    });
               
              

            },
            handleAvatarScucess0(res, file) {
            var vm=this;
            vm.imageUrl0 = URL.createObjectURL(file.raw);
            vm.imageUrl0 = file.response.url;
            vm.arrs.push(vm.imageUrl0)
          },handleRemove(file, fileList) {
		        console.log(file, fileList);

		    },
		    addscartpull:function(){
              var vm=this
               console.log(vm.arrs)
               if(vm.arrs!=='[]'){
                var aaa=vm.arrs.join(',')
	               vm.arrs=aaa
	             }else{
	              vm.arrs=[]
	             }
               vm.arrs=vm.arrs.join(',')
              var addscartsave={
                sender:vm.userId,
                type:vm.value,
                totalNumber:vm.editForm.totalNumber,
                weight:vm.editForm.weight,
                isShow:1,
                name:vm.editForm.name,
                awardImg:vm.imageUrl1,
                detailsList:vm.arrs,
                synopsis:vm.editForm.synopsis,
                context:vm.editForm.context
               
              }
               vm.$confirm('确认提交？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       vm.$http.post(vm.apiUrl2,addscartsave,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                              vm.isShow=''
                            vm.editForm={}
                            vm.imageUrl1=''
                            vm.value=''
                            this.$refs.upload.clearFiles();
                            vm.handleRemove()
                            vm.getCustomers()
                            vm.$router.push('/ScratchPrizes')
                        }else{
                            alert(response.data.error)
                        }
                    })
             
                    }).catch(() => {
                      
                    });
              

            },
			 //提交进件
       
        },
			
		
		
		
	}
</script>