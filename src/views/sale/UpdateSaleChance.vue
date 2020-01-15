<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>编辑销售机会</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form :inline="true" :model="saleChance" :label-position="labelPosition"  class="demo-form-inline">

			<el-form-item  label="销售机会编号">
				<el-input v-model.trim="saleChance.chanceId" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item :rules="[{required: true}]" label="客户名称" >
				<el-input v-model.trim="saleChance.chanceCustName" size="small"></el-input>
			</el-form-item>
			<el-form-item label="机会来源">
				<el-input v-model.trim="saleChance.chanceSource" size="small"></el-input>
			</el-form-item>

			<el-form-item label="成功几率(%)" :rules="[{required: true}]">
				<el-input v-model.trim="saleChance.chanceRate" size="small"></el-input>
			</el-form-item>

			<el-form-item label="概要" :rules="[{required: true}]">
				<el-input v-model.trim="saleChance.chanceTitle" size="small"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model.trim="saleChance.chanceLinkman" size="small"></el-input>
			</el-form-item>
			<el-form-item label="联系人电话">
				<el-input v-model.trim="saleChance.chanceTel" size="small"></el-input>
			</el-form-item>

			<el-form-item label="创建人">
				<el-input v-model.trim="sysUser.userName" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model.trim="saleChance.chanceCreateDate" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model.trim="saleChance.chanceDesc"></el-input>
			</el-form-item>
			<el-form-item label="">
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="update()" size="small">保存</el-button>
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
				sysUser: {}
			}
		},
		created() {
			this.$axios.post('selectSaleChanceBychanceId', {
					chanceId: this.$route.query.chanceId
				})
				.then((response) => {
					this.saleChance = response.data;
					console.log(this.saleChance);
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectSysUserByuserId', {
					userId: this.$route.query.chanceCreateId
				})
				.then((response) => {
					this.sysUser = response.data;
					console.log(this.sysUser);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		methods: {
			update() {
				if(this.saleChance.chanceCustName==''||this.saleChance.chanceRate==''||this.saleChance.chanceTitle==''){
					alert('*号数据不能为空!');
					return;
				}
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
	
	.el-form-item {
		padding-right: 150px;
	}
	
	.el-button {
		margin-top: 50px;
		margin-left: -170px;
	}
</style>