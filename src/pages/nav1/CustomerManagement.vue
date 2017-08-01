<template>
    <div style="margin-left: 20px;">
        <div>
        <div class="title">
        <h4>客户类型　　　</h4>
            <ul class="nav" :class="[f]">
                <li class="aba" @click="change6('aba')">全部</a></li>
                <li class="abb" @click="change6('abb')">臻e盾商户</a></li>
                <li class="abc" @click="change6('abc')">普通用户</a></li>
                
                
            </ul>
        </div> <br>
        <div class="title">
               <h4>支付通道　　　</h4>
                <ul class="nav" :class="[c]">
                  <li class="aaa" @click="change3('aaa')">全部</li>
                  <li class="aa3" @click="change3('aa3')">未绑定</li>
                  <li class="aa4" @click="change3('aa4')">已绑定</li>

               </ul>
           </div> <br>
        <div class="title">
        
        <h4>收银台　　　　</h4>
            <ul class="nav" :class="[g]">
                <li class="abd" @click="changes7('abd')">全部</a></li>
                <li class="abe" @click="changes7('abe')">民生银行</a></li>
                <li class="abf" @click="changes7('abf')">中信银行</a></li>
                <li class="abg" @click="changes7('abg')">南京银行</a></li>
                
                
            </ul>
        </div> <br>
    

        <div class="title"><h4>法人姓名　　　　　　</h4><input v-model="relname" type="text" name=""></div>
        <div class="title"><h4>手机号码　　　　　　</h4><input v-model="tellnum" type="number" name=""></div>
        <div v-cloak class="title"><h4>店铺地址　　　　　　</h4><address-picker :opts="obj" v-model="mangeaddress"></address-picker></div>
        <div class="title"><h4>店铺名称　　　　　　</h4><input v-model="shopname" type="text" name=""></div>
        <br>
         <button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
        <table v-show="listpage">
            <thead>
                <tr>
                    <th>店铺名称</th>
                    <th>法人</th>
                    <th>手机号码</th>
                    <th>店铺地址</th>
                    <th>客户类型</th>
                    <th>支付通道</th>
                    <th>收银台</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
              <tr v-if="megs" v-for="(info,index) in megs">
                           <td>{{info.shopName}}</td>
                           <td>{{info.linkName}}</td>
                           <td>{{info.linkPhone}}</td>
                           <td>{{info.province}}{{info.city}}{{info.area}}</td>
                           <td>{{formatsort(info.sort)}}</td>
                           <td>{{formatstatus(info.status)}}</td>
                           <td>{{formatcashtype(info.cashType)}}</td> 
                           <td>{{formatforbidden(info.forbidden)}}</td> 
                           <td><el-button @click="disable(index)" type="text">{{formattype(info.forbidden)}}</el-button><el-button @click="aisle(index)" type="text">支付通道</el-button>
                    <el-button  @click="detail(index)" type="text">详情</el-button></td> 
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
   

    </div>
  
</template>

