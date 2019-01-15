<template>
 <el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">个人与团队</span>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="fa fa-code"></i>
        <span slot="title">项目仓库</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-shield"></i>
          <span>代码卫士</span>
        </template>
        <el-menu-item-group title="代码评测">
          <el-menu-item index="1-3">使用简介</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">快速开始</template>
            <el-menu-item index="/analyze/managed">托管项目</el-menu-item>
            <el-menu-item index="/analyze/external">外部项目</el-menu-item>
        </el-submenu>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">作业一览</template>
            <el-menu-item index="/task?state=in-progress">
              <el-badge is-dot class="item">正在进行</el-badge>
            </el-menu-item>
          <el-menu-item index="/task?state=finished">历史记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">偏好设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>   
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo {
    min-height: 600px;
  }
  .el-menu-item-group li {
    font-size: 13px;
    margin-left: 1em;
  }

  .el-menu-item-group /deep/ .el-submenu__title {
    font-size: 13px;
  }

  .item /deep/ .el-badge__content.is-fixed.is-dot{
    right: 2px;
    top: 10px;
  }
  
</style>
