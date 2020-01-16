<template>

	<el-form :inline="true" :model="clientInfo" :lable-position="lablePosition" :rules="rules" label-width="100px" class="demo-form-inline">

		<el-form-item label="客户编号" prop="name">
			<el-input v-model="clientInfo.clientCode" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="客户名称" prop="name">
			<el-input v-model="clientInfo.clientName" placeholder="客户名称"></el-input>
		</el-form-item>
		<el-form-item label="地区" prop="name">
			<el-select v-model="clientInfo.clientAreaId">
				<el-option v-for="item in dataArea" :label="item.daName" :value="item.daId">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="客户等级" prop="name">
			<el-select v-model="clientInfo.clientLevelId">
				<el-option v-for="item in clientLevel" :label="item.dclName" :value="item.dclId">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="客户满意度" prop="name">
			<el-select v-model="clientInfo.clientContentment">
				<el-option v-for="item in contentment" :label="item.k" :value="item.myd">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="法人" prop="name">
			<el-input v-model="clientInfo.clientCorporation"></el-input>
		</el-form-item>
		<el-form-item label="开户银行" prop="name">
			<el-input v-model="clientInfo.clientBank"></el-input>
		</el-form-item>
		<el-form-item label="银行账号" prop="name">
			<el-input v-model="clientInfo.clientAccounts"></el-input>
		</el-form-item>
		<el-form-item label="地址" prop="name">
			<el-input v-model="clientInfo.clientAddress"></el-input>
		</el-form-item>
		<el-form-item label="电话" prop="name">
			<el-input v-model="clientInfo.clientTel"></el-input>
		</el-form-item>
		<el-form-item label="传真" prop="name">
			<el-input v-model="clientInfo.clientFax"></el-input>
		</el-form-item>
		<el-form-item label="邮政编码">
			<el-input v-model="clientInfo.clientDakCode"></el-input>
		</el-form-item>
		<el-form-item label="网址" prop="name">
			<el-input v-model="clientInfo.clientNet"></el-input>
		</el-form-item>
		<el-form-item label="营业执照注号">
			<el-input v-model="clientInfo.clientCharter"></el-input>
		</el-form-item>
		<el-form-item label="注册资金">
			<el-input v-model="clientInfo.clientBankroll"></el-input>
		</el-form-item>
		<el-form-item label="年营业额">
			<el-input v-model="clientInfo.clientTurnoverYear"></el-input>
		</el-form-item>
		<el-form-item label="地税登记号">
			<el-input v-model="clientInfo.clientNativeTax"></el-input>
		</el-form-item>
		<el-form-item label="国税登记号">
			<el-input v-model="clientInfo.clientCountryTax"></el-input>
		</el-form-item>

		<el-button type="primary" @click="update()">更新</el-button>
		<el-button type="primary" @click="ret()">返回</el-button>
		</el-form-item>

	</el-form>

</template>

<script>
	export default {
		data() {
			return {
				labelPosition: 'left',
				clientInfo: {
					clientName: '',
					clientAreaId: '',
					clientLevelId: '',
					/*客户满意度*/
					clientContentment: 0,
					clientCredit: '',
					clientCorporation: '',
					clientBank: '',
					clientAccounts: '',
					clientAddress: '',
					clientTel: '',
					clientFax: '',
					clientDakCode: '',
					clientNet: '',
					clientCharter: '',
					clientBankroll: '',
					clientTurnoverYear: '',
					clientCountryTax: '',
					clientNativeTax: '',
					daId: ''

				},
				/*接受客户等级的数组*/
				clientLevel: [],
				/*接受地区的数组*/
				dataArea: [],
				/*客户满意度*/
				k: '',
				contentment: [{
						myd: 1,
						k: '☆'
					},
					{
						myd: 2,
						k: '☆☆'
					},
					{
						myd: 3,
						k: '☆☆☆'
					},
					{
						myd: 4,
						k: '☆☆☆☆'
					},
					{
						myd: 5,
						k: '☆☆☆☆☆'
					}
				],
				lablePosition: 'top',
				rules: {
					name: [{
						required: true,
						message: '请输入数据',
						trigger: 'blur'
					}]
				}

			}
		},
		created() {
			this.$axios.post('selectDataArea')
				.then((response) => {
					this.dataArea = response.data;
					this.clientInfo.daId = this.dataArea[0].daId;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectDataClientLevel')
				.then((response) => {

					this.clientLevel = response.data;
					console.log(this.clientLevel + "返回的客户等级");
					this.clientInfo.dclId = this.clientLevel[0].dclId;
				})
				.catch((error) => {
					console.log(error);
				});
			this.$axios.post('selectClientInfoById', {
					clientCode: this.$route.query.clientCode
				})
				.then((response) => {
					this.clientInfo = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
		},
		methods: {
			update() {
				this.$axios.post('updateClientById', this.clientInfo)
					.then((response) => {
						if(response.data == 1) {
							this.$router.push('/admin/custManagement');
						} else {
							alert('更新失败！');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			ret() {
				this.$router.push("/admin/custManagement");
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
	
	.el-select {
		width: 206px;
	}
</style>