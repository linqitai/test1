<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="20" class="logo">
				<img src="../assets/logo4.png" /> <span>信鸽<i class="txt">收银台</i></span>
			</el-col>
			<el-col :span="4" class="userinfo" v-if="showdetail">
				<el-dropdown trigger="click" >
					<span class="el-dropdown-link userinfo-inner"> {{megs.realName}}　你好！<i class="el-icon-caret-bottom el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">

				 <aside>
           <el-col :span="8">
    <el-menu default-active="$route.path" class="el-menu-vertical-demo" theme="dark"@open="handleopen" @close="handleclose" @select="handleselect" unique-opened>
      <el-submenu index="1" style="width:230px;">
        <template slot="title"><i class="el-icon-message"></i>客户管理</template>
        <el-menu-item-group>
          <router-link  :to="{ name: 'CustomerApplication'}"><el-menu-item index="1-1" class="aaaa">客户申请　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'CustomerManagement'}"><el-menu-item index="1-2">客户管理　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'ShopManagement'}"><el-menu-item index="1-3">分店管理　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'CashierManagement'}"><el-menu-item index="1-4">收银员管理　　　</el-menu-item></router-link>
          
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2"style="width:230px;">
        <template slot="title"><i class="el-icon-message"></i>账单管理</template>
        <el-menu-item-group>
        <router-link  :to="{ name: 'BillingManagement'}"><el-menu-item index="1-5">账单管理　　　</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      
    <el-submenu index="3"style="width:230px;">
        <template slot="title"><i class="el-icon-message"></i>活动管理</template>
        <el-menu-item-group>
          <router-link  :to="{ name: 'InviteFriends'}"><el-menu-item index="1-1">邀请好友　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'Redeem'}"><el-menu-item index="1-2">积分兑换　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'PointsPrizes'}"><el-menu-item index="1-3">积分奖品　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'ScratchPrizes'}"><el-menu-item index="1-4">刮刮卡奖品　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'LinkManagement'}"><el-menu-item index="1-5">链接管理　　　</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4"style="width:230px;">
        <template slot="title"><i class="el-icon-message"></i>财务管理</template>
        <el-menu-item-group>
          <router-link  :to="{ name: 'Reconciliation'}"><el-menu-item index="1-1">对账管理　　　</el-menu-item></router-link>
         
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="5"style="width:230px;">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
        <el-menu-item-group>
          <router-link  :to="{ name: 'PersonalInformation'}"><el-menu-item index="1-1">个人资料　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'ChangePassword'}"><el-menu-item index="1-2">修改密码　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'MessagePush'}"><el-menu-item index="1-3">消息推送　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'RoleManagement'}"><el-menu-item index="1-4">角色管理　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'RightsAssignment'}"><el-menu-item index="1-5">权限分配　　　</el-menu-item></router-link>
          <router-link  :to="{ name: 'AccountManagement'}"><el-menu-item index="1-6">账号管理　　　</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
  </aside>
<!-- 
			<aside>
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					theme="dark" unique-opened router>
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
					</el-menu>
			</aside> -->
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<!-- <strong class="title" >{{$route.name}}</strong> -->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item  v-for="item in $route.matched">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>

						</transition>
					</el-col>
				</div>
			</section>
		</el-col>

	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				apiUrl:'api/common/userInfo.json',
				showdetail: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					megs: []
				}
			}
		},
		methods: {
			
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				console.log(1)
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					var vm=this
			vm.$http.post('api/loginOut.json',{emulateJSON:true})
                    .then((response) => {
                        
                    })
					_this.$router.push('/login');
				}).catch(() => {

				});


			}
		},
		created() {
			var vm=this
			vm.$http.post('api/common/userInfo.json',{emulateJSON:true})
                    .then((response) => {
                        if(response){
                            vm.code=response.data.code
                            vm.megs=response.data.obj
                            vm.showdetail=true
                              console.log(vm.megs)
                        }else{
                            console.log(error)
                        }
                    })
		}
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #1F2D3D;
			color: #c0ccda;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				.userinfo-inner {
					color: #c0ccda;
					cursor: pointer;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				font-size: 22px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color: #20a0ff
				}
			}
		}
		.main {
			background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				width: 230px;
			}
			.content-container {
				background: #fff;
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 230px;
				overflow-y: scroll;
				padding-top: 0px;

				.breadcrumb-container {
					background-color: #f1f2f7;			
					margin-bottom: 25px;
					height: 50px;
					padding-top:15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
						margin-right: 20px;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>