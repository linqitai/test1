<template>
	<div style="margin-left: 20px;">
	<div class="title"><h4>店铺名称　　　</h4><input type="text" name=""></div>
		<div class="title">
		<h4>收银台　</h4>
			<ul class="nav" :class="[i]">
				<li class="all" @click="changez('all')">全部</a></li>
				<li class="min" @click="changez('min')">民生银行</a></li>
				<li class="xin" @click="changez('xin')">中信银行</a></li>
				<li class="nan" @click="changez('nan')">南京银行</a></li>
			</ul>
		</div> <br>
		<div class="title">
			<h4>支付来源</h4>
			<ul class="nav" :class="[j]">
				<li class="every" @click="changesze('every')">全部</a></li>
				<li class="pay" @click="changesze('pay')">支付宝</a></li>
				<li class="qq" @click="changesze('qq')">QQ钱包</a></li>
				<li class="nbank" @click="changesze('nbank')">南京银行</a></li>
			</ul>
		</div><br>
		<div class="title">
			<h4>收款方式</h4>
			<ul class="nav" :class="[k]">
				<li class="most" @click="changesszes('most')">全部</a></li>
				<li class="scan" @click="changesszes('scan')">扫描二维码</a></li>
				<li class="build" @click="changesszes('build')">生成二维码</a></li>
				<li class="pos" @click="changesszes('pos')">pos机</a></li>
			</ul>
		</div> <br>

		<table>
            <thead>
                <tr>
                    <th>店铺</th>
                    <th>收银台</th>
                    <th>收银员</th>
                    <th>收款金额(元)</th>
                    <th>支付来源</th>
                    <th>收款方式</th>
                    <th>订单号</th>
                    <th>收款状态</th>
                    <th>收款时间</th>
                    <th>退款金额(元)</th>
                </tr>
              <!--   <tr v-if="meg" v-for="(info,index) in filteredMeg">
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
 				i:'all',
 				j:'every',
 				k:'most'
 			}
 		},
 		methods:{
 				changez:function(cur){
        			this.current=cur
        		},
	        	changesze:function(cur){
	        		this.currents=cur
	        	},
	        	changesszes:function(cur){
	        		this.currentss=cur
	        	}
 		}
 	}
</script>
<style>
	.all .all,.min .min,.xin .xin,
	.nan .nan,.every .every,.pay .pay,
	.qq .qq,.nbank .nbank,.most .most
	,.scan .scan,.build .build,.pos .pos
	{
		background: #81C9ED;
		color: white;
	}
</style>