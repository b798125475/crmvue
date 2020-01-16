<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户暂缓流失管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form :inline="true" :model="clientInfo"   label-width="100px" class="demo-form-inline">

		<el-form-item label="客户编号">
			<el-input v-model="clientInfo.clientCode" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="客户姓名">
			<el-input v-model="clientInfo.clientName" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="客户经理">
			<el-input v-model="sysUser.userName" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="上次下单时间">
			<el-input v-model="orders.ordersDate" :disabled="true"></el-input>
		</el-form-item>
		
			<el-form-item v-for="item in clientRep" label="已有暂缓措施" >
				<el-input v-model="item.reprieveStep"></el-input>
				<el-button type="primary" @click="clear(item)">删除</el-button>
			</el-form-item>
			
			<el-form-item :label="value">
				<el-input v-model="clientReprieveLose.reprieveStep"></el-input>
				<el-button @click="add()" type="primary" size="small">添加</el-button>
			</el-form-item>
		
		</el-form>
		

		<el-button type="danger" @click="show()"   size="small">用户流失</el-button>
	</div>

</template>

<script>
	export default {
		data() {
			return {

				results: {},
				allArr: [],
				clientInfo: {},
				/*用于存储客户的对象*/
				clientCode: '',
				sysUser:{},
				orders:{},
				clientRep:[],
				clientReprieveLose:{
					clientCode:'',
					reprieveStep:''
				},
				value:'追加暂缓措施',
				color:'#606266',
				
			}
		},
		created() {
			this.init();
		},
		methods: {
			init(){
				this.$axios.post('selectClientInfoById', {
					clientCode: this.$route.query.clientCode
				})
				.then((response) => {
					this.clientInfo = response.data;
					console.log(this.clientInfo);
					this.$axios.post('selectSysuserById', {
							userId: this.clientInfo.clientCustId
						})
						.then((response) => {
							/*console.log(response.data + "用户经理");*/
							this.sysUser=response.data;
						})
						.catch((error)=>{
							console.log(error);
						});
					this.$axios.post('selectOrdersByClientCode',{
						clientCode:this.$route.query.clientCode
					})
						.then((response)=>{
							console.log(response.data+"这是表单");
							this.orders=response.data;
						})
						.catch((error)=>{
							console.log(error);
						});
					this.$axios.post('selectClientReprieveLoseById',{
						clientCode:this.$route.query.clientCode
					})
						.then((response)=>{
							
							this.clientRep=response.data;
							console.log(this.clientRep);
						})
						.catch((error)=>{
							console.log(error);
						});
					
		
				})
				.catch((error) => {
					console.log(error);
				});

			},
				clear(item){
					item.reprieveStep='';
				},
				add(){
					this.$axios.post('insertClientReprieveLose',this.clientReprieveLose)
					.then((response)=>{
						if(response.data==1){
							this.init();
							this.clientReprieveLose.reprieveStep='';
						}else{
							alert('添加失败！');
						}
					})
				this.clientReprieveLose.clientCode=this.clientInfo.clientCode;
			
				},
			
			show(){
				this.$router.push({
					path: '/admin/show',
					query: {
						clientCode: this.clientInfo.clientCode
					}
				});
				console.log(this.clientInfo.clientCode+"**************************");
				
			/*	
				if(this.value=='追加暂缓措施'){
					this.value='确认流失原因';
					this.color='#F56C6C';
					this.init();
				}else{
					this.value='追加暂缓措施';
					this.color='#606266';
					this.init();
				}*/
				
				
			}
		}
	}
</script>

<style>

</style>