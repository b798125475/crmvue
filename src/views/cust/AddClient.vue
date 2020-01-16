<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>联系人管理</el-breadcrumb-item>
			<el-breadcrumb-item>新建联系人</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="params" :model="params" label-width="100px" style="margin-top: 15px;width: 500px;">
			<el-form-item label="姓名">
				<el-input v-model="params.clientLinkmanName"></el-input>
			</el-form-item>
			<el-form-item label="职位">
				<el-input v-model="params.clientLinkmanJob"></el-input>
			</el-form-item>
			<el-form-item label="手机">
				<el-input v-model="params.clientLinkmanMobile"></el-input>
			</el-form-item>
			<!-- params.clientLinkmanSex -->
			<el-form-item label="性别" prop="name">
			<el-select v-model="params.clientLinkmanSex">
				<el-option v-for="item in contentment" :label="item.sex" :value="item.k">
				</el-option>
			</el-select>
		</el-form-item>
			<el-form-item label="办公电话">
				<el-input v-model="params.clientLinkmanTel"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="params.remark"></el-input>
			</el-form-item>
			<el-form-item label="客户编号">
				<el-input v-model="params.clientCode"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="add()"   size="small" >添加</el-button>
				<el-button @click="ret()" size="small" type="primary" style="margin-top: 15px;margin-bottom: 15px;">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					clientCode:'',
					clientLinkmanName:'',
					clientLinkmanJob:'',
					clientLinkmanTel:'',
					clientLinkmanMobile:'',
					remark:'',
					clientLinkmanSex:''
				},
				contentment:[
					{
						k:0,
						sex:'男'
					},
					{
						k:1,
						sex:'女'
					}
				]
			}
		},
		
		mounted(){
			this.params.clientCode = this.$route.query.clientCode
			
		},
		methods: {
			add() {
				this.$axios.post('insertClientLinkman', this.params)
					.then((response) => {
						if (response.data == 1) {
							
							this.$router.push('/admin/custManagement');
						} else {
							alert('添加失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			ret(){
				this.$router.push("/admin/custManagement");
			},
		}
	}
</script>

<style>
</style>