<script>
  export default{

        data () {
      return {
                 apiUrl:'api/filter/customer/view.json',
                 apiUrl1:'api/filter/customer/forbidden.json',
                 //支付宝经营类型下拉
                 apiUrl2:'api/filter/customer/zfbDic.json',
                 //微信经营类型下拉框
                 apiUrl3:'api/filter/customer/wxDic.json',
                 //qq经营类型下拉框
                 apiUrl4:'api/filter/customer/qqDic.json',
                 //支付通道绑定
                 apiUrl5:'api/filter/customer/payChannelBind.json',
                 //支行下拉
                 apiUrl6:'api/filter/customer/bankCodeDrop.json',
                 apiUrl7:'api/filter/customer/detail.json',
                 apiUrl8:'api/filter/customer/areaDrop.json',
                 
                 megs:[],
                 meg:[],
                 detailmegs:[],
                
                 f:'aba',
                 g:'abd',
                 sort:'',
                 status:'',
                 cashType:'',
                 value:'',
                 value1:'',
                 value2:'',
                 value3:'',
                 value4:'',
                 value5:'',
                 value6:'',
                 value7:'',
                 value8:'',
                 value9:'',
                 value10:'',
                 values:'',
                 valuees:'',
                 provinceval:'',
                 cityval:'',
                 c:'aaa',
                 limtday:'',
                 limtmoth:'',
                  ratio:'',
                 showPageTag:false,
                 detailpage:false,
                 listpage:true,
                 
                 
                 listpage:true,
                 aislepage:false,
                 modifypage:false,
                 
                 disable1:'',
                 disable2:'',
         disable3:'',
         pageIndex: 1,
               pageSize: 10,
               total: 1,
               obj: '',
               relname: '',
               tellnum: '',
                 shopname: '',
                 shopId: '',
               mangeaddress:{
                province:'',
                district:'',
                city:''
               },
                
                address:{
         province:'',
                 city:'',
          },
                obj1:{
                    noDistrict:true,
                }
                }
           
        },
        created: function() {
            this.getCustomers()
        },
        
        methods: {
            formattype:function(row){
                return row==0?'禁用':row==1?'启用':'';
            },formatstatus:function(row){
                return row==6?'已绑定':'未绑定';
            },
            formatforbidden:function(row){
                return row==0?'启用':row==1?'禁用':'';
            },formatsort:function(row){
                return row==1?'普通用户':row==2?'臻e盾用户':'';
            },formatcashtype:function(row){
                return row==1?'民生银行':row==2?'中信银行':row==3?'南京银行':'';
            },
            getCustomers: function() {
                var vm = this;
                var parameterData={
                  cashType:vm.cashType,
                  status:vm.status,
                    sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                    area:vm.mangeaddress.city,
                    shopName:vm.shopname
                };
                vm.$http.post(vm.apiUrl,parameterData,{emulateJSON:true})
                    .then((response) => {
                      if(response.data.code===0){
                        vm.megs=response.data.list
                        vm.total=response.data.count
                        console.log(response.data)
                        console.log(vm.pageSize)
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
            disable:function(index){
                var vm=this;
                if(vm.megs[index].forbidden==0){
                    var a=1
                }if(vm.megs[index].forbidden==1){
                    var a=0
                }

                vm.$http.post(vm.apiUrl1,{shopId:vm.megs[index].shopId,forbidden:a},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            
                        }else{
                            console.log(response.data.error)
                        }
                    })
                setTimeout(function(){vm.getCustomers()},100)
            },aisle:function(index){
                var vm=this;
                vm.shopId=vm.megs[index].shopId
                if(vm.megs[index].status===6){
                   vm.meg=vm.megs[index]
                    vm.$router.push('/CustomerManagement/customerManPayeidt?openBank='+vm.meg.openBank+'&bankCard='+vm.meg.bankCard+'&linkName='+vm.meg.linkName+'&shopId='+vm.shopId)
                }else{

                 vm.meg=vm.megs[index]
                  vm.$router.push('/CustomerManagement/customerManPay?openBank='+vm.meg.openBank+'&bankCard='+vm.meg.bankCard+'&linkName='+vm.meg.linkName+'&shopId='+vm.shopId)
                }
               /* vm.$http.post(vm.apiUrl8,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.addpromeg=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    }) */
                /* vm.listpage=false,
                 vm.aislepage=true,
                 vm.meg=vm.megs[index]
                 vm.shopId=vm.megs[index].shopId
                 vm.$http.post(vm.apiUrl8,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.addpromeg=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })*/
            },remark5:function(){
                var vm=this;
                if(vm.checked4==true){
                    vm.wx=true
                    vm.$http.post(vm.apiUrl3,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.wxDic=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.wx=true
                    vm.wxDic=[]
                }
            },remark6:function(){
                var vm=this;
                if(vm.checked5==true){
                    vm.qq=true
                    vm.$http.post(vm.apiUrl4,{level:1},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                            vm.qqDic=response.data.list
                            console.log(response.data)
                            
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                }else{
                    vm.qq=false
                    vm.qqDic=[]
                }
            },
           
                /*if(vm.pullbankval!==''){
                    var aa=(vm.value2)?'{"type":'+'"zfb"'+','+'"industryId":'+'"'+vm.value2+'"'+'},':'';
              var bb=(vm.value5)?'{"type":'+'"wx"'+','+'"industryId":'+'"'+vm.value5+'"'+'},':'';
              var cc=(vm.value8)?'{"type":'+'"qq"'+','+'"industryId":'+'"'+vm.value8+'"'+'},':'';
              var allmegs={
                operates:'['+aa+bb+cc+']'};
              var a=allmegs.operates
              var a=a.split('}')
              a.pop()
               a.push(']')
              var a=a.join('}');
                var bindmeg={
                    shopId:vm.shopId,
                    dayLimit:vm.limtday,
                    monthLimit:vm.limtmoth,
                    fixFeeRate:vm.ratio,
                    pbcBankId:vm.pullbankval,
                    acctType:vm.values,
                    operates:a
                };
                console.log(bindmeg)
                vm.$http.post(vm.apiUrl5,bindmeg,{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                        }else{
                            console.log(response.data.error)
                        }
                        
                    })
                    vm.listpage=true
                vm.aislepage=false
                }else{
                    alert('开户行号不能为空')
                }*/
              
            detail:function(index){
                var vm=this;
                vm.$router.push('/CustomerManagement/customerManDetail?shopId='+vm.megs[index].shopId)
                 
            },
            change6:function(cur){
              var vm=this;
              vm.f=cur
              if(cur=='aba'){
                vm.sort=''
                var shopmangemegs={
                  cashType:vm.cashType,
                  status:vm.status,
                sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                  area:vm.mangeaddress.city,
                    shopName:vm.shopname
                };

              }if(cur=='abb'){
                vm.sort=2
                var shopmangemegs={
                  cashType:vm.cashType,
                  status:vm.status,
                sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                  area:vm.mangeaddress.city,
                    shopName:vm.shopname
                }
              }if(cur=='abc'){
                vm.sort=1
                 var shopmangemegs={
                    cashType:vm.cashType,
                    status:vm.status,
                    sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                    area:vm.mangeaddress.city,
                    shopName:vm.shopname
                }
              }
              vm.$http.post(vm.apiUrl,shopmangemegs,{emulateJSON:true})
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
                            console.log('数据请求失败')
                        }
                    })
            },
            change3:function(cur){
            this.c=cur
              var vm=this
              if(cur=='aaa'){
                vm.status=''
                var scash={
                  cashType:vm.cashType,
                    status:vm.status,
                    sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                    area:vm.mangeaddress.city,
                    shopName:vm.shopname
                    }
                }if(cur=='aa3'){
                  vm.status=5
                   var scash={
                       cashType:vm.cashType,
                    status:vm.status,
                    sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                    area:vm.mangeaddress.city,
                    shopName:vm.shopname
                    } 
                }if(cur=='aa4'){
                  vm.status=6
                   var scash={
                     cashType:vm.cashType,
                    status:vm.status,
                    sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                    area:vm.mangeaddress.city,
                    shopName:vm.shopname
                    } 
                }
              console.log(scash)
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
                            alert(response.data.error)
                        }
                    })
            },
            changes7:function(cur){
              var vm=this;
              vm.g=cur
              if(cur=='abd'){
                vm.cashType=''
                var shopmangemeg={
                    cashType:vm.cashType,
                    status:vm.status,
                    sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                    area:vm.mangeaddress.city,
                    shopName:vm.shopname
                }
              }if(cur=='abe'){
                vm.cashType=1
                var shopmangemeg={
                  cashType:vm.cashType,
                  status:vm.status,
                sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                  area:vm.mangeaddress.city,
                    shopName:vm.shopname
                }
              }if(cur=='abf'){
                vm.cashType=2
                var shopmangemeg={
                  cashType:vm.cashType,
                  status:vm.status,
                sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                  area:vm.mangeaddress.city,
                    shopName:vm.shopname
                }
              }if(cur=='abg'){
                vm.cashType=3
                shopmangemeg={
                  cashType:vm.cashType,
                  status:vm.status,
                sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                  area:vm.mangeaddress.city,
                    shopName:vm.shopname
                }
              }
              console.log(shopmangemeg)
              vm.$http.post(vm.apiUrl,shopmangemeg,{emulateJSON:true})
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
                            console.log('数据请求失败')
                        }
                    })
            },handleSizeChange(val) {
                
            console.log(`每页 ${val} 条`);
          },
        handleCurrentChange(val) {
            this.pageIndex= val;
            this.getCustomers();
            console.log(`当前页: ${val}`);
            console.log(val);
          },addd:function(){
             var vm=this
            var inpt={
                cashType:vm.cashType,
                status:vm.status,
                sort:vm.sort,
                    linkName:vm.relname,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    linkPhone : vm.tellnum,
                    province:vm.mangeaddress.province,
                    city:vm.mangeaddress.district,
                  area:vm.mangeaddress.city,
                    shopName:vm.shopname
                   
                };
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
                            console.log('数据请求失败')
                        }
                    })
          }
        },
  }
</script>

<style>
.nav li{
  cursor: pointer;
  width: 85px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.aba .aba,.abb .abb,.abc .abc,
.abd .abd,.abe .abe,.abf .abf,.abg .abg,
.aaa .aaa,.aa3 .aa3,.aa4 .aa4{
  background: #81C9ED;
  color: white;
}
.titles{
    position:absolute;
    left: 210px;
    top:3px;
}.titles1{
    position:absolute;
    left: 210px;
    top:53px;
}.titles2{
    position:absolute;
    left: 210px;
    top:98px;
}
.select{
    width: 20%;
    margin-right: 10px;
}
.citybank{
    width: 15%;
    height: 10px;
    position: absolute;
    left: 340px;
    top:0;}
.bank{
position: absolute;
    left: 300px;
    top:5px;
}
</style>