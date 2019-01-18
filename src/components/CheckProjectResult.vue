<template>
    <div>
        <el-container>
            <el-header>
                <!-- TODO：解决路径不一致问题 -->
                <el-menu :default-active="categoryHrefs.overviewlistHref" class="el-menu-demo" router mode="horizontal">
                    <el-menu-item :index="categoryHrefs.overviewlistHref">
                        Overview
                    </el-menu-item>
                    <el-menu-item :index="categoryHrefs.issuesHref">
                        <!-- router-link只在点击a链接的时候生效 且会出现下划线 -->
                        Issues
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">Security Reports</template>
                        <el-menu-item index="3-1">OWASP Top 10</el-menu-item>
                        <el-menu-item index="3-2">SANS Top 25</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">Measures</el-menu-item>
                    <el-menu-item index="4">Code</el-menu-item>
                    <el-menu-item index="5">Activity</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "check-project-result",
        data() {
            return {
                categoryHrefs: {
                    overviewlistHref: "/task/0001/report/overviewlist",
                    issuesHref: "/task/0001/report/issues"
                }
            }
        },
    }
</script>

<style scoped>

</style>
