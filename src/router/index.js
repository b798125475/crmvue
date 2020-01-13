import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import Admin from '../views/admin.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Servercreate from '../views/serve/Servecreate.vue'
import SaleChanceList from '../views/sale/SaleChanceList.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Login',
		component: login
	},
	{
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
		}]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router