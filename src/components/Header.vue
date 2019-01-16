<template>
    <header>
        <router-link to="/">
            <img class="header-logo" src="@/assets/images/header-logo-trimmed.svg" alt="logo">
        </router-link>
        <el-menu :default-active="activeIndex" class="el-menu-header" 
        menu-trigger="click" mode="horizontal" @select="handleSelect"
        router>
            <!-- mocked  -->
            <li @focus="donothing($event)" class="search-menu-item">
                <el-input class="search-input disabled" placeholder="搜索使用文档" prefix-icon="el-icon-search"></el-input>
            </li>
            
            <el-menu-item index="/">处理中心</el-menu-item>

            <el-submenu index="2" class="menu-item-with-badge" disabled>
                <template class="el-submenu" slot="title">
                    <el-badge value="即将推出" type="danger" class="menu-badge"><label>我的工作台</label></el-badge>
                </template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>

            </el-submenu>

            <el-menu-item class="menu-item-with-badge" index="3">
                <el-badge :value="200" :max="99" class="item">
                    消息中心
                </el-badge>
            </el-menu-item>

            <el-menu-item v-if="loginStatus" index="4"><a href="https://www.ele.me" target="_blank">个人管理</a></el-menu-item>
            <el-menu-item v-else index="/login">登录/注册</a></el-menu-item>
            <el-menu-item class="nav-seperator" index="5">
                <div class="nav-gap"></div>
            </el-menu-item>
            
            <!-- 参考阿里云控制台 -->
            <el-submenu :hide-timeout=200 index="6">
                <template class="el-submenu" slot="title">简体中文</template>
                <el-menu-item index="4-1">English</el-menu-item>
            </el-submenu>


        </el-menu>
    </header>
</template>

<script>
    import store from '@/vuex/store'
    export default {
        store,
        data() {
            return {
                activeIndex: '/',
                activeIndex2: '1'
            }
        },
        computed: {
            loginStatus: function() {
                return store.state.login
            }
        },
        mounted() {
            document.getElementsByClassName("search-menu-item")[0].removeAttribute("tabindex")
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            donothing(event) {
                return
                console.log(event.cancelBubble=true)
            }
        }
    }
</script>

<style lang="less" scoped>
    @header-height: 80px;
    @header-line-height: 80px;

    header {
        height: @header-height;
        line-height: @header-line-height;
    }

    .nav-seperator {
        pointer-events: none;
    }

    .el-menu /deep/ .search-menu-item {
        cursor: default;
        display: inline-block;
        float: left;
        user-select: none;
        margin-right: 15px;
    }

    .search-input {
        width: 100%;
    }

    .search-input /deep/ .el-input__inner {
        width: 100%;
        line-height: 32px;
        height: 32px;
    }

    .el-menu-item {
        cursor: pointer;
    }

    .nav-gap {
        position: relative;
        width: 1px;
        height: 80px;
        padding: 0 5px;
    }

    .nav-gap:before {
        content: "";
        position: absolute;
        top: calc(50% - 8px);
        width: 1px;
        height: 16px;
        background: #ebebeb;
    }

    .header-logo {
        vertical-align: middle;
        height: 40px;
    }

    .el-menu-header {
        float: right;
    }

    .el-menu-item {
        border-bottom-width: 0;
        vertical-align: middle;
        height: @header-height;
        line-height: @header-line-height;
    }

    .el-menu-item /deep/ .el-badge__content.is-fixed {
        top: 10px;
        opacity: 1;
    }

    // 使得其能够实现透明 
    // 子元素的opacity必定继承父元素的opacity
    .el-submenu.is-disabled /deep/ .el-submenu__title {
        opacity: 1;
    }

    .el-submenu.is-disabled /deep/ .el-submenu__title label {
        opacity: 0.25;
    }

    .el-submenu /deep/ .el-badge__content.is-fixed {
        top: 10px;
        opacity: 1;
    }

    .menu-item-with-badge /deep/ div {
        z-index: 2;
    }

    .el-submenu /deep/ .el-submenu__title {
        height: @header-height;
        line-height: @header-line-height;
    }

    .el-menu-item a {
        text-decoration: none;
    }

    .el-menu {
        background-color: transparent;
    }
</style>