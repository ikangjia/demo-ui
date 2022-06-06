<template>
    <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        default-active="/"
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
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="/user"><i class="el-icon-user"></i>用户管理</el-menu-item>
        <el-menu-item index="#"><i class="el-icon-user"></i>权限管理</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
	name: "Sidebar",
  props:{
    isCollapse: Boolean,
    logoTextShow: Boolean
  }

}
</script>

<style scoped>

</style>