<template>
    <div>
        <el-container>
            <el-header class="issue-message">
                <el-alert show-icon :closable="false" :title="issueDetail.message" type="error">
                </el-alert>
            </el-header>
            <el-main>
                <el-container class="tag-container">
                    <el-tag class="item">
                        {{issueDetail.type}}
                    </el-tag>
                    <el-tag class="item">
                        {{issueDetail.severity}}
                    </el-tag>
                    <el-tag class="item">
                        {{issueDetail.status}}
                    </el-tag>
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
    
    .issue-item >>> .el-alert__title {
        font-size: 16px;
    }

    .issue-item >>> .el-alert {
        /* padding: 4px 8px; */
    }

    .tag-container .el-tag {
        margin-left: 3px;
    }
</style>