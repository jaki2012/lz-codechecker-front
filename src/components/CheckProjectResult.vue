<template>
    <div>
        <el-container>
            <el-header>
                <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">
                        <router-link :to="categoryHrefs.overviewlistHref">Overview</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link :to="categoryHrefs.issuesHref">Issues</router-link>
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
