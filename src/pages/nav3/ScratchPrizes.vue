<template>
  <div style="margin-left: 20px;">
       <div v-show="scartpageshow">
            <div>
            <div class="title">
            <h4>状态　　</h4>
            <ul class="nav" :class="[current]">
                <li class="aaaa" @click="changeg('aaaa')">全部</li>
                <li class="aaab" @click="changeg('aaab')">未上架</li>
                <li class="aaac" @click="changeg('aaac')">已上架</li>
                <li class="aaad" @click="changeg('aaad')">已下架</li>
            </ul>
        </div> <br>
        <div class="title">
            <h4>类型　　</h4>
            <ul class="nav" :class="[currents]">
                <li class="aaae" @click="changesgs('aaae')">全部</li>
                <li class="aaaf" @click="changesgs('aaaf')">实物</li>
                <li class="aaag" @click="changesgs('aaag')">虚拟物品</li>
            </ul>
        </div> <br>
      <div class="title"><h4>奖品名称　　　</h4><input type="text"  v-model="serch"></div>
      <div class="title"><h4>剩余数量　　　</h4><input type="text"  v-model="serchb">
      <span> 至 </span><input type="text"  v-model="serchbs"></div>
   
        <button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
         <router-link :to="{ name: 'ScratchPrizesadd'}"><button  type="button" class="el-button el-button--default" style="float:right;margin-right:330px;"><span>新增</span></button></router-link>
       <!--  <button  @click="addprize" type="button" class="el-button el-button--default" style="float: right;margin-right: 10%;"><span>新增奖品</span></button> -->
        <br>
        <table v-show="listpage">
            <thead>
                <tr>
                    <th>奖品名称</th>
                    <th>类型</th>
                    <th>中奖权重</th>
                    <th>总数(份)</th>
                    <th>已中数量(份)</th>
                    <th>剩余数量(份)</th>
                    <th>已中人数(人)</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
               <tr v-if="megs" v-for="(info,index) in megs">
                            <td>{{info.name}}</td>
                            <td>{{formatType(info.type)}}</td>
                            <td>{{info.weight}}</td>
                            <td>{{info.totalNumber}}</td>
                            <td>{{info.number}}</td>
                            <td>{{info.surplusNumber}}</td>
                            <td>{{info.peopleNumber}}</td>
                            <td>{{formatIsShow(info.isShow)}}</td>
                            <td><el-button @click="shelves(index)" type="text">{{formatIsShows(info.isShow)}}</el-button><el-button @click="dialogShow(index)" type="text">编辑</el-button></td>

                        </tr>
            </thead>
        </table>
        <h1 v-show="!listpage" style="text-align:center">暂无数据......</h1>
        </div>
        
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
        
          
  </div>
