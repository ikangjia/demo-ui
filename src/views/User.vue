<template>
	<el-container style="height: 100vh">
		<!--		左侧菜单区域-->
		<el-aside background-color="#545c64"
				  style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(1 21 41 / 35%)"
				  :width="sideWidth + 'px'">
			<el-menu
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-openeds="['2-1']"
				background-color="#545c64"
				style="min-height: 100%; overflow-x: hidden" text-color="#fff"
			>
				<div style="height: 60px; line-height: 60px; text-align: center">
					<img src="../assets/logo.png" alt="logo"
						 style="width: 20px; position: relative;top: 5px;margin-right: 5px">
					<b style="color: white">后台管理系统</b>
				</div>
				<el-menu-item index="1"><i class="el-icon-house"></i>首页</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span slot="title">系统管理</span>
					</template>
					<el-menu-item index="2-1"><i class="el-icon-user"></i>用户管理</el-menu-item>
					<el-menu-item index="2-2"><i class="el-icon-user"></i>权限管理</el-menu-item>
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
					<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				</el-breadcrumb>

				<!-- 模糊搜索区域-->
				<div style="padding: 10px 0">
					<el-input style="width: 200px;margin-left: 5px" placeholder="请输入名称"
							  suffix-icon="el-icon-user" v-model="likeSearchFields.username"></el-input>
					<el-input style="width: 200px;margin-left: 5px" placeholder="请输入昵称"
							  suffix-icon="el-icon-user" v-model="likeSearchFields.nickname"></el-input>
					<el-input style="width: 200px;margin-left: 5px" placeholder="请输入地址"
							  suffix-icon="el-icon-position" v-model="likeSearchFields.address"></el-input>
					<el-button style="margin-left: 5px" type="primary" @click="this.load">搜索</el-button>
					<el-button style="margin-left: 5px" @click="resetLikeSearch">置空</el-button>
				</div>

				<!-- 按钮区域-->
				<div style="margin: 10px 0">
					<el-button type="primary" @click="openCreateUserDialog">新增 <i
						class="el-icon-circle-plus-outline"></i></el-button>
					<el-button type="danger" @click="batchDel">批量删除 <i class="el-icon-remove-outline"></i></el-button>
					<el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
					<el-button type="primary" @click="exportAll">导出 <i class="el-icon-top"></i></el-button>
				</div>

				<!-- 表格区域 -->
				<el-table :data="tableData" border stripe ref="tableData">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column label="id" prop="id" width="50"></el-table-column>
					<el-table-column label="用户名" prop="username" width="120"></el-table-column>
					<el-table-column label="昵称" prop="nickname" width="120"></el-table-column>
					<el-table-column label="邮箱" prop="email" width="150"></el-table-column>
					<el-table-column label="手机号" prop="phone" width="120"></el-table-column>
					<el-table-column label="地址" prop="address" width="200"></el-table-column>
					<el-table-column label="创建时间" prop="createTime" width="150"></el-table-column>

					<el-table-column>
						<template slot-scope="scope">
							<el-button type="info" @click="openDetailUserDialog(scope.row.id)">详情 <i
								class="el-icon-search"></i></el-button>
							<el-button type="warning" @click="openUpdateUserDialog(scope.row.id)">编辑 <i
								class="el-icon-edit"></i></el-button>
							<el-button type="danger" @click="del(scope.row.id)">删除 <i
								class="el-icon-remove-outline"></i>
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页区域 -->
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

				<!-- 对话框与弹框区域 -->
				<el-dialog title="新增用户" :visible.sync="userCreateDialogFormVisible" width="500px">
					<el-form :model="form" :rules="rules" ref="form">
						<el-form-item label="用户名" label-width="80px" prop="username">
							<el-input v-model="form.username" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="昵称" label-width="80px" prop="nickname">
							<el-input v-model="form.nickname" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" label-width="80px" prop="email">
							<el-input v-model="form.email" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="手机号" label-width="80px" prop="phone">
							<el-input v-model="form.phone" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="地址" label-width="80px" prop="address">
							<el-input v-model="form.address" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="userCreateDialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="addUser('form')">确 定</el-button>
					</div>
				</el-dialog>

				<el-dialog title="修改用户" :visible.sync="userUpdateDialogFormVisible" width="500px">
					<el-form :model="formUpdate" :rules="rules" ref="formUpdate">
						<el-form-item label="ID" label-width="80px">
							<el-input v-model="formUpdate.id" autocomplete="off" style="width: 150px"
									  readonly></el-input>
						</el-form-item>
						<el-form-item label="用户名" label-width="80px" prop="username">
							<el-input v-model="formUpdate.username" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="昵称" label-width="80px" prop="nickname">
							<el-input v-model="formUpdate.nickname" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" label-width="80px" prop="email">
							<el-input v-model="formUpdate.email" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="手机号" label-width="80px" prop="phone">
							<el-input v-model="formUpdate.phone" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="地址" label-width="80px" prop="address">
							<el-input v-model="formUpdate.address" autocomplete="off" style="width: 150px"></el-input>
						</el-form-item>
						<el-form-item label="创建时间" label-width="80px">
							<el-input v-model="formUpdate.createTime" autocomplete="off" style="width: 150px"
									  readonly></el-input>
						</el-form-item>
						<el-form-item label="修改时间" label-width="80px">
							<el-input v-model="formUpdate.updateTime" autocomplete="off" style="width: 150px"
									  readonly></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="userUpdateDialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="updateUser('formUpdate')">确 定</el-button>
					</div>
				</el-dialog>

				<el-dialog title="用户详情" :visible.sync="userDetailVisible" width="800px">
					<el-descriptions title="用户信息" :column="2" border>
						<template slot="extra">
							<el-button type="primary" size="small" @click="exportUserDetailInfo">导出信息</el-button>
						</template>
						<el-descriptions-item label="ID">{{ userDetail.id }}</el-descriptions-item>
						<el-descriptions-item label="用户名">{{ userDetail.username }}</el-descriptions-item>
						<el-descriptions-item label="昵称">{{ userDetail.nickname }}</el-descriptions-item>
						<el-descriptions-item label="邮箱">{{ userDetail.email }}</el-descriptions-item>
						<el-descriptions-item label="手机号">{{ userDetail.phone }}</el-descriptions-item>
						<el-descriptions-item label="地址">{{ userDetail.address }}</el-descriptions-item>
						<el-descriptions-item label="创建时间">{{ userDetail.createTime }}</el-descriptions-item>
						<el-descriptions-item label="修改时间">{{ userDetail.updateTime }}</el-descriptions-item>
					</el-descriptions>
				</el-dialog>
			</el-main>

		</el-container>
	</el-container>
