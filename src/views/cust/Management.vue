<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
		</el-breadcrumb>
	<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-form-item label="客户编号">
				<el-input v-model.trim="params.clientCode" size="small" style="width: 80px;"></el-input>
			</el-form-item>
			<el-form-item label="名称">
				<el-input v-model.trim="params.clientName" size="small" style="width: 80px;"></el-input>
			</el-form-item>
			
			<el-form-item label="客户经理">
				<el-select v-model="sysUser.userId">
				    <el-option v-for="item in sysUser" :label="item.userName" :value="item.userId">
					</el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="地区">
				<el-select v-model="dataArea.daId">
				    <el-option v-for="item in dataArea" :label="item.daName" :value="item.daId">
					</el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="客户等级">
				<el-select v-model="clientLevel.dclId">
				    <el-option v-for="item in clientLevel" :label="item.dclName" :value="item.dclId">
					</el-option>
				</el-select>
			</el-form-item>

			
			<el-form-item>
				<el-button type="warning" @click="clear()" size="small">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="select()" size="small">查询</el-button>
			</el-form-item>
</el-form>

	<el-table :data="results.data" border style="width: 100%">
		<el-table-column fixed prop="clientCode" label="客户编号" width="200">
		</el-table-column>
		<el-table-column prop="clientName" label="客户姓名" width="180">
		</el-table-column>
		<el-table-column prop="sysUser.userName" label="客户经理" width="180">
		</el-table-column>
		<el-table-column prop="dataClientLevel.dclName" label="客户等级" width="180">
		</el-table-column>
		<el-table-column prop="dataArea.daName" label="地区" width="180">
		</el-table-column>

		<el-table-column fixed="right" label="操作" width="250">
			<template slot-scope="scope">
				<el-button @click="update(scope.row)"  type="text"  >编辑</el-button>
				<el-button @click="showpeople(scope.row)"  type="text" >联系人</el-button>
				<el-button @click="show(scope.row)"  type="text" >历史订单</el-button>
				<el-button type="text"  @click='del(scope.row)'>删除</el-button>
			</template>
		</el-table-column>
	</el-table>
			<el-pagination background @current-change="handleCurrentChange" layout="total,prev,pager,next,jumper" :total="results.totalRow"
		 :page-size="$store.state.maxPageNum">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'selectAllClient',
		data() {
			return {
				pageNum: 1, //此数据专用于文本框中用户输入的页数
				results: {},
				params: {
					clientCode:'',
					clientName:''
					
				},
				/*销售经理的数组*/
				sysUser:[],
				/*地区的数据*/
				dataArea:[],
				/*客户等级的数组*/
				clientLevel:[]
				
			}
		},
		created() {
			this.fenye(1);
			this.$axios.post('selectSysuser')
				.then((response) => {
					this.sysUser = response.data;
					console.log(this.sysUser);
					this.params.userId=this.sysUser[0].userId;
				})
				.catch((error) => {
					console.log(error);
				});
				this.$axios.post('selectDataArea')
					.then((response)=>{
						this.dataArea = response.data;
						this.params.daId=this.dataArea[0].daId;
					})
					.catch((error) => {
					console.log(error);
				});
				this.$axios.post('selectDataClientLevel')
					.then((response)=>{
						
						this.clientLevel = response.data;
						console.log(this.clientLevel);
						this.params.dclId=this.clientLevel[0].dclId;
					})
					.catch((error) => {
					console.log(error);
				});
				

		},
		methods: {
				fenye(pageNum) {
				this.$fenye('selectClientCount', 'selectClientPaging', this.params, pageNum, this.$store.state.maxPageNum, (response) => {
					this.results = response;
					console.log(this.results);
				});
			},
				clear() {
					this.params.clientCode = '';
					this.params.clientName = '';
					this.clientLevel.dclId = '请选择';
					this.dataArea.daId = '请选择';
					this.sysUser.userId = '请选择';
			},
				select() {
					this.fenye(1);
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			update(row){
				this.$router.push({
					path: '/admin/updateCustmerchurn',
					query: {
						clientCode: row.clientCode
					}
				});

			},
			del(row) {
				if (!confirm('确认要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteClientById', {
						clientCode: row.clientCode
					})
					.then((response) => {
						if (response.data == 1) {
							this.fenye(1);
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			add(row){
				this.$router.push({
					path: '/admin/addClient',
					query: {
						clientCode: row.clientCode
					}
				});
			},
			show(row){
				this.$router.push({
					path: '/admin/history',
					query: {
						clientCode: row.clientCode,
						clientName:row.clientName
					}
				});
				
			},
			showpeople(row){
				this.$router.push(
					{path:'/admin/showpeople',
					query:{
						clientCode:row.clientCode,
						clientName:row.clientName
					}
				});
				}
			
			}

		}
</script>

<style>

</style>