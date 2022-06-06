import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: User
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/user',
		name: 'user',
		component: User
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
