<template>
	<div>
		<el-container>
			<el-header>crm客户关系管理系统
				<el-tooltip  effect="dark" content="安全退出" placement="bottom">
					<i id='exit' @click="exit()"  class="el-icon-close"></i>
				</el-tooltip><i id="users" class="el-icon-user">欢迎:{{$getSessionStorage('Sysuser').userName}}</i></el-header>
			<el-container>
				<el-aside width="200px">
					<span style="background-color: #D9EDF7; display: block;">客户关系管理系统</span>
					<el-menu default-active="2" router class="el-menu-vertical-demo" background-color="#F5F5F5" text-color="#2B3142" active-text-color="#ffd04b">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-edit"></i>
								<span>营销管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/admin/saleChanceList">销售机会管理</el-menu-item>
								<el-menu-item index="/admin/salePlanList">客户开发计划</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-edit"></i>
								<span>客户管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/admin/custManagement">客户信息管理</el-menu-item>
								<el-menu-item index="/admin/loss">客户流失管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-edit"></i>
								<span>服务管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index=/admin/servercreate>服务创建</el-menu-item>
								<el-menu-item index="1-2">服务分配</el-menu-item>
								<el-menu-item index="1-3">服务处理</el-menu-item>
								<el-menu-item index="1-4">服务反馈</el-menu-item>
								<el-menu-item index="1-5">服务归档</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="4">
							<template slot="title">
								<i class="el-icon-edit"></i>
								<span>统计报表</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="">客户贡献分析</el-menu-item>
								<el-menu-item index="">客户构成分析</el-menu-item>
								<el-menu-item index="">客户服务分析</el-menu-item>
								<el-menu-item index="">客户流失分析</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="5">
							<template slot="title">
								<i class="el-icon-edit"></i>
								<span>基础数据 </span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="">数据字典-客户等级</el-menu-item>
								<el-menu-item index="">数据字典-服务类别</el-menu-item>
								<el-menu-item index="">数据字典-地区</el-menu-item>
								<el-menu-item index="">数据字典-用户</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main id="main">

					<router-view></router-view>
				</el-main>
			</el-container>
			<el-footer>&copy; 薄兴远组版权所有 www.neusoft.com</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'Admin',
		data() {
			return {
				bodyHeight: 0
			}
		},
		mounted() {
			document.getElementById('main').style.height = document.body.clientHeight - 120 + 'px';
			this.bodyHeight = document.body.clientHeight;
			//监听浏览器窗口尺寸改变事件
			window.onresize = () => {
				//获取body高度，赋值给this.bodyHeight
				this.bodyHeight = document.body.clientHeight;
			}
		},
		watch: {
			bodyHeight: function() {
				document.getElementById('main').style.height = this.bodyHeight - 120 + 'px';
			}
		},
		methods:{
			exit(){
				this.$removeSessionStorage('Sysuser');
				this.$router.push('/Login');
			}
		}

	}
</script>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	
	.el-header,
	.el-footer {
		background-color: #438EB9;
		color: white;
		text-align: center;
		line-height: 60px;
		font-family: "bodoni mt";
	}
	
	.el-header {
		text-align: left;
	}
	
	.el-aside {
		background-color: #FFFFFF;
		color: #333;
		text-align: center;
		line-height: 50px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	
	#users {
		float: right;
		line-height: 60px;
	}
	
	#exit {
		float: right;
		line-height: 60px;
	}
	
	#exit:hover {
		cursor: pointer;
	}
</style>