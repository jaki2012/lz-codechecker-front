<template>
 <el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose">
      <li class="sponsors">
        <a>赞助商</a>
        <ul class="pure-menu-list">
        
        <li>
            <a href="https://www.duotai.net/?utm_source=element" target="_blank" class="sponsor"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjMiIGhlaWdodD0iNTkiIHZpZXdCb3g9IjAgMCA2MyA1OSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGcgaWQ9IkNhbnZhcyIgZmlsbD0ibm9uZSI+CjxnIGlkPSJkdW90YWktaWNvbiI+CjxnIGlkPSJSZWN0YW5nbGUiPgo8cmVjdCB3aWR0aD0iNDEuMTQwMiIgaGVpZ2h0PSI0Mi4xNDI5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS41OTg3IDE2Ljg1NzEpIiBmaWxsPSIjRkY3MjYyIi8+CjwvZz4KPGcgaWQ9IlZlY3RvciAyIj4KPHBhdGggZD0iTSAwIDI1LjI4NTdMIDIxLjU5ODYgMEwgNDMuMTk3MiAyNS4yODU3TCAwIDI1LjI4NTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDMzLjcxNDIpIiBmaWxsPSIjMEFDRjgzIi8+CjwvZz4KPGcgaWQ9IkVsbGlwc2UiPgo8ZWxsaXBzZSBjeD0iMTYuNDU2MSIgY3k9IjE2Ljg1NzIiIHJ4PSIxNi40NTYxIiByeT0iMTYuODU3MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4xNDI0OSAwKSIgZmlsbD0iIzFBQkNGRSIvPgo8L2c+CjwvZz4KPC9nPgo8L3N2Zz4KCg==" alt="duotai"></a>
          </li>
          <li>
            <a href="https://www.duohui.cn/?utm_source=element&amp;utm_medium=web&amp;utm_campaign=element-index" target="_blank" class="sponsor"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgOTggMTUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8dGl0bGU+ZHVvaHVpLWVsZW1lbnQ8L3RpdGxlPgo8ZGVzYz5DcmVhdGVkIHVzaW5nIEZpZ21hPC9kZXNjPgo8ZyBpZD0iQ2FudmFzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIxNiAxNDApIj4KPGNsaXBQYXRoIGlkPSJjbGlwLTAiIGNsaXAtcnVsZT0iZXZlbm9kZCI+CjxwYXRoIGQ9Ik0gMjIxNiAtMTQwTCAyMzE0IC0xNDBMIDIzMTQgMTBMIDIyMTYgMTBMIDIyMTYgLTE0MFoiIGZpbGw9IiNGRkZGRkYiLz4KPC9jbGlwUGF0aD4KPGcgaWQ9ImR1b2h1aS1lbGVtZW50IiBjbGlwLXBhdGg9InVybCgjY2xpcC0wKSI+CjxwYXRoIGQ9Ik0gMjIxNiAtMTQwTCAyMzE0IC0xNDBMIDIzMTQgMTBMIDIyMTYgMTBMIDIyMTYgLTE0MFoiIGZpbGw9IiNGRkZGRkYiLz4KPGcgaWQ9IkR1b2h1aSBJY29uIDIiPgo8ZyBpZD0iVmVjdG9yIj4KPHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4yNjYzNiAwIDAgMS4yMTkyOSAyMjMwIC03NS43MDM4KSIgZmlsbD0iIzNBODhGRCIvPgo8L2c+CjxnIGlkPSJWZWN0b3IiPgo8dXNlIHhsaW5rOmhyZWY9IiNwYXRoMV9maWxsIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjQxNTM0IDAgMCAxLjIxODM0IDIyMjYgLTExMikiIGZpbGw9IiMzNUFGRkIiLz4KPC9nPgo8L2c+CjwvZz4KPC9nPgo8ZGVmcz4KPHBhdGggaWQ9InBhdGgwX2ZpbGwiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTSAyNS43NzIyIDEuMDA2MzVDIDI2LjIgMC4zNzQ5ODMgMjYuODk0OSAtMi42NjEzZS0wNyAyNy42MzQ5IC0yLjY2MTNlLTA3QyAyOC4zNzU1IC0yLjY2MTNlLTA3IDI5LjA2OTkgMC4zNzQ5ODMgMjkuNDk4MyAxLjAwNjM1QyAzNC40MDkgOC4yNDk2NCA0Ny43OTggMjcuOTk2NCA1NC41OTg2IDM4LjAyNjJDIDU1LjM4NzggMzkuMTkwMSA1NS40ODk2IDQwLjcxNjIgNTQuODYyMyA0MS45ODNDIDU0LjIzNSA0My4yNDk4IDUyLjk4MzMgNDQuMDQ1MiA1MS42MTc4IDQ0LjA0NTJDIDM5LjY2OTQgNDQuMDQ1MiAxNS42MDEgNDQuMDQ1MiAzLjY1MjEgNDQuMDQ1MkMgMi4yODcxMiA0NC4wNDUyIDEuMDM1NDUgNDMuMjQ5OCAwLjQwODE3MyA0MS45ODNDIC0wLjIxOTEwNiA0MC43MTYyIC0wLjExNzM1MyAzOS4xOTAxIDAuNjcxODA0IDM4LjAyNjJDIDcuNDcyNDIgMjcuOTk2NCAyMC44NjA5IDguMjQ5NjQgMjUuNzcyMiAxLjAwNjM1WiIvPgo8cGF0aCBpZD0icGF0aDFfZmlsbCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNIDI0Ljk5MzkgMS40NDcwM0MgMjUuNjEzNyAwLjUzMzExNyAyNi41NTcyIC0zLjAxNjE0ZS0wNyAyNy41NTUxIC0zLjAxNjE0ZS0wN0MgMjguNTUzNSAtMy4wMTYxNGUtMDcgMjkuNDk3IDAuNTMzMTE3IDMwLjExNjggMS40NDcwM0MgMzUuNDY3NCA5LjMzODU0IDQ3Ljg3MjUgMjcuNjM0MiA1NC40MDQzIDM3LjI2ODFDIDU1LjE4MjUgMzguNDE1NyA1NS4zMjk5IDM5Ljk4MiA1NC43ODQ3IDQxLjI5OTlDIDU0LjIzODkgNDIuNjE4NSA1My4wOTYgNDMuNDU1NiA1MS44NDI2IDQzLjQ1NTZDIDM5LjkwMjMgNDMuNDU1NiAxNS4yMDg0IDQzLjQ1NTYgMy4yNjgxMSA0My40NTU2QyAyLjAxNDcxIDQzLjQ1NTYgMC44NzE3MzkgNDIuNjE4NSAwLjMyNTk3OCA0MS4yOTk5QyAtMC4yMTk3ODMgMzkuOTgyIC0wLjA3MTc4MTMgMzguNDE1NyAwLjcwNjM5IDM3LjI2ODFDIDcuMjM4MTggMjcuNjM0MiAxOS42NDMzIDkuMzM4NTQgMjQuOTkzOSAxLjQ0NzAzWiIvPgo8L2RlZnM+Cjwvc3ZnPgo=" alt="duohui"></a>
          </li>
        </ul>
        <a>合作伙伴</a>
        <ul class="pure-menu-list">
          <li>
            <a href="https://www.huawei.com/" target="_blank" class="sponsor"><img src="@/assets/images/huawei-logo.png" alt="duotai"></a>
          </li>
          <li>
            <a href="http://www.monetware.com/" target="_blank" class="sponsor"><img src="@/assets/images/montware-logo.png" alt="duotai"></a>
          </li>
          <li>
            <a href="http://www.icerno.com/index.html" target="_blank" class="sponsor"><img src="@/assets/images/longzheng-logo.png" alt="duotai"></a>
          </li>
        </ul>
      </li>
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

  .sponsors {
    padding-left: 20px;
  }

  .sponsors > a{
    color: #777;
    font-weight: 300;
    font-size: 14px;
  }

  .sponsors ul {
    margin-top: -10px;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .sponsors ul li {
    display: inline-block;
  }

  .sponsors ul li a {
    height: auto;
    display: inline-block;
    vertical-align: middle;
    margin: 8px 12px 12px 0;
  }

  .sponsors ul li a img {
    width: 42px;
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
