<template>
	<div style="margin-left: 20px;">
		<div class="title">
			<h4>状态　　</h4>
			<ul class="nav" :class="[current]">
				<li class="all" @click="changev('all')">全部</li>
				<li class="not" @click="changev('not')">未上架</li>
				<li class="push" @click="changev('push')">已上架</li>
				<li class="pull" @click="changev('pull')">已下架</a></li>
			</ul>
		</div> <br>
		<div class="title">
			<h4>类型　　</h4>
			<ul class="nav" :class="[currents]">
				<li class="every" @click="changesvs('every')">全部</li>
				<li class="inkind" @click="changesvs('inkind')">实物</li>
				<li class="virtual" @click="changesvs('virtual')">虚拟物品</li>
			</ul>
		</div> <br>

		<div class="title"><h4>剩余数量　　　</h4><input type="text" name=""></div>
		<div class="title"><h4>奖品名称　　　</h4><input type="number" name=""></div>
		<br>
		<table>
            <thead>
                <tr>
                    <th>奖品名称</th>
                    <th>类型</th>
                    <th>单价(分)</th>
                    <th>总数(份)</th>
                    <th>已兑数量(份)</th>
                    <th>剩余数量(份)</th>
                    <th>已兑人数(人)</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
               <!--  <tr v-if="meg" v-for="(info,index) in filteredMeg">
                            <td>{{info.rName}}</td>
                            <td>{{info.rMobile}}</td>
                            <td>{{info.name}}</td>
                            <td>{{info.mobile}}</td>
                            <td>{{info.status}}</td>
                            <td>{{info.reward}}</td>
                            <td>{{info.created}}</td>
                            
                            
                        </tr> -->
            </thead>
         
        </table>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				current:'all',
				currents:'every'
			}
		},
		methods:{
			changev:function(cur){
				this.current=cur
			},
			changesvs:function(cur){
				this.currents=cur
			}
		}
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
.all .all,.not .not,.push .push,
.pull .pull,.every .every,.inkind .inkind,
.virtual .virtual{
	background: #81C9ED;
	color: white;
}
</style>