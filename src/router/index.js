import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Login from "@/views/Login";
import User from "@/views/system/User";
import Welcome from "@/views/Welcome";
import Permission from "@/views/system/Permission";
import AuditLog from "@/views/system/AuditLog";
import Metadata from "@/views/data/Metadata";
import Sites from "@/views/geek/Sites";
import Tag from "@/views/relationship/Tag";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Main,
		redirect: '/welcome',
		children: [
			{
				path: 'welcome',
				name: 'Welcome',
				alwaysShow: true,
				component: Welcome,
				meta: {title: '首页', icon: 'el-icon-house'}
			},
		]
	},
	{
		path: '/geek',
		name: '极客生活',
		component: Main,
		alwaysShow: true,
		meta: {title: '首页', icon: 'el-icon-apple'},
		children: [
			{
				path: 'sites',
				name: 'Sites',
				component: Sites,
				meta: {title: '个人站点', icon: 'el-icon-star-on'}
			},
		]
	},
	{
		path: '/data',
		component: Main,
		name: '数据管理',
		alwaysShow: true,
		meta: {title: '数据管理', icon: 'el-icon-s-data'},
		children: [
			{
				path: 'metadata',
				name: 'Metadata',
				component: Metadata,
				meta: {title: '元数据管理', icon: 'el-icon-paperclip'}
			},
		]
	},
	{
		path: '/relationship',
		name: '人际关系',
		component: Main,
		alwaysShow: true,
		meta: {title: '人际关系', icon: 'el-icon-phone'},
		children: [
			{
				path: 'tag',
				name: 'Tag',
				component: Tag,
				meta: {title: '标签', icon: 'el-icon-price-tag'}
			},
		]
	},
	{
		path: '/system',
		name: '系统设置',
		component: Main,
		alwaysShow: true,
		meta: {title: '系统设置', icon: 'el-icon-s-tools'},
		children: [
			{
				path: 'user',
				name: 'User',
				component: User,
				meta: {title: '用户管理', icon: 'el-icon-user-solid'}
			},
			{
				path: 'permission',
				name: 'Permission',
				component: Permission,
				meta: {title: '权限管理', icon: 'el-icon-s-release'}
			},
			{
				path: 'auditLog',
				name: 'AuditLog',
				component: AuditLog,
				meta: {title: '审计日志', icon: 'el-icon-document'}
			},
		]
	},
	{
		path: '/login',
		name: '登陆页面',
		component: Login
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
