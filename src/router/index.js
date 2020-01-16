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

import Management from '../views/cust/Management.vue'
import UpdateCustmerchurn from '../views/cust/UpdateCustmerchurn.vue'
import AddClient from '../views/cust/AddClient.vue'
import History from '../views/cust/History.vue'
import ShowPeople from '../views/cust/ShowPeople.vue'
import UpdatePeople from '../views/cust/UpdatePeople.vue'
import Loss from '../views/cust/Loss.vue'
import UpdateLast from '../views/cust/UpdateLast.vue'
import Show from '../views/cust/show.vue'



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
		},{
			path:'/admin/custManagement',
			name:'Management',
			component:Management
		},
		{
			path:'/admin/updateCustmerchurn',
			name:'UpdateCustmerchurn',
			component:UpdateCustmerchurn
		},
		{
			path:'/admin/addClient',
			name:'AddClient',
			component:AddClient
		},
		{
			path:'/admin/history',
			name:'history',
			component:History
		},{
			path:'/admin/showpeople',
			name:'showPeople',
			component:ShowPeople
		},{
			path:'/admin/updatepeople',
			name:'updatepeople',
			component:UpdatePeople
		},{
			path:'/admin/loss',
			name:'loss',
			component:Loss
		},{
			path:'/admin/updatelast',
			name:'updatelast',
			component:UpdateLast
		},{
			path:'/admin/show',
			name:'show',
			component:Show
		}]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router