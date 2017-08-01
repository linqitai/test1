<template>


    <div style="margin-left: 20px;">
           <div class="title">
               <h4>审核状态　　　</h4>
                <ul class="nav" :class="[c]">
                  <li class="aaa" @click="change3('aaa')">全部5</li>
                  <li class="bbb" @click="change3('bbb')">未审核</li>
                  <li class="ccc" @click="change3('ccc')">审核通过</li>
                  <li class="ddd" @click="change3('ddd')">审核驳回</li>
                  <li class="aa1" @click="change3('aa1')">进件中</li>
                  <li class="aa2" @click="change3('aa2')">进件完成</li>
                  <li class="aa3" @click="change3('aa3')">未绑定支付通道</li>
                  <li class="aa4" @click="change3('aa4')">已绑定支付通道</li>
                  <li class="aa5" @click="change3('aa5')">黑名单</li>
               </ul>
           </div>
            <br>
           <div class="title">   
              <h4>申请人类型　　</h4>
                <ul class="nav" :class="[d]">
                    <li class="eee" @click="changes4('eee')">全部</li>
                    <li class="fff" @click="changes4('fff')">臻e盾商户</li>
                    <li class="ggg" @click="changes4('ggg')">普通用户</li>
                </ul>
            </div> <br>
            <div class="title">
                 <h4>收银台　　　　</h4>
                <ul class="nav" v-cloak :class="[e]">
                    <li class="hhh" @click="changess5('hhh')">全部</li>
                    <li class="iii" @click="changess5('iii')">民生银行</li>
                    <li class="jjj" @click="changess5('jjj')">中信银行</li>
                    <li class="kkk" @click="changess5('kkk')">南京银行</li>
                </ul>
            </div>
            <br>
            <div class="title"><h4>申请人姓名　　　　　</h4><el-input class="inputs"v-model="serch" placeholder="请输入内容"></el-input></div>
            <div class="title"><h4>手机号码　　　　　　</h4><el-input class="inputs"v-model="tell" placeholder="请输入内容"></el-input></div>
            <div v-cloak class="title"><h4>所在区域　　　　　　</h4><address-picker :opts="obj" v-model="address"></address-picker></div>
            <div class="title" style="position: relative"><h4 style="margin-top: 8px;">申请时间　　　　　　</h4>
                <div class="block">
                <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
                </div>
                <div style="position: absolute;left: 344px;top:8px;">至</div>
                <div class="block" style="position: absolute;left: 370px;top:0px;">
                <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
                </div> 
            </div>
            <button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
            
                       <router-link :to="{ name: 'detail'}"><button  type="button" class="el-button el-button--default" style="float:right;margin-right:330px;"><span>新建申请</span></button></router-link>
            
                    
            <br>
            <table v-show="listpage" border="1">
                <thead >
                    <tr>
                        <th>申请人</th>
                        <th>手机号码</th>
                        <th>店铺地址</th>
                        <th>经营类型</th>
                        <th>申请人类型</th>
                        <th>收银台</th>
                        <th>申请时间</th>
                        <th>审核状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tr v-for="(info,index) in megs">
                    <td>{{info.linkName}}</td>
                    <td>{{info.linkPhone}}</td>
                    <td>{{info.province}}{{info.city}}{{info.area}}</td>
                    <td>{{info.operateType}}</td>
                    <td>{{formatsort(info.sort)}}</td>
                    <td>{{formatcashType(info.cashType)}}</td>
                    <td>{{format(info.created)}}</td>
                    <td>{{formatstatus(info.status)}}</td>
                    <td> <router-link :to="{ name: 'eidt',query:{index,shopId}}"><el-button @click="detail(index)" type="text">{{formateidt(info.status)}}</el-button></router-link><router-link :to="{ name: 'review',query:{index,shopId,status}}"><el-button @click="review(index)" type="text">{{formatreview(info.status)}}</el-button></router-link>
                      <el-button @click="submitall(index)" type="text">{{formatstatu(info.status)}}</el-button>
                    </td>
                      
                </tr>
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

</template>

