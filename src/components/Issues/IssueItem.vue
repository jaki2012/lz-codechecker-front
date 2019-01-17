<template>
    <div>
        <el-container>
            <el-header class="issue-message">
                {{issueDetail.message}}
            </el-header>
            <el-main>
                <el-container>
                    <el-badge class="item">
                        <el-button size="small">{{issueDetail.type}}</el-button>
                    </el-badge>
                    <el-badge class="item">
                        <el-button size="small">{{issueDetail.severity}}</el-button>
                    </el-badge>
                    <el-badge class="item">
                        <el-button size="small">{{issueDetail.status}}</el-button>
                    </el-badge>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>

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
        name: "issue-item",
        props: {
            issueDetail: Object
        }
    }
</script>

<style scoped>
    .issue-message {
        text-align: left;
        max-height: 25px;
    }
</style>
