<template>
	<el-container style="height: 100vh">
		<!--		左侧菜单区域-->
		<el-aside background-color="#545c64"
				  style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(1 21 41 / 35%)"
				  :width="sideWidth + 'px'">
			<el-menu
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-openeds="['1', '3']"
				background-color="#545c64"
				style="min-height: 100%; overflow-x: hidden" text-color="#fff"
			>
				<div style="height: 60px; line-height: 60px; text-align: center">
					<img src="../assets/logo.png" alt="logo"
						 style="width: 20px; position: relative;top: 5px;margin-right: 5px">
					<b v-show="logoTextShow" style="color: white">后台管理系统</b>
				</div>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-message"></i>
						<span slot="title">导航一</span>
					</template>
					<el-menu-item index="1-1">选项1</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-menu"></i>
						<span slot="title">导航二</span></template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项4-1</el-menu-item>
					</el-submenu>
				</el-submenu>
			</el-menu>

		</el-aside>

		<el-container>
			<!--  头部区域  -->
			<el-header style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex; ">
				<div style="flex: 1; font-size: 18px">
          <span
			  :class="collapseBtnClass"
			  style="cursor: pointer"
			  @click="collapse"
		  ></span>
				</div>
				<el-dropdown style="width: 70px">
          <span>王小虎</span
		  ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人信息</el-dropdown-item>
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>

			<!-- 主体区域 -->
			<el-main>
				<el-breadcrumb style="margin-bottom: 10px" separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>活动管理</el-breadcrumb-item>
					<el-breadcrumb-item>活动列表</el-breadcrumb-item>
					<el-breadcrumb-item>活动详情</el-breadcrumb-item>
				</el-breadcrumb>

				<div style="padding: 10px 0">
					<el-input style="width: 200px;margin-left: 5px" placeholder="请输入名称"
							  suffix-icon="el-icon-user" v-model="likeSearchFields.username"></el-input>
					<el-input style="width: 200px;margin-left: 5px" placeholder="请输入昵称"
							  suffix-icon="el-icon-user" v-model="likeSearchFields.nickname"></el-input>
					<el-input style="width: 200px;margin-left: 5px" placeholder="请输入地址"
							  suffix-icon="el-icon-position" v-model="likeSearchFields.address"></el-input>
					<el-button style="margin-left: 5px" type="primary" @click="likeSearch">搜索</el-button>
					<el-button style="margin-left: 5px" @click="resetLikeSearch">置空</el-button>
				</div>

				<div style="margin: 10px 0">
					<el-button type="primary">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
					<el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
					<el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
					<el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
				</div>

				<el-table :data="tableData" border stripe>
					<el-table-column label="id" prop="id" width="50"></el-table-column>
					<el-table-column label="用户名" prop="username" width="120"></el-table-column>
					<el-table-column label="昵称" prop="nickname" width="120"></el-table-column>
					<el-table-column label="邮箱" prop="email" width="150"></el-table-column>
					<el-table-column label="手机号" prop="phone" width="120"></el-table-column>
					<el-table-column label="地址" prop="address" width="200"></el-table-column>
					<el-table-column label="创建时间" prop="createTime" width="150"></el-table-column>

					<el-table-column>
						<template slot-scope="scope">
							<el-button type="warning">编辑 <i class="el-icon-edit"></i></el-button>
							<el-button type="success">删除 <i class="el-icon-remove-outline"></i></el-button>
						</template>
					</el-table-column>
				</el-table>

				<div style="padding: 10px 0">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:page-sizes="[5, 10, 20, 50]"
						:page-size="pageSize"
						:current-page="pageNum"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</div>
			</el-main>

		</el-container>
	</el-container>
</template>

<script>

import request from "@/utils/request";

export default {
	name: "Home",
	data() {
		return {
			likeSearchFields: {
				username: '',
				nickname: '',
				address: ''
			},
			tableData: [],
			total: 0,
			pageSize: 10,
			pageNum: 1,
			collapseBtnClass: "el-icon-s-fold",
			isCollapse: false,
			sideWidth: 200,
			logoTextShow: true,
		};
	},
	created() {
		this.load()
	},
	methods: {
		likeSearch() {
			this.load()
		},
		resetLikeSearch() {
			this.likeSearchFields.username = ''
			this.likeSearchFields.nickname = ''
			this.likeSearchFields.address = ''
			this.load()
		},
		handleSizeChange(pageSize) {
			this.pageSize = pageSize
			this.load()
		},
		handleCurrentChange(pageNum) {
			this.pageNum = pageNum
			this.load()
		},
		collapse() { // 点击收缩按钮触发
			this.isCollapse = !this.isCollapse;
			if (this.isCollapse) {
				this.sideWidth = 64
				this.collapseBtnClass = 'el-icon-s-unfold'
				this.logoTextShow = false
			} else {
				this.sideWidth = 200
				this.collapseBtnClass = 'el-icon-s-fold'
				this.logoTextShow = true
			}
		},
		load() {
			fetch('http://localhost:12001/user?pageNum=' + this.pageNum
				+ '&pageSize=' + this.pageSize
				+ '&username=' + this.likeSearchFields.username
				+ '&nickname=' + this.likeSearchFields.nickname
				+ '&address=' + this.likeSearchFields.address)
				.then(res => res.json())
				.then(res => {
					console.log(res)
					this.tableData = res.data.userDTOList;
					this.total = res.data.total
				})
		}
	},
};
</script>

