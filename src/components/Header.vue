<template>
	<div style="display: flex; font-size: 12px; line-height: 60px; ">
		<div style="flex: 1; font-size: 18px">
          <span
			  :class="collapseBtnClass"
			  style="cursor: pointer"
			  @click="collapse"
		  ></span>
		</div>
		<el-dropdown style="width: 70px" @command="handleCommand">
			<span>王小虎</span>
			<i class="el-icon-arrow-down" style="margin-left: 5px"></i>
			<el-dropdown-menu slot="dropdown" style="width: 80px">
				<el-dropdown-item command="showUserInfo">个人信息</el-dropdown-item>
				<el-dropdown-item command="logout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	name: "Header",
	props: {
		collapseBtnClass: String,
		collapse: Function
	},
	methods: {
		handleCommand(cmd) {
			if (cmd === 'logout') {
				this.$router.push('/login')
			} else if (cmd === 'showUserInfo') {
				this.$message.success('林深时觉寒')
			} else {
				this.$message.error('林深时觉寒')
			}
		}
	}
}
</script>

<style scoped>

</style>