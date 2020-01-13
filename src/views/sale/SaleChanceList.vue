<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="params" class="demo-form-inline">
			<el-form-item label="客户名称">
				<el-input v-model.trim="params.chanceCustName" size="small"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model.trim="params.chanceTitle" size="small"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model.trim="params.chanceLinkman" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="warning" @click="clear()" size="small">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="select()" size="small">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="add()" size="small">新建</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="results.data" style="width: 80%;margin-bottom: 15px;" @selection-change="handleSelectionChange">			
			<el-table-column prop="chanceId" label="编号" width="50px">
			</el-table-column>
			<el-table-column prop="chanceCustName" label="客户名称" >
			</el-table-column>
			<el-table-column prop="chanceTitle" label="概要" width="200px">
			</el-table-column>
			<el-table-column prop="chanceLinkman" label="联系人" width="100px">
			</el-table-column>
			<el-table-column prop="chanceTel" label="联系人电话">
			</el-table-column>
			<el-table-column prop="chanceCreateDate" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="150px">
				<template slot-scope="scope">
					<el-button @click="" type="text" size="small">指派</el-button>
					<el-button @click="update(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
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
		data() {
			return {
				pageNum: 1, //此数据专用于文本框中用户输入的页数
				results: {},
				params: {
					chanceCustName: '',
					chanceTitle: '',
					chanceLinkman: ''
				},
				multipleSelection:[]  //此数据专用于批量删除
			}
		},
		created() {
			this.fenye(1);
		},
		methods: {
			fenye(pageNum) {
				this.$fenye('selectSaleChanceCount', 'selectSaleChancePaging', this.params, pageNum, this.$store.state.maxPageNum, (response) => {
					this.results = response;
				});
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			select() {
				this.fenye(1);
			},
			clear() {
				this.params.chanceCustName = '';
				this.params.chanceTitle = '';
				this.params.chanceLinkman = '';
			},
			del(row) {
				if (!confirm('确认要删除此数据吗？')) {
					return;
				}
				this.$axios.post('deleteNews', {
						newsId: row.newsId
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
			delBatch() {
				if (this.multipleSelection.length <= 0) {
					alert('请选择要删除的数据！');
					return;
				}
				if (!confirm('确认要删除这些数据吗？')) {
					return;
				}
				//由于服务器端需要int数组参数来批量删除，所以这里将对象数组中的id抽取出来成为一个新数组
				let paramArr = [];
				for(let i=0;i<this.multipleSelection.length;i++){
					paramArr[i]=this.multipleSelection[i].newsId;
				}
				this.$axios.post('deleteNewsBatch', paramArr)
					.then((response) => {
						if (response.data > 0) {
							this.fenye(1);
						} else {
							alert('删除失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			update(row) {
				this.$router.push({
					path: '/admin/updateNews',
					query: {
						newsId: row.newsId
					}
				});
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			add(){
				this.$router.push('/admin/addNews');
			}
		}
	}
</script>

<style scoped>
	.demo-form-inline {
		margin-top: 15px;
	}
</style>