</template>

<script>
export default {
	name: "user",
	data() {
		return {
			userDetail: {},
			userDetailVisible: false,
			form: {},
			userCreateDialogFormVisible: false,
			formUpdate: {},
			userUpdateDialogFormVisible: false,
			// 模糊搜索字段
			likeSearchFields: {
				username: '',
				nickname: '',
				address: ''
			},
			// 表格数据
			tableData: [],

			// 分页字段
			total: 0,
			pageSize: 10,
			pageNum: 1,

			// 样式相关
			collapseBtnClass: "el-icon-s-fold",
			isCollapse: false,
			sideWidth: 200,
			rules: {
				username: [
					{required: true, message: '请输入用户名', trigger: 'blur'},
					{min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
				],
				nickname: [
					{required: true, message: '请输入昵称', trigger: 'blur'},
					{min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
				],
				email: [
					{required: true, message: '请输入邮箱地址', trigger: 'blur'},
					{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
				],
				phone: [
					{pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
				],
				address: [
					{min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
				]
			}
		};
	},
	created() {
		this.load()
	},
	methods: {
		// 导出所有用户信息
		exportAll() {
			window.location.href = "http://localhost:12001/user/export"
		},
		// 用户详情页面点击导出用户信息为 Excel
		exportUserDetailInfo() {
			// 该方法会新开一个页面，再弹窗选择下载地址操作，显然不友好
			// window.open("http://localhost:12001/user/export/" + this.userDetail.id)
			// 直接再当前页面弹出下载窗口
			window.location.href = "http://localhost:12001/user/export/" + this.userDetail.id
		},
		//  打开查看用户详情对话框
		openDetailUserDialog(id) {
			this.request.get("/user/" + id)
				.then(res => {
					if (res.code === 0) {
						this.userDetail = res.data
					} else {
						this.$message.error(res.message)
					}
				})
			this.userDetailVisible = true
		},
		// 打开创建新用户对话框
		openCreateUserDialog() {
			this.userCreateDialogFormVisible = true
			this.form = {};
		},
		//  打开修改用户对话框
		openUpdateUserDialog(id) {
			this.request.get("/user/" + id)
				.then(res => {
					if (res.code === 0) {
						this.formUpdate = res.data
					} else {
						this.$message.error(res.message)
					}
				})
			this.userUpdateDialogFormVisible = true
		},
		// 删除用户
		del(id) {
			this.$confirm('确认要删除该用户?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.request.delete("/user/" + id)
					.then(res => {
						if (res.code === 0) {
							this.$message.success("删除用户成功~")
							this.load()
						} else {
							this.$message.error(res.message)
						}
					})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		// 批量删除用户
		batchDel() {
			let idList = []
			this.$refs.tableData.selection.forEach(row => {
				idList.push(row.id)
			})
			if (idList.length === 0) {
				this.$message.warning("未选中任何数据")
				return false;
			}
			this.$confirm('确认要批量删除这些用户吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.request.delete("/user/del/batch", {
					params: {
						ids: idList.toString()
					}
				}).then(res => {
					if (res.code === 0) {
						this.$message.success("删除用户成功~")
						this.load()
					} else {
						this.$message.error(res.message)
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		// 添加用户
		addUser(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.request.post("/user", this.form)
						.then(res => {
							if (res.code === 0) {
								this.$message.success("添加用户成功~")
								this.load()
								this.form = {}
								this.userCreateDialogFormVisible = false
							} else {
								this.$message.error(res.message)
							}
						})
				} else {
					return false
				}
			})
		},
		// 修改用户
		updateUser(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.request.post("/user", this.formUpdate)
						.then(res => {
							if (res.code === 0) {
								this.$message.success("修改用户成功~")
								this.load()
								this.form = {}
								this.userUpdateDialogFormVisible = false
							} else {
								this.$message.error(res.message)
							}
						})
				} else {
					return false
				}
			})
		},

		// 模糊搜索重置事件处理
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

		// 点击收缩按钮触发侧边栏收缩
		collapse() {
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

		// 加载表格数据，这是个复用度很高的方法
		load() {
			this.request.get("/user", {
				params: {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					username: this.likeSearchFields.username,
					nickname: this.likeSearchFields.nickname,
					address: this.likeSearchFields.address,
				}
			}).then(res => {
				this.tableData = res.data.userDTOList
				this.total = res.data.total
			})
		}
	},
};
</script>

