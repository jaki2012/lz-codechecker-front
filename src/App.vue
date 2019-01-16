<template>
  <el-container class="global-container">
    <!-- 顶栏 -->
    <el-header class="global-header" height="80px">
      <headerbar></headerbar>
    </el-header>
    <el-container>
      <!-- 侧栏 -->
      <el-aside width="18%">
        <sidebar class="sidebar"></sidebar>
      </el-aside>
      <!-- 主要区域 -->
      <el-main id="app">
        <router-view class="content"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Header from './components/Header'
  import Side from './components/Side'
  export default {
    name: 'app',
    components: {
      'headerbar': Header,
      'sidebar': Side
    }
  }
</script>

<style>
  .global-container {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 90%;
    margin:0 5%;
  }

  .el-header {
    margin-bottom: 20px;
    /* padding: 0; */
  }

  #app {
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    padding-top: 0;
  }

  .sidebar, .content {
    padding: 50px 0;
  }
  
  /* 使得fontawesome图标与ElementUI图标一致 */
  .fa {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
</style>