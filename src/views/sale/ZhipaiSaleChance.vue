<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>指派销售机会</el-breadcrumb-item>
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
			<el-divider></el-divider>
			<el-form-item label="指派给">
			<el-select v-model="value" placeholder="请选择" >
				<el-option v-for="item in sysUser" :label="item.userName" :value="item.userId">
				</el-option>
			</el-select>
			</el-form-item>
			<el-form-item label="指派时间">
				<el-input v-model.trim="saleChance.chanceDueDate" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="zhipai()" size="small">指派</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="ret()" size="small">返回</el-button>
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
				value:'',
				userName:''
			}
		},
		created() {
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
			this.$axios.post('selectSysUserByuserRoleId', {
					userRoleId: this.userRoleId
				})
				.then((response) => {
					this.sysUser = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserByuserId', {
					userId: this.$route.query.chanceCreateId
				})
				.then((response) => {
					this.userName = response.data.userName;
					console.log(this.sysUser);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods: {
			zhipai() {
				this.saleChance.chanceDueDate = this.$getCurDate();
				this.saleChance.chanceDueId = this.value;
				this.saleChance.chanceStatus = 1;
				this.$axios.post('updateSaleChance', this.saleChance)
					.then((response) => {
						if(response.data == 1) {
							alert('更新成功！')
							this.$router.push('/admin/saleChanceList');
						} else {
							alert('更新失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			ret() {
				this.$router.push('/admin/saleChanceList');
			}
		}
	}
</script>

<style scoped>
	.demo-form-inline {
		margin-top: 15px;
	}
	.el-select{
		margin-right: 100px;
	}
	.el-button {
		margin-top: 55px;
		margin-left: 0px;
	}
</style>