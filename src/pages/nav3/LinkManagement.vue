<template>
    
    <div style="margin-left: 20px;">
        <div v-show="mainpage">
        <div class="title">
        <h4>状态　　</h4>
            <ul class="nav" v-bind:class="[linkstatus]">
                <li class="linkall" @click="linkclick('linkall')">全部</li>
                <li class="linkunreleaes" @click="linkclick('linkunreleaes')">未发布</li>
                <li class="linkrelease" @click="linkclick('linkrelease')">已发布</li>
                <li class="linkonline" @click="linkclick('linkonline')">已上线</li>
                <li class="linkunline" @click="linkclick('linkunline')">已下线</li>
                
            </ul>
        </div> <br><div class="title">
        <h4>所在端　</h4>
            <ul class="nav" v-bind:class="[linkbelong]">
                <li class="linkevery" @click="linkbelongs('linkevery')">全部</li>
                <li class="linkapp" @click="linkbelongs('linkapp')">App</li>
                <li class="linkpc" @click="linkbelongs('linkpc')">PC</li>
                <li class="linkwc" @click="linkbelongs('linkwc')">Wechat </li>
            </ul>
        </div> <br><div class="title">
        <h4>所在位置</h4>
            <ul class="nav" v-bind:class="[linkstade]">
                <li class="linkmost" @click="linkside('linkmost')">全部</li>
                <li class="linkbanner" @click="linkside('linkbanner')">首页banner</li>
                <li class="linkbox" @click="linkside('linkbox')">首页弹框</li>
            </ul>
        </div> <br>
        <br>
        <button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
        <!--  <button  @click="addnews" type="button" class="el-button el-button--default" style="float:right;margin-right:30px;"><span>新增</span></button> -->
        <router-link :to="{ name: 'LinkManagementadd'}"><button  type="button" class="el-button el-button--default" style="float:right;margin-right:330px;"><span>新增</span></button></router-link>
        <table v-show="listpage">
            <thead>
                <tr>
                   <th>名称</th>
                   <th>所在端</th>
                   <th>所在位置</th>
                   <th>链接方式</th>
                   <th>链接地址</th>
                   <th>图片</th>
                   <th>顺序</th>
                   <th>状态</th>
                   <th>操作时间</th>
                   <th>操作</th>
                </tr>
             <tr v-if="megs" v-for="(info,index) in megs">
                  <td>{{info.name}}</td>
                  <td>{{formatside(info.side)}}</td>
                  <td>{{formatlinkType(info.linkType)}}</td>
                  <td>{{formatMethod(info.linkMethod)}}</td>
                  <td align="center"><a :href="info.linkAddr" target="_blank" class="aaa8">{{info.linkAddr}}</a></td>
                  <td><el-button @click="picture(index)" type="text">图片</el-button></td>
                  <td>{{info.order}}</td>
                  <td>{{formatStatus(info.status)}}</td>
                  <td>{{format(info.updated)}}</td>
                  <td><el-button @click="receivestatu(index)" type="text">{{formatStatu(info.status)}}</el-button><el-button @click="order(index)" type="text">调整顺序</el-button><el-button @click="receivedetail(index)" type="text">详情</el-button></td>
              </tr>
            </thead>
         
        </table>
        <h1 v-show="!listpage" style="text-align:center">暂无数据......</h1>
        <div v-cloak class="block" v-show="showPageTag">        
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
    
    <!-- <div v-show="detailpage">
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
    </div> -->
    <el-dialog  v-model="editFormVisible" :close-on-click-modal="false">
    <div ><h4>序号　　　　　</h4>
               <br><el-input auto-complete="off" v-model="orderval"></el-input></div>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" >提交</el-button>
            </div>
        </el-dialog><el-dialog  v-model="editFormVisible1" :close-on-click-modal="false">
    <div ><h4>图片展示　　　　　</h4>
               <br><img :src="img" v-if="img" style="width:200px;height:200px;"></div>
          
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSubmit1" >确定</el-button>
            </div>
        </el-dialog>
    <el-button v-if="addpage||detailpage"type="text" class="rback"@click="rbackbtn">返回</el-button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                //链接管理
                apiUrl:'api/filter/link/view.json',
                
                //修改链接状态
                apiUrl2:'api/filter/link/editStatus.json',
                
                //修改链接顺序
                apiUrl4:'api/filter/link/editOrder.json',
                linkstatus:'linkall',
                linkbelong:'linkevery',
                linkstade:'linkmost',
                megs:[],
                orderval:'',
                pageIndex: 1,
                pageSize: 10,
                total: 1,
                showPageTag:false,
                detailpage:false,
                listpage:true,
                
                
                timer:true,
                timers:true,
                addpage:false,
                editFormVisible:false,
                editFormVisible1:false,
                mainpage:true,
                side:'',
                status:'',
                linkType:'',
                linkId:'',
                img:'',
                 
                    value: '',
                 
                    
                    value3: '',
                    value4: '',
                   
                    
                    imageUrl1: '',
                    nameval: '',
                    linkaddr: '',
                    issueType: '',
                    arr: [],
            }
        },
        created: function() {
            this.getCustomers() 
        },
        methods:{
            formatStatu:function(row){
                return row==2?'下线':row==0?'发布':row==1?'上线':'';
            },formatStatues:function(row){
                return row==3?'确定':'下架';
            },
            formatStatus:function(row){
                return row==1?'已发布':row==2?'已上线':row==3?'已下线':'未发布';
            },formatMethod:function(row){
                return row==1?'html5跳转':row==2?'内部跳转':'不跳转';
            },formatside:function(row){
                return row==1?'App':row==2?'Wechat':'PC';
            },formatlinkType:function(row){
                return row==1?'首页banner条':row==2?'首页弹框':'';
            },
            linkclick:function(cur){
                var vm=this;
                vm.linkstatus=cur
                if(cur=='linkall'){
                    vm.status=''
                     var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                        
                    }
                }if(cur=='linkrelease'){
                    vm.status=1
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkunreleaes'){
                    vm.status=0
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkonline'){
                    vm.status=2
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkunline'){
                    vm.status=3
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }
                 vm.$http.post(vm.apiUrl,linkcont,{emulateJSON:true})
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
                            console.log(error)
                        }
                    })
            },
            linkbelongs:function(cur){
                var vm=this;
                vm.linkbelong=cur
                if(cur=='linkevery'){
                    vm.side=''
                     var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkapp'){
                    vm.side=1
                    var linkcont={
                       pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkpc'){
                    vm.side=3
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkwc'){
                    vm.side=2
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }
                 vm.$http.post(vm.apiUrl,linkcont,{emulateJSON:true})
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
                            console.log(error)
                        }
                    })
            },
            linkside:function(cur){
                var vm=this;
                vm.linkstade=cur
                if(cur=='linkmost'){
                    vm.linkType=''
                     var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkbanner'){
                    vm.linkType=1
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }if(cur=='linkbox'){
                    vm.linkType=2
                    var linkcont={
                        pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status
                    }
                }
                 vm.$http.post(vm.apiUrl,linkcont,{emulateJSON:true})
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
                            console.log(error)
                        }
                    })
            },
             rbackbtn:function(){
              var vm=this;
              vm.mainpage=true
              vm.addpage=false
              vm.detailpage=false
            },
            getCustomers: function() {
                var vm = this
                var parameterData={
                     pageIndex: vm.pageIndex,
                        pageSize: vm.pageSize,
                        linkType:vm.linkType,
                        side:vm.side,
                        status:vm.status

                };
                vm.$http.post(vm.apiUrl,parameterData,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.megs=response.data.obj
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
            },
            picture:function(index){
                this.img=this.megs[index].img
                this.editFormVisible1=true

            },editSubmit1:function(){
                this.img=''
                this.editFormVisible1=false
            },
            addd:function(){
                var vm=this
            var allmeg={
                   pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkType:vm.linkType,
                    side:vm.side,
                    status:vm.status
                };

                vm.$http.post(vm.apiUrl,allmeg,{emulateJSON:true})
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
            receivestatu:function(index){
                var vm=this;
                if(vm.megs[index].status==1){
                  var d=2;
                }if(vm.megs[index].status==2){
                    var d=3
                }if(vm.megs[index].status==0){
                    var d=2
                }
                vm.$confirm('是否下线', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      
                        vm.$http.post(vm.apiUrl2,{status:d,linkId:vm.megs[index].linkId},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           setTimeout(function(){vm.getCustomers()},100)
                        }else{
                          
                        }
                    })
                 
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
                 
           
            },receivedetail:function(index){
                var vm=this;
                vm.linkId=vm.megs[index].linkId
                vm.$router.push('/LinkManagement/LinkManagementeidt?&linkId='+vm.linkId)
                
                

            },sheif:function(){
                var vm=this;
                vm.mainpage=true
                vm.detailpage=false
                if(vm.arr.status!==3){
                     vm.$http.post(vm.apiUrl2,{linkId:vm.linkId,status:3},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                            
                        }else{
                            console.log(response.data.error)
                        }
                    })
                }
               
            },
            order:function(index){
                var vm=this;
                vm.editFormVisible=true
                vm.linkId=vm.megs[index].linkId
              
            },editSubmit:function(){
                var vm=this;
                  vm.$http.post(vm.apiUrl4,{linkId:vm.linkId,order:vm.orderval},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                            
                        }else{
                            console.log(response.data.error)
                        }
                    })
                vm.editFormVisible=false
                vm.orderval=''
                 setTimeout(function(){vm.getCustomers()},100)
            },
           
            handleSizeChange(val) {     
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
<style>
    h4{
        line-height: 25px;
    }
    .nav li{
    cursor: pointer;
    width: 85px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    overflow: hidden;
}
.linkall .linkall,.linkrelease .linkrelease,.linkunreleaes .linkunreleaes,
.linkevery .linkevery,.linkapp .linkapp,.linkpc .linkpc,.linkwc .linkwc,
.linkmost .linkmost,.linkbanner .linkbanner,.linkbox .linkbox,.linkonline .linkonline
,.linkunline .linkunline{
    background: #81C9ED;
    color: white;
}
.img{
    width:200px;
    height: 175px;
}
.aaa8{
    display: block;
    width: 120px;
    overflow: hidden;
    height: 20px;
}
</style>