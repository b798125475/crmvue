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

		<el-button @click="add()" size="small" type="primary" style="margin-top: 15px;margin-bottom: 15px;">新建联系人</el-button>
		<el-button @click="ret()" size="small" type="primary" style="margin-top: 15px;margin-bottom: 15px;">返回</el-button>
		<el-table :data="clientList" style="width: 70%;">
			<el-table-column prop="clientLinkmanId" label="联系人编号" width="100">
			</el-table-column>
			<el-table-column prop="clientLinkmanName" label="联系人姓名">
			</el-table-column>
			<el-table-column :formatter="formatRole" prop="clientLinkmanSex" label="性别">
			</el-table-column>
			<el-table-column prop="clientLinkmanJob" label="职位">
			</el-table-column>
			<el-table-column prop="clientLinkmanTel" label="办公电话">
			</el-table-column>
			<el-table-column prop="clientLinkmanMobile" label="手机">
			</el-table-column>
			<el-table-column prop="remark" label="备注">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="update(scope.row)" type="text" size="small">更新</el-button>
					<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					clientCode: '',
					clientName: ''
				},
				clientList: []
			}
		},
		created() {
			
			this.init();
		},
		mounted(){
			this.params.clientCode = this.$route.query.clientCode;
			this.params.clientName = this.$route.query.clientName;
		},
		methods: {
			init() {
				this.$axios.post('selectClientLinkmanById', {
						clientCode: this.$route.query.clientCode,
						clientName: this.$route.query.clientName
					})
					.then((response) => {
						this.clientList = response.data;

						console.log(this.params.clientName);
						
					})
					.catch((error) => {
						console.log(error);
					});
			},
			formatRole: function(row, column) {
				return row.clientLinkmanSex == '0' ? "男" : row.clientLinkmanSex == '1' ? "女" : "???";
			},
			ret(){
				this.$router.push("/admin/custManagement");
			},
			add(){
				this.$router.push(
					{path:'/admin/addClient',
					query:{
						clientCode:this.params.clientCode
					}
				});
			},
			del(row){
				if (!confirm('确定要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteClientLinkman', {
						clientLinkmanId: row.clientLinkmanId
					})
					.then((response) => {
						if (response.data == 1) {
							this.init();
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			update(row){
				this.$router.push(
					{path:'/admin/updatepeople',
					query:{
						clientLinkmanId:row.clientLinkmanId
					}
				});
			}
			}
			
		}
	
</script>

<style>

</style>