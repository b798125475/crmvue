<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>制定开发计划</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form :inline="true" :model="saleChance" :label-position="labelPosition" class="demo-form-inline">

			<el-form-item label="销售机会编号">
				<el-input v-model.trim="saleChance.chanceId" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="客户名称">
				<el-input v-model.trim="saleChance.chanceCustName" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="机会来源">
				<el-input v-model.trim="saleChance.chanceSource" size="small" :disabled="true"></el-input>
			</el-form-item>

			<el-form-item label="成功几率(%)">
				<el-input v-model.trim="saleChance.chanceRate" size="small" :disabled="true"></el-input>
			</el-form-item>

			<el-form-item label="概要">
				<el-input v-model.trim="saleChance.chanceTitle" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model.trim="saleChance.chanceLinkman" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="联系人电话">
				<el-input v-model.trim="saleChance.chanceTel" size="small" :disabled="true"></el-input>
			</el-form-item>

			<el-form-item label="创建人">
				<el-input v-model.trim="userName" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model.trim="saleChance.chanceCreateDate" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model.trim="saleChance.chanceDesc" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="指派给">
				<el-input v-model.trim="chanceDueName" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="指派时间">
				<el-input v-model.trim="saleChance.chanceDueDate" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-divider></el-divider>
			<el-form-item label="添加计划项">
				<el-input v-model.trim="salePlan.planTodo" size="small"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="add()" size="small">保存</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="ret()" size="small">返回</el-button>
			</el-form-item>
			<el-form-item v-for="item in salePlanTodo" label="已有计划项">
				<el-input v-model.trim="item.planTodo" size="small"></el-input>
				<el-button id="elbtn" @click="del(item.planId)" type="danger" size="small">删除</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: '',
					chanceSource: '',
					chanceCustName: '',
					chanceTitle: '',
					chanceRate: '',
					chanceLinkman: '',
					chanceTel: '',
					chanceDesc: '',
					chanceCreateId: '',
					chanceCreateDate: '',
					chanceDueId: '',
					chanceDueDate: '',
					chanceStatus: ''
				},
				labelPosition: 'top',
				sysUser: [],
				userRoleId: 3,
				value: '',
				userName: '',
				chanceDueName: '',
				planTodo: '',
				salePlan: {
					planId: '',
					planChcId: '',
					planTodo: '',
					planResult: ''
				},
				salePlanTodo: []
			}
		},
		created() {
			this.init();
		},
		methods: {
			init(){
				this.$axios.post('selectSaleChanceBychanceId', {
					chanceId: this.$route.query.chanceId
				})
				.then((response) => {
					this.saleChance = response.data;
					this.saleChance.chanceDueDate = this.$getCurDate();
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserByuserId', {
					userId: this.$route.query.chanceDueId
				})
				.then((response) => {
					this.chanceDueName = response.data.userName;
					console.log(response.data.userName);
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserByuserId', {
					userId: this.$route.query.chanceCreateId
				})
				.then((response) => {
					this.userName = response.data.userName;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSalePlanByplanChcId', {
					planChcId: this.$route.query.chanceId
				})
				.then((response) => {
					this.salePlanTodo = response.data;
					console.log(this.salePlanTodo);
				})
				.catch((error) => {
					console.log(error);
				});
			},
			add() {
				this.salePlan.planChcId = this.saleChance.chanceId;
				this.$axios.post('insertSalePlan', this.salePlan)
					.then((response) => {
						if(response.data == 1) {
							alert('更新成功！');
							this.salePlan.planTodo='';
							this.init();
							
						} else {
							alert('更新失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			ret() {
				this.$router.push('/admin/salePlanList');
			},
			del(planId) {
				if(!confirm('确定？？')) {
					return;
				}
				this.$axios.post('deleteSalePlan', {
						planId: planId
					})
					.then((response) => {
						if(response.data == 1) {
							alert('删除成功!')
							this.init();
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			}
		}
	}
</script>

<style scoped>
	.demo-form-inline {
		margin-top: 15px;
	}
	
	.el-select {
		margin-right: 100px;
	}
	
	.el-button {
		margin-top: 55px;
	}
	
	#elbtn {
		float: left;
		margin-top: 0px;
	}
</style>