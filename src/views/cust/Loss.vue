<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户流失管理</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-form-item label="客户名称">
				<el-input v-model.trim="params.clientName" size="small"></el-input>
			</el-form-item>
			<el-form-item label="客户经理">
				<el-input v-model.trim="params.userName" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="warning" @click="clear()" size="small">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="select()" size="small">查询</el-button>
			</el-form-item>

		</el-form>

		<el-table :data="results.data" border style="width: 100%">
			<el-table-column prop="clientCode" label="客户编号" width="100">
			</el-table-column>
			<el-table-column prop="clientInfo.clientName" label="客户名称" width="380">
			</el-table-column>
			<el-table-column prop="sysUser.userName" label="客户经理">
			</el-table-column>
			<el-table-column prop="ordersDate" label="上次下单时间">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="update(scope.row)" type="text" size="small">更新</el-button>
					<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" layout="total,prev,pager,next" :total="results.totalRow" :page-size="$store.state.maxPageNum">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				/*用于接收返回的数据*/
				pageNum: 1,
				results: {},
				params: {
					
						clientName: '',
						userName: ''
				}
			}
		},
		created() {
			this.fenye(1);
		},
		methods: {
			fenye(pageNum) {
				this.$fenye('selectLastClientOrdersCount', 'selectLastOrders', this.params, pageNum, this.$store.state.maxPageNum, (response) => {
					this.results = response;
					console.log(response.data);
				});
			},
			select() {
				//				console.log(this.params);
				this.fenye(1);
			},
			clear() {
				this.params.clientName = '';
				this.params.userName = '';
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			update(row){
				this.$router.push({
					path: '/admin/updatelast',
					query: {
						/*为了连接客户暂缓流失措施记录表  传出去的数据*/
						clientCode: row.clientCode
					}
				});

			},


		}

	}
</script>

<style>

</style>