</template>
<script>
  export default{
     data () {
          return {
      //刮刮卡奖品管理
       apiUrl1:'api/filter/prizeManage/view.json',
       
       //刮刮卡奖品修改页面详情展示
       apiUrl3:'api/filter/prizeManage/editDetails.json',
       //修改刮刮卡商品上下架、仅保存等状态
       apiUrl5:'api/filter/prizeManage/changeShow.json',
       apiUrl4:'api/filter/prizeManage/edit.json',
       scartpageshow:true,
       scratdetail:false,
       scratadd:false,
       listpage:true,
       
        imageUrl0: '',
        imgpath:[],
        options: [{
          value: 1,
          label: '实物'
        }, {
          value: 2,
          label: '虚拟物品'
        }],
        value: '',
       /* options1: [{
          value1: 0,
          label1: '未上架'
        }, {
          value1: 1,
          label1: '已下架'
        }, {
          value1: 2,
          label1: '已上架'
        }],
        value1: '',*/
       megs:[],
             current:'aaaa',
             currents:'aaae',
             serch:'',
             prizeId:'',
             serchb:'',
             serchbs:'',
             isShow:'',
             prizeId:'',
             
             imageUrl: '',
              pageIndex: 1,
             pageSize: 10,
             total: 1,
             userId:'',
             type: '',
             dailogTitle:'',
             showPageTag:false,
             
             saveDisabled: false,
             arr:'',
             scratedit:false,
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
             currentData: {
             prizeId:'',
             type:'',
             name: '',
             totalNumber: '',
             weight: '',
             synopsis:'',
             context:'',
             awardImg:'',
             detailsList:''
              },
            a:''
        }
           
      },
        created: function() {
            this.getCustomers()  
        },
        /*watch: {
        dialogVisible: function () {
          if(!this.dialogVisible){
              setTimeout(function () {
               this.$refs.ruleForm.resetFields();
            }.bind(this), 500);
          }
        }

        
        },*/
        
        methods: {
          asd:function(a){
            this.a=a
            
          },
            formatIsShow:function(row){
                
                return row==0?'未上架':row==1?'已上架':'已下架';
            },formatIsShows:function(row){
                
                return row==1?'下架':row==2?'上架':'上架';
            },
            formatType:function(row){
                
                return row==1?'虚拟物品':row==2?'实物':'未中奖';
            },
             
          /*,beforeAvatarUpload3(file) {

          },beforeAvatarUpload4(file) {
          },beforeAvatarUpload5(file) {
          }*/
            changeg:function(cur){
              this.current=cur
                var vm = this;
                if(cur=='aaab'){
                   vm.isShow=0
                    var scash={
                       type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }if(cur=='aaac'){
                  vm.isShow=1
                    var scash={
                        type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }if(cur=='aaad'){
                  vm.isShow=2
                   var scash={
                       type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }if(cur=='aaaa'){
                  vm.isShow=''
                   var scash={
                       type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }
                    vm.$http.post(vm.apiUrl1,scash,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.obj
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
                            console.log('数据请求失败')
                        }
                    })   
            },
            changesgs:function(cur){
                this.currents=cur
                 var vm = this
                if(cur=='aaaf'){
                  vm.type=2
                    var scash={
                       type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }if(cur=='aaag'){
                  vm.type=1
                    var scash={
                        type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }if(cur=='aaae'){
                  vm.type=''
                   var scash={
                       type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                    }
                }
                    vm.$http.post(vm.apiUrl1,scash,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.obj
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
                            console('数据请求失败')
                        }
                    })   
              
            },
            getCustomers: function() {
                var vm = this
                var parameterData={
                    type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                };
               
                    vm.$http.post(vm.apiUrl1,parameterData,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                        vm.megs=response.data.obj
                          vm.total=response.data.count
                          if(vm.total<=vm.pageSize){
                            vm.showPageTag=false;
                          }else{
                            vm.showPageTag=true;
                          }
                      }else{
                        console('数据请求失败')
                      }
                    })

            },
           /* accountInfo(index){
              var vm=this;
              vm.currentData.prizeId=index;
              var parameterData={
                prizeId:vm.currentData.prizeId
              };
               vm.$http.post(vm.apiUrl3,parameterData,{emulateJSON:true})
                    .then((res) => {
                        if(res.data.code==0){
                          console.log(res.data.obj)
                        vm.currentData.type=res.data.obj.type;
                        vm.currentData.totalNumber=res.data.obj.totalNumber;
                        vm.currentData.weight=res.data.obj.weight;
                        vm.currentData.synopsis=res.data.obj.synopsis;
                        vm.currentData.awardImg=res.data.obj.awardImg;
                        vm.currentData.detailsList=res.data.obj.detailsList;
  
                      }else{
                        console.log('数据请求失败')
                      }
                    })
            },*/
           
            shelves:function(index){
                var vm=this;
                if(vm.megs[index].isShow==1){
                  var d=2;
                }else{
                  var d=1
                }
            vm.$http.post(vm.apiUrl5,{isShow:d,prizeId:vm.megs[index].prizeId},{emulateJSON:true})
                .then((response) => {
                    if(response.data.code===0){
                       
                    }else{
                      
                    }
                })
                setTimeout(function(){vm.getCustomers()},100) 
            },
            dialogShow(i){
                var vm=this;
                vm.isShow=vm.megs[i].isShow
                vm.prizeId=vm.megs[i].prizeId
                if(vm.isShow==1){
                   vm.$router.push('/ScratchPrizes/ScratchPrizesaeidtpull?&prizeId='+vm.prizeId)
                }else{
                vm.$router.push('/ScratchPrizes/ScratchPrizesaeidt?&prizeId='+vm.prizeId)
              
                  }
                 
                
            },
            pull:function(){
              var vm=this
              vm.scartpageshow=false
                vm.scratdetail=false
                vm.scratedit=true
                vm.$http.post(vm.apiUrl5,{isShow:2,prizeId:vm.prizeId},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                        }else{
                          
                        }
                    })
            },
            scartpulled:function(){
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
             vm.$http.post(vm.apiUrl4,scartsave,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                        }else{
                          
                        }
                    })
              vm.scartpageshow=true
              vm.scratedit=false
              vm.scratdetail=false
              vm.getCustomers()
            },
            /*scartsavese:function(){
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
              }
             vm.$http.post(vm.apiUrl4,scartsave,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                        }else{
                          
                        }
                    })
              vm.scartpageshow=true
              vm.scratedit=false
              vm.scratdetail=false
              vm.getCustomers()
            },*/
           
           
            handleSizeChange(val) {
                
            console.log(`每页 ${val} 条`);
          },
           handleCurrentChange(val) {

                this.pageIndex= val;
                this.getCustomers();
                console.log(`当前页: ${val}`);
          },
           /*handleSubmit(ev) {
        var vm = this;
        // vm.saveDisabled = true;
        //防止重复点击，设置disabled
        vm.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(vm.saveDisabled) {
              return;
            }
            vm.saveDisabled = true;
            if(vm.dailogTitle=="新增账号") {
              vm.accountAdd();
            } else {
              vm.accountEdit();
            }
          } else {
            // vm.saveDisabled = false;
            return false;
          }
        });
            },
           */
            addd:function(){
              var vm = this
                var inpt={
                    /*sender:*/
                    type:vm.type,
                    isShow:vm.isShow,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name : vm.serch,
                    minNumber:vm.serchb,
                    maxNumber:vm.serchbs
                };
                vm.$http.post(vm.apiUrl1,inpt,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.obj
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
                            console('数据请求失败')
                        }
                    })
            },
            

      

        },

  }
</script>
<style>
    .nav li{
        cursor: pointer;
        width: 70px;
        height: 25px;
        text-align: center;
        line-height: 25px;
    }
    .aaaa .aaaa,.aaab .aaab,.aaac .aaac,.aaad .aaad,
    .aaae .aaae,.aaaf .aaaf,.aaag .aaag{
        background: #81C9ED;
        color: white;
    }
    textarea{
      width: 50%;
      height: 150px;
    }
    .upload{
      display: inline-block;
      margin-left: 15px;
    }
  .awaimg{
    width: 200px;
    height: 175px;
    border: 1px dotted #ccc;
    margin-right: 5px;
  }
</style>