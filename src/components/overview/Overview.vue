<template>
    <div>
        <el-container>
            <el-header class="overview-title">Bugs and Vunerables</el-header>
            <el-main>
                <el-container>
                    <div v-for="overviewItem in overviewItems">
                        <el-card class="overview-card">
                            <div slot="header" class="clearfix">
                                <span>{{overviewItem.title}}</span>
                            </div>
                            <div>
                                <a :href="overviewItem.numLink">{{overviewItem.num}}</a>
                            </div>
                            <div>
                                {{overviewItem.tag}}
                            </div>
                        </el-card>
                    </div>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped>

    .overview-title {
        text-align: left;
    }

    .overview-card {
        width: 250px;
        margin-left: 20px;
    }

</style>
<script>
    import ElContainer from "element-ui/packages/container/src/main";
    import ElHeader from "element-ui/packages/header/src/main";
    import ElMain from "element-ui/packages/main/src/main";

    export default {
        components: {
            ElMain,
            ElHeader,
            ElContainer
        },
        name: "overview",
        props: {
            overviewItems: []
        }
    }
</script>

<style scoped>

</style>
