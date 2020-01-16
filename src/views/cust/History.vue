<template>
	<div>
				<el-breadcrumb separator="/">
			<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>联系人信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-form-item label="客户编号" prop="name">
				<el-input v-model="params.clientCode" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="客户名称" prop="name">
				<el-input v-model="params.clientName" :disabled="true"></el-input>
			</el-form-item>
		</el-form>
		
		
		<el-table :data="orderArr" style="width: 70%;">
			
			<el-table-column prop="ordersId" label="订单编号">
			</el-table-column>
			<el-table-column  prop="ordersDate" label="订单日期">
			</el-table-column>
			<el-table-column prop="ordersTotal" label="订单金额(单位万元)">
			</el-table-column>
			<el-table-column prop="remark" label="备注">
			</el-table-column>
			
		</el-table>
		<el-button @click="ret()" type="text" size="small">返回</el-button>
		<span id="money">
		总金额:	{{money}} 万元
		</span>
			
	</div>
</template>

<script>
	export default{
		data() {
			return {
				params: {
					clientCode: '',
					clientName: ''
				},
				orderArr:[],
				money:0
				
			}
		},
		created() {
			
			this.init();
		},
		mounted(){
			this.params.clientCode = this.$route.query.clientCode;
			this.params.clientName = this.$route.query.clientName;
		},
		methods:{
			init(){
				this.$axios.post('selectOrders', {
						clientCode: this.$route.query.clientCode,
						clientName: this.$route.query.clientName
					})
					.then((response) => {
						this.orderArr = response.data;
						for(let k in this.orderArr){
							this.money+=this.orderArr[k].ordersTotal;
						}
						
						
						console.log(this.money);
						
					})
					.catch((error) => {
						console.log(error);
					});
			},
			ret(){
				this.$router.push("/admin/custManagement");
			}
		}
	}
</script>

<style>
	#money{
		float: right;
		margin-right: 400px;
	}
</style>