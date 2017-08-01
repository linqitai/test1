<template>
  <div style="margin-left: 20px;">
    <div class="title">
    <h4>邀请状态</h4>
      <ul  class="nav" v-cloak :class="[current]">
        <li class="all" @click="changei('all')">全部</li>
        <li class="inter" @click="changei('inter')">邀请中</li>
        <li class="success" @click="changei('success')">邀请成功</li> 
      </ul>
    </div> <br>
    
    
    <br>
    <div v-cloak class="title"><h4>邀请人　　　　</h4><input type="text" v-model="serch" ></div>
    <div v-cloak class="title"><h4>邀请人手机　　</h4><input type="number" v-model="phone"></div>
    <div v-cloak class="title"><h4>被邀请人　　　</h4><input type="text" v-model="rserch"></div>
    <div v-cloak class="title"><h4>被邀请人手机　</h4><input type="text" v-model="rphone"></div>
    <div class="title" style="position: relative"><h4 style="margin-top: 8px;">申请时间　　　</h4>
    <div class="block">
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </div>
  <div style="position: absolute;left: 304px;top:8px;">至</div>
  <div class="block" style="position: absolute;left: 330px;top:0px;">
    <el-date-picker
      v-model="value2"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div> 
  </div>
    <button  @click="addd" type="button" class="el-button el-button--default"><span>查询</span></button>
    <br>
    <table v-show="listpage">
            <thead>
                <tr v-cloak>
                    <th>邀请人</th>
                    <th>手机号码(邀请)</th>
                    <th>被邀请人</th>
                    <th>手机号码(被邀)</th>
                    <th>邀请状态</th>
                    <th>奖励</th>
                    <th>邀请时间</th>                    
                </tr>
            </thead>
         
         <tr v-cloak v-show="megs" v-for="(info,index) in megs">
             <td>{{info.rName}}</td>
             <td>{{info.rMobile}}</td>
             <td>{{info.name}}</td>
             <td>{{info.mobile}}</td>
             <td>{{formatuserType(info.status)}}</td>
             <td>{{info.reward}}</td>
             <td>{{format(parseInt(info.created))}}</td>
             
             
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
  
     data () {
      return {
       apiUrl:'api/filter/inviteManage/view.json',
       megs:[],
             current:'all',
             serch:'',
             phone:'',
             status:'',
             rphone:'',
             rserch:'',
             pageIndex: 1,
             pageSize: 10,
             total: 1,
             showPageTag:false,
             listpage:true,
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
        value1: '',
        value2: ''
        }
           
        },
        created: function() {
            this.getCustomers()
            
            
        },
        
        methods: {
            formatuserType:function(row){
                
                return row==1?'被邀请成功 ':'邀请中';
            },
            changei:function(cur){
                this.current=cur
                 var vm=this
              if(cur=='all'){
                     vm.status=''
                    var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    rName : vm.serch,
                    rMobile:vm.phone,
                    name:vm.rserch,
                    mobile:vm.rphone,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                     _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='inter'){
                  vm.status=2
                    var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    rName : vm.serch,
                    rMobile:vm.phone,
                    name:vm.rserch,
                    mobile:vm.rphone,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                     _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='success'){
                  vm.status=1
                    var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    rName : vm.serch,
                    rMobile:vm.phone,
                    name:vm.rserch,
                    mobile:vm.rphone,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                     _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }
            
                    vm.$http.post(vm.apiUrl,scash,{emulateJSON:true})
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
                  status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    rName : vm.serch,
                    rMobile:vm.phone,
                    name:vm.rserch,
                    mobile:vm.rphone,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                     _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
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
                        console.log('数据请求失败')
                      }
                        
                        
                    })

            },

          handleSizeChange(val) {
                
            console.log(`每页 ${val} 条`);
          },
        handleCurrentChange(val) {
          if(val>1){
            this.seen=true
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
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    rName : vm.serch,
                    rMobile:vm.phone,
                    name:vm.rserch,
                    mobile:vm.rphone,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                     _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };
                vm.$http.post(vm.apiUrl,inpt,{emulateJSON:true})
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
    [v-cloak] {
    display: none;
    }
    .nav li{
    cursor: pointer;
    width: 85px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    }
.all .all,.inter .inter,.success .success
    {
    background: #81C9ED;
    color: white;
    }
</style>
