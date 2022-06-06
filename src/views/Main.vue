<template>
  <el-container style="height: 100vh">
    <!--		左侧菜单区域-->
    <el-aside background-color="#545c64"
              style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(1 21 41 / 35%)"
              :width="sideWidth + 'px'">
      <Sidebar :isCollapse="isCollapse" :logo-text-show="logoTextShow" />
    </el-aside>

    <el-container>
      <!--  头部区域  -->
      <el-header style=" border-bottom: 1px solid #ccc;">
          <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
      </el-header>

      <!-- 主体区域 -->
      <el-main>
        <router-view/>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default {
  name: "Main",
  components: {Header, Sidebar},
  data() {
    return {
      // 样式相关
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      logoTextShow: true,
      sideWidth: 200,
    };
  },
  methods: {
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
  },
};
</script>

