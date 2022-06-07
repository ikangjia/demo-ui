<template>
	<div class="wrapper">
		<div class="login-box">
			<h2 style="text-align: center">登录</h2>
			<el-input size="medium" style="margin-top: 30px;margin-bottom: 15px" placeholder="账号"
					  prefix-icon="el-icon-user" v-model="username"></el-input>
			<el-input size="medium" placeholder="密码" prefix-icon="el-icon-lock" show-password
					  v-model="password"></el-input>
			<el-input size="small" style="width: 120px;margin-right: 20px;margin-top: 15px" placeholder="验证码" v-model="code"></el-input>
			<img src="" alt="aaa">

			<div style="margin-top: 20px; text-align: center">
				<el-button size="medium" type="primary" style="width: 100px;margin-right: 30px" round @click="doLogin">登录</el-button>
				<el-button size="medium" plain style="width: 100px" round>注册</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			username: '',
			password: '',
			code: ''
		}
	},
	methods: {
		doLogin() {
			this.$router.push("/user")
		}
	}
}
</script>

<style scoped>
.wrapper {
	height: 100vh;
	background-image: linear-gradient(to bottom right, #3606FF, #f13606);
	overflow: hidden;
}

.login-box {
	width: 350px;
	height: 300px;
	margin: 200px auto;
	padding: 20px;
	border-radius: 10px;
	background-color: #fff
}
</style>