<template>
    <div>
        <el-container>
            <el-header class="overview-title">{{overviewItems.title}}</el-header>
            <el-main>
                <el-container>
                    <div v-for="(overviewItem, index) in overviewItems.blocks" :key="index">
                        <el-card class="overview-card">
                            <div slot="header" class="clearfix">
                                <span>{{overviewItem.title}}</span>
                            </div>
                            <div>
                                <el-tag>{{overviewItem.num}}</el-tag>
                                <!-- <a :href="overviewItem.numLink"></a> -->
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
            overviewItems: {}
        },
        // watch: {
        //     overviewItems: f
        // }
    }
</script>

<style scoped>
    .overview-title {
        margin-bottom:0;
        height: 40px!important;
    }
    a {
        color: #409eff;
        text-decoration: none;
    }

    a:hover {
        color: #60d1e6;
    }

    .el-tag {
        font-size:1.5em;
        margin-bottom:0.3em;
    }
</style>
