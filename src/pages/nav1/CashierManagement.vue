<template>
    <div style="margin-left: 20px;">
        <div class="title">
            <h4>姓名　　　　　　　　</h4>
            <input type="text" v-model="serch">
        </div>
        <div class="title">
            <h4>手机号码　　　　　　</h4>
            <input type="tel" v-model="serchb">
        </div>
        <div class="title">
            <h4>角色　　　　　</h4>
            <ul class="nav" :class="[a]">
                <li class="aa" @click="change1('aa')">全部</a>
                </li>
                <li class="bb" @click="change1('bb')">收银员</a>
                </li>
                <li class="cc" @click="change1('cc')">出纳</a>
                </li>
            </ul>
        </div>
        <br>
        <div class="title">
    
            <h4>性别　　　　　</h4>
            <ul class="nav" :class="[b]">
                <li class="dd" @click="changes2('dd')">全部</a>
                </li>
                <li class="ee" @click="changes2('ee')">男</a>
                </li>
                <li class="ff" @click="changes2('ff')">女</a>
                </li>
            </ul>
        </div>
        <br>
    
        <div class="title">
            <h4>店铺名称　　　　　　</h4>
            <input type="text" v-model="serchs">
        </div>
        <button @click="addd" type="button" class="el-button el-button--default">
            <span>查询</span>
        </button>
        <br>
        <table v-show="listpage" >
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>角色</th>
                    <th>手机号码</th>
                    <th>店铺名称</th>
                    <th>店铺类型</th>
                    <th>添加时间</th>
                    <th>退款权限</th>
                    <th>退款额度</th>
    
                </tr>
                <tr v-if="megs" v-for="(info,index) in megs">
                    <td>{{info.name}}</td>
                    <td>{{formatSex(info.sex)}}</td>
                    <td>{{formatuserType(info.userType)}}</td>
                    <td>{{info.mobile}}</td>
                    <td>{{info.shopName}}</td>
                    <td>{{formatshopType(info.shopType)}}</td>
                    <td>{{format(parseInt(info.created))}}</td>
                    <td>{{formatrefundPermissions(info.refundPermissions)}}</td>
                    <td>{{info.refundAmount/100}}元</td>
                </tr>
            </thead>
    
        </table>
        <h1 v-show="!listpage" style="text-align:center">暂无数据......</h1>
        <div v-cloak class="block" v-show="showPageTag">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>


export default {

    data() {
        return {
            apiUrl: 'api/filter/cashier/view.json',
            megs: [],
            a: 'aa',
            b: 'dd',
            serch: '',
            serchb: '',
            serchs: '',
            pageIndex: 1,
            pageSize: 10,
            userType: '',
            sex: '',
            total: 1,
            showPageTag: false,
            listpage: true
        }

    },
    created: function () {
        this.getCustomers()

    },

    methods: {
        //角色转换
        formatuserType: function (row) {

            return row == 2 ? '收银员' : '出纳';
        },
        formatSex: function (row) {

            return row == 2 ? '女' : '男';
        },
        formatshopType: function (row) {

            return row == 1 ? '分店' : '总店';
        },
        formatrefundPermissions: function (row) {

            return row == 0 ? '无' : '有';
        },
        change1: function (cur) {
            this.a = cur
            var vm = this

            if (cur == 'bb') {
                vm.userType = 2
                var scash = {
                    sex: vm.sex,
                    userType: vm.userType,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name: vm.serch,
                    mobile: vm.serchb,
                    shopName: vm.serchs,
                }
            } if (cur == 'cc') {
                vm.userType = 3
                var scash = {
                    sex: vm.sex,
                    userType: vm.userType,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name: vm.serch,
                    mobile: vm.serchb,
                    shopName: vm.serchs,
                }
            } if (cur == 'aa') {
                vm.userType = ''
                var scash = {
                    sex: vm.sex,
                    userType: vm.userType,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name: vm.serch,
                    mobile: vm.serchb,
                    shopName: vm.serchs,
                }
            }

            vm.$http.post(vm.apiUrl, scash, { emulateJSON: true })
                .then((response) => {
                    if (response.data.code === 0) {
                        vm.megs = response.data.obj
                        vm.total = response.data.count
                        console.log(response.data)
                        if (vm.total <= vm.pageSize) {
                            vm.showPageTag = false;
                        } else {
                            vm.showPageTag = true;
                        }
                    } else {
                        console('数据请求失败')
                    }
                })
        },
        changes2: function (cur) {
            this.b = cur
            console.log(this.current)
            var vm = this

            if (cur == 'ee') {
                vm.sex = 1
                var scash = {
                    sex: vm.sex,
                    userType: vm.userType,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name: vm.serch,
                    mobile: vm.serchb,
                    shopName: vm.serchs,
                }
            } if (cur == 'ff') {
                vm.sex = 2
                var scash = {
                    sex: vm.sex,
                    userType: vm.userType,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name: vm.serch,
                    mobile: vm.serchb,
                    shopName: vm.serchs,
                }
            } if (cur == 'dd') {
                vm.sex = ''
                var scash = {
                    sex: vm.sex,
                    userType: vm.userType,
                    pageIndex: vm.pageIndex,
                    pageSize: vm.pageSize,
                    name: vm.serch,
                    mobile: vm.serchb,
                    shopName: vm.serchs,
                }
            }

            vm.$http.post(vm.apiUrl, scash, { emulateJSON: true })
                .then((response) => {
                    if (response.data.code === 0) {
                        vm.megs = response.data.obj
                        vm.total = response.data.count
                        if (vm.total <= vm.pageSize) {
                            vm.showPageTag = false;
                        } else {
                            vm.showPageTag = true;
                        }
                    } else {
                        console('数据请求失败')
                    }
                })
        },
        getCustomers: function () {
            var vm = this
            var parameterData = {
                sex: vm.sex,
                userType: vm.userType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                name: vm.serch,
                mobile: vm.serchb,
                shopName: vm.serchs,
            };
            vm.$http.post(vm.apiUrl, parameterData, { emulateJSON: true })
                .then((response) => {
                    if (response.data.code === 0) {
                        vm.megs = response.data.obj
                        vm.total = response.data.count
                        console.log(response.data)
                        if (vm.total <= vm.pageSize) {
                            vm.showPageTag = false;
                        } else {
                            vm.showPageTag = true;
                        }
                    } else {
                        console('数据请求失败')
                    }
                })
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            if (val > 1) {
                this.seen = true
            }
            this.pageIndex = val;
            this.getCustomers();
            console.log(`当前页: ${val}`);
            console.log(val);
        },
        addd: function () {

            var vm = this
            var inpt = {
                sex: vm.sex,
                userType: vm.userType,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                name: vm.serch,
                mobile: vm.serchb,
                shopName: vm.serchs,
            };
            vm.$http.post(vm.apiUrl, inpt, { emulateJSON: true })
                .then((response) => {
                    if (response.data.code === 0) {
                        vm.megs = response.data.obj
                        vm.total = response.data.count
                        console.log(response.data)
                        if (vm.total <= vm.pageSize) {
                            vm.showPageTag = false;
                        } else {
                            vm.showPageTag = true;
                        }
                    } else {
                        console('数据请求失败')
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
.nav li {
    cursor: pointer;
    width: 85px;
    height: 25px;
    text-align: center;
    line-height: 25px;
}

.aa .aa,
.bb .bb,
.cc .cc,
.ee .ee,
.ff .ff,
.dd .dd {
    background: #81C9ED;
    color: white;
}
</style>