<script>
   export default{
    data(){
      return  {
             aa:false,
             bb:false,
             listpage:true,
             addressmegs: [],
             entrymegs: [],
             value4:'',
             levalue1:'',
             cashType:'',
             sort:'',
             status:'',
             pullname:'',
             pulllicense:'',
             pulldate:'',
             pullcode:'',
             pulldefor:'',
             dialogImageUrl: '',
             dialogVisible: false,
             reviewpage: false,
             seleaddress: false,
             txnSeq: false,
             jinjian: false,
             entryshow: false,
             entrypage: false,
              options: [{
                value: 1,
                label: '持证商户'
                }, {
                  value: 0,
                  label: '非持证商户'
                }],
             arr:{
              shopName:'',
             },
             c:'aaa',
             d:'eee',
             e:'hhh',
             apiUrl:'api/filter/apply/view.json',
             apiUrl1:'api/common/upload/image.do',  
             //客户审核
             apiUrl7:'api/filter/apply/check.json',
            
             //获取对应省市区的地区代码
             apiUrl9:'api/filter/apply/getAreaCode.json',
             
              
             //获取进件信息
             apiUrl12:'api/filter/apply/intoDetail.json',
             megs:[],
             stylemeg:[],
             stylemegs:[],
             editemegs:[],
             
             index:'',
             imageUrl5: '',
             imageUrl6: '',
             imageUrl7: '',
             imageUrl8: '',
             imageId1: '',
             imageId2: '',
             imageId3: '',
             imageId4: '',
             addform:{
              addshopname: '',
              addshopaddress:{
                province:'',
                district:'',
                city:'',
              },
              adddetaladdress: '',
              addname: '',
              addidcard: '',
              addshopphone: '',
              addidname: '',
              addidbank: '',
              addidnum: '',
            },
            shopId:'',
            pageIndex: 1,
            pageSize: 10,
            total: 1,
            showPageTag:false,
            showPage:true,
            detapage:false,
            applypage:false,
            uploadimg1:false,
            uploadimg2:false,
            uploadimg3:false,
            uploadimg4:false,
            serch:'',
            tell:'',
            txnSeq:'',
            valuemobile:'',
            labelid:'',
            restaurants: [],
            
            state3: '',
            obj:{
              default:{province: '',
              city:'',
              district:''}},
            arr:'',
            editForm: {
              status: 0,
              created: '',
              sex: -1,
              age: 0,
              birth: '',
              addr: ''
            },
           
            address:{
              province:'',
              district:'',
              city:''
            },
            tell:'',
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
        },
        value1:'',
        value2:''
        }
    },
     created: function() {
            this.getCustomers() 
        },
       
        methods:{
          
          
         
         
          formatstatu:function(row){
            return (row==2||row==3||row==4)?'进件　':'';
          },formateidt:function(row){
            return (row==-1)?'':'　编辑　';
          },formatreview:function(row){
            return (row==1||row==0)?'审核　':'';
          },formatsort:function(row){
            return row==1?'普通用户':row==2?'臻e盾用户':'';
          },formatcashType:function(row){
            return row==1?'民生银行':row==2?'中信银行':row==3?'南京银行':'未知';
          },formatstatus:function(row){
            return row==-1?'黑名单':row==0?'审核驳回':row==1?'未审核':row==2?'审核通过':row==3?'进件中':row==4?'进件完成':row==5?'未绑定支付通道':row==6?'已绑定支付通道':'仅保存';
          },/*formatcity(ror){
            return row==1?'民生银行':row==2?'中信银行':'南京银行';
          },*/

             change3:function(cur){
            this.c=cur
              var vm=this
              if(cur=='aaa'){
                vm.status=''
                var scash={
                  status:vm.status,
                  sort:vm.sort,
                  cashType:vm.cashType,
                  pageIndex: vm.pageIndex,
                  pageSize: vm.pageSize,
                  linkName : vm.serch,
                  linkPhone:vm.tell,
                  province:vm.address.province,
                  city:vm.address.district,
                  area:vm.address.city,
                  _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                  _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='bbb'){
                  vm.status=1
                    var scash={
                        status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='ccc'){
                  vm.status=2
                    var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='ddd'){
                  vm.status=0
                   var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }if(cur=='aa1'){
                  vm.status=3
                   var scash={
                        status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }if(cur=='aa2'){
                  vm.status=4
                   var scash={
                      status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }if(cur=='aa3'){
                  vm.status=5
                   var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }if(cur=='aa4'){
                  vm.status=6
                   var scash={
                      status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }if(cur=='aa5'){
                  vm.status=-1
                   var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }
                    vm.$http.post(vm.apiUrl,scash,{emulateJSON:true})
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
                            console.log(error)
                        }
                    })
            },
            changes4:function(cur){
              this.d=cur
              var vm=this
              if(cur=='eee'){
                  vm.sort=''
                    var scash={
                        status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='fff'){
                  vm.sort=2
                    var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='ggg'){
                  vm.sort=1
                    var scash={
                        status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }
                    vm.$http.post(vm.apiUrl,scash,{emulateJSON:true})
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
                            console.log(error)
                        }
                    })
            },
            changess5:function(cur){
              this.e=cur
              var vm=this
              if(cur=='hhh'){
                vm.cashType=''
                    var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='iii'){
                  vm.cashType=1
                    var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='jjj'){
                  vm.cashType=2
                    var scash={
                       status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='kkk'){
                  vm.cashType=3
                   var scash={
                        status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }
            
                    vm.$http.post(vm.apiUrl,scash,{emulateJSON:true})
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
                            console.log(error)
                        }
                    })
            },
            
            
           
            
            
            getCustomers: function() {
                var vm = this
                var parameterData={
                    status:vm.status,
                  sort:vm.sort,
                  cashType:vm.cashType,
                  pageIndex: vm.pageIndex,
                  pageSize: vm.pageSize,
                  linkName : vm.serch,
                  linkPhone:vm.tell,
                  province:vm.address.province,
                  city:vm.address.district,
                  area:vm.address.city,
                  _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                  _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };
                vm.$http.post(vm.apiUrl,parameterData,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        vm.megs=response.data.list
                          vm.total=response.data.count
                          console.log(vm.megs)
                          var Leng=vm.megs.length
                          for(let i=0;i<Leng;i++){
                             if(vm.megs[i].status==2){
                            vm.aa=true
                            
                          }if(vm.megs[i].status>2){
                            vm.bb=true
                          }
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
            review:function(index){
              var vm=this
              vm.shopId=vm.megs[index].shopId
              vm.status=vm.megs[index].status
              console.log(index)

            },
            detail:function(index){
              var vm=this;
             vm.index=index
             console.log(vm.megs)
             vm.shopId=vm.megs[index].shopId
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
          addd:function(){
            var vm=this
            var inpt={
                status:vm.status,
                sort:vm.sort,
                cashType:vm.cashType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                linkName : vm.serch,
                linkPhone:vm.tell,
                province:vm.address.province,
                city:vm.address.district,
                area:vm.address.city,
                _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };
                console.log(inpt)
                vm.$http.post(vm.apiUrl,inpt,{emulateJSON:true})
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
                          console.log(error)
                      }
                    })
            },
            /*adds:function(){
                var vm=this;
                vm.$http.post(vm.apiUrl4,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.stylemeg=response.data.list
                            console.log(vm.stylemeg)
                        }else{
                            console.log(error)
                        }
                    })
            },*/ishave:function(){
              var vm=this;
              console.log(vm.pulldefor)
             
            },
            
            rbackbtn:function(){
              var vm=this;
              vm.showPage=true
              vm.applypage=false
              vm.detapage=false
              vm.reviewpage=false
              vm.jinjian=false
              vm.entrypage=false
            },

          
       submitall:function(index){
          var vm=this;
          var status=vm.megs[index].status;
          vm.shopId=vm.megs[index].shopId;
           if(status==2){
            var addresscode={
            province:vm.megs[index].province,
            city:vm.megs[index].city,
            area:vm.megs[index].area
          }
          vm.$http.post(vm.apiUrl9,addresscode,{emulateJSON:true})
            .then((response) => {
                if(response.data.code===0){
                   vm.addressmegs=response.data.obj
                   vm.pullcode=response.data.obj  
                    vm.$router.push('/CustomerApplication/jinjian?addressmegs='+vm.addressmegs+'&shopId='+vm.shopId+'&province='+vm.megs[index].province+'&city='+vm.megs[index].city+'&area='+vm.megs[index].area)
                }else{
                    console.log(response.data.error)
                }
            })
       
          }if(status>=3){
            vm.$router.push('/CustomerApplication/submit?&shopId='+vm.shopId)
           
          }
          
         
          
        },entrysubmit:function(){
          var vm=this;
          vm.$http.post(vm.apiUrl11,{txnSeq:vm.txnSeq},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                          console.log(response.data.Object)
                           /* vm.stylemeg=response.data.list
                            console.log(vm.stylemeg)*/
                        }else{
                            console.log(error)
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
.title{
 margin: 20px 0;
}

h4{
  float: left;
  margin-top: -6px;
}
a{
  text-align: center;
  text-decoration: none;
  color: #abc;
}
.eidtimg{
  width: 200px;
  height: 175px;
}
  .title ul{
    margin-left: 30px;
    float: left;
  }
  .title li{
    margin: 0 10px;
    float: left;
  }
   table,td,th {
        border: 1px solid #ccc;
        border-collapse: collapse;
    }
    
    table {
        width: 1000px;
        margin: 20px 0px;
    }
    
    tr {
      text-align: center;
        line-height: 30px;
    }

.eideimg{
  width: 200px;
  height: 175px;
}
.inputs{
  width: 25%;
  display: inline-block;
}
  .nav li{
  cursor: pointer;
  width: 85px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.aaa .aaa,.bbb .bbb,.ccc .ccc,
.eee .eee,.fff .fff,.ggg .ggg,
.hhh .hhh,.iii .iii,.jjj .jjj,
.kkk .kkk,.ddd .ddd,.aa1 .aa1,
.aa2 .aa2,.aa3 .aa3,.aa4 .aa4,
.aa5 .aa5{
  background: #81C9ED;
  color: white;
}
.btn{
    text-align: center;
    margin-top: 30px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
  }
  .upload{
    display: inline-block;
  }
  h1{
    font-size: 18px;
    margin: 20px 0;
  }
  .rback{
    position: fixed;
    top:8px;
    left: 15px;
  }
</style>