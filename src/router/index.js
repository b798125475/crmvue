import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import Admin from '../views/admin.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Servercreate from '../views/serve/Servecreate.vue'
import SaleChanceList from '../views/sale/SaleChanceList.vue'
import AddSaleChance from '../views/sale/AddSaleChance.vue'
import UpdateSaleChance from '../views/sale/UpdateSaleChance.vue'
import ZhipaiSaleChance from '../views/sale/ZhipaiSaleChance.vue'
import SalePlanList from '../views/sale/SalePlanList.vue'
import AddSalePlan from '../views/sale/AddSalePlan.vue'
import UpdateSalePlan from '../views/sale/UpdateSalePlan.vue'



Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Login',
		component: login
		}, 
		{
		path: '/login',
		name: 'Login',
		component: login
		},{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		children: [{
			path: '/admin/',
			name: 'welcome',
			component: HelloWorld
		}, {
			path: '/admin/servercreate',
			name: 'Servercreate',
			component: Servercreate
		}, {
			path: '/admin/saleChanceList',
			name: 'SaleChanceList',
			component: SaleChanceList
		}, {
			path: '/admin/addSaleChance',
			name: 'AddSaleChance',
			component: AddSaleChance
		}, {
			path: '/admin/updateSaleChance',
			name: 'UpdateSaleChance',
			component: UpdateSaleChance
		}, {
			path: '/admin/zhipaiSaleChance',
			name: 'ZhipaiSaleChance',
			component: ZhipaiSaleChance
		}, {
			path: '/admin/salePlanList',
			name: 'SalePlanList',
			component: SalePlanList
		}, {
			path: '/admin/addSalePlan',
			name: 'AddSalePlan',
			component: AddSalePlan
		}, {
			path: '/admin/updateSalePlan',
			name: 'UpdateSalePlan',
			component: UpdateSalePlan
		}]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router