<template>
	<el-menu
		:collapse="isCollapse"
		:collapse-transition="false"
		router
		default-active="/"
		:unique-opened="true"
		background-color="#545c64"
		style="min-height: 100%; overflow-x: hidden" text-color="#fff"
	>
		<div style="height: 60px; line-height: 60px; text-align: center">
			<img src="../assets/logo.png" alt="logo"
				 style="width: 20px; position: relative;top: 5px;margin-right: 5px">
			<b style="color: white" v-show="logoTextShow">后台管理系统</b>
		</div>
		<el-menu-item index="/">
			<i class="el-icon-house"></i>
			<span slot="title">首页</span>
		</el-menu-item>
		<el-submenu :index="route.path" v-if="route.alwaysShow" v-for="route in this.$router.options.routes" :key="route.path">
			<template slot="title">
				<i :class="route.meta.icon"></i>
				<span slot="title">{{route.name}}</span>
			</template>
			<el-menu-item :index="route.path + '/' + menuItem.path" :key="menuItem.path" v-for="menuItem in route.children">
				<i :class="menuItem.meta.icon"></i>{{menuItem.meta.title}}
			</el-menu-item>
		</el-submenu>

	</el-menu>
</template>

<script>
export default {
	name: "Sidebar",
	props: {
		isCollapse: Boolean,
		logoTextShow: Boolean
	}

}
</script>

<style scoped>

</style>