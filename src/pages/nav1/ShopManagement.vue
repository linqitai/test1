<template>
  <div style="margin-left: 20px;">
    <div class="title">
    <h4>审核状态　　　</h4>
      <ul class="nav" v-bind:class="[h]">
        <li class="aca" @click="change('aca')">全部</a></li>
        <li class="acb" @click="change('acb')">未审核</a></li>
        <li class="acc" @click="change('acc')">审核通过</a></li>
        <li class="acd" @click="change('acd')">审核驳回</a></li>
      </ul>
    </div> <br>
    <div class="title"><h4>店铺名称　　　　　　</h4><input type="text" v-model="serch" ></div>
    <div class="title"><h4>联系人　　　　　　　</h4><input type="text" v-model="contact" ></div>
    <div class="title"><h4>手机号码　　　　　　</h4><input type="text" v-model="cellphone " ></div>
    <div class="title"><h4>总店名称　　　　　　</h4><input type="text" v-model="shopnames" ></div>
    <div class="title" style="position: relative"><h4 style="margin-top: 8px;">申请时间　　　　　　</h4>
    <div class="block">
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </div>
  <div style="position: absolute;left: 335px;top:8px;">至</div>
  <div class="block" style="position: absolute;left: 355px;top:0px;">
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
                <tr>
                    <th>名称</th>
                    <th>图片</th>
                    <th>联系人</th>
                    <th>手机号码</th>
                    <th>店铺地址</th>
                    <th>所属总店</th>
                    <th>申请时间</th>
                    <th>审核状态</th>
                    <th>操作</th>
                </tr>
             <tr v-if="megs" v-for="(info,index) in megs">
                          <td>{{info.shopName}}</td>
                          <td><el-button @click="picture(index)" type="text">图片</el-button></td>
                          <td>{{info.linkName}}</td>
                          <td>{{info.linkPhone}}</td>
                          <td>{{info.province}}省{{info.city}}市{{info.area}}区{{info.address}}</td>
                          <td>{{info.rShopName}}</td>
                          <td>{{format(parseInt(info.created))}}</td>
                          <td>{{formatStatus(info.status)}}</td>
                          <td><el-button @click="receivestatu(index)" type="text">{{formatStatu(info.status)}}</el-button></td>

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
        <el-dialog  v-model="editFormVisible1" :close-on-click-modal="false">
    <div ><h4>图片展示　　　　　</h4>
               <br><img :src="img" v-if="img" style="width:200px;height:200px;"></div>
          
            <div slot="footer" class="dialog-footer">

                <el-button type="primary" @click="editSubmit1" >确定</el-button>
            </div>
        </el-dialog>
        <el-dialog  v-model="editFormVisible2" :close-on-click-modal="false">
    <div ><h4>审核操作　　　　　</h4><br>
               <el-radio class="radio" v-model="radio" label="6">审核通过</el-radio>
  <el-radio class="radio" v-model="radio" label="0">审核驳回</el-radio></div>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible2 = false">取消</el-button>
                <el-button type="primary" @click="editSubmit2" >确定</el-button>
            </div>
        </el-dialog>
    
  </div>
</template>
<script>


  export default{

  
     data () {
      return {
       h:'aca',
       apiUrl:'api/filter/shopManage/subbranchView.json',
       apiUrl1:'api/filter/shopManage/editStatus.json',
       megs:[],
       serch:'',
       contact:'',
       cellphone:'',
       shopnames:'',
       auditor:'',
       applicant:'',
       status:'',
       img:'',
       radio:'',
       shopId:'',
       pageIndex: 1,
       pageSize: 10,
       total: 1,
       showPageTag:false,
       editFormVisible1:false,
       editFormVisible2:false,
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
        value1:'',
        value2:''
        }
           
        },
        created: function() {
            this.getCustomers() 
        },
        
        methods: {
          //状态装换
          formatStatus:function(row){
            return row==1?'未审核':row==6?'审核通过':'审核驳回';
          },formatStatu:function(row){
            return row==1?'审核':'';
          },
          change:function(cur){
            this.h=cur
            var vm=this
              if(cur=='acb'){
                console.log(12314)
                vm.status=1
                    var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    shopName : vm.serch,
                    linkName:vm.contact,
                    linkPhone:vm.cellphone,
                    rShopName:vm.shopnames,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='acd'){
                  
                  vm.status=0
                    var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    shopName : vm.serch,
                    linkName:vm.contact,
                    linkPhone:vm.cellphone,
                    rShopName:vm.shopnames,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='acc'){
                  vm.status=6
                    var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    shopName : vm.serch,
                    linkName:vm.contact,
                    linkPhone:vm.cellphone,
                    rShopName:vm.shopnames,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    }
                }if(cur=='aca'){
                  vm.status=''
                   var scash={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    shopName : vm.serch,
                    linkName:vm.contact,
                    linkPhone:vm.cellphone,
                    rShopName:vm.shopnames,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                    } 
                }
                    console.log(scash)
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
                    shopName : vm.serch,
                    linkName:vm.contact,
                    linkPhone:vm.cellphone,
                    rShopName:vm.shopnames,
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
                        console('数据请求失败')
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
          },receivestatu:function(index){
              var vm=this;
              vm.editFormVisible2=true
              vm.shopId=vm.megs[index].shopId
          },
           addd:function(){
            var vm=this
            var inpt={
                    status:vm.status,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    shopName : vm.serch,
                    linkName:vm.contact,
                    linkPhone:vm.cellphone,
                    rShopName:vm.shopnames,
                    _startTime:(vm.value1==''?vm.value1:Date.parse(vm.value1)),
                    _endTime:(vm.value2==''?vm.value2:Date.parse(vm.value2))
                };
                console.log(inpt)
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
                            console('数据请求失败')
                        }
                    })
            },picture:function(index){
                this.img=this.megs[index].imgUrl
                this.editFormVisible1=true

            },editSubmit1:function(){
                this.img=''
                this.editFormVisible1=false
            },editSubmit2:function(){
              var vm=this;
              vm.$http.post(vm.apiUrl1,{shopId:vm.shopId,status:vm.radio},{emulateJSON:true})
                    .then((response) => {
                        if(response.data.code===0){
                           
                        }else{
                            console(response.date.error)
                        }
                    })
                vm.editFormVisible2=false
                setTimeout(function(){vm.getCustomers()},200)
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
          
        },
  
        }/*,
        computed: {
            filteredMeg: function() {
                var vm = this
                return vm.meg.filter(function(info) {
                    var searchRegex =  new RegExp(vm.newmeg.rName||vm.newmeg.rMobile||vm.newmeg.name||vm.newmeg.mobile, 'i')
                    return  (
                        searchRegex.test(info.rName) ||
                        searchRegex.test(info.rMobile)||
                        searchRegex.test(info.name)||
                        searchRegex.test(info.mobile)
                    );
                })
            }

        }*/

  }
  
</script>

<style scoped>
.nav li{
  cursor: pointer;
  width: 85px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  overflow: hidden;
}
.aca .aca,.acb .acb,.acc .acc,.acd .acd{
  background: #81C9ED;
  color: white;
}
</style>