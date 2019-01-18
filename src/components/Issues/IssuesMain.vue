<template>
    <el-container>
        <el-aside width="200px">
            <el-menu :default-openeds="openindex" v-model="issuetype">
                <el-submenu v-for="value in typedatas" :index="value.index">
                    <template slot="title">{{value.type}}</template>
                    <el-menu-item-group>
                        <el-menu-item v-for="childvalue in value.children" :index="childvalue.index"
                                      @click="typechange(childvalue.type,value.index)">{{childvalue.type}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main>
            <div v-for="issueDetail in issueList" class="issuelist">
                <IssueItem :issue-detail="issueDetail" class="issue-item"></IssueItem>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import IssueItem from "./IssueItem";
    import axios from 'axios';

    export default {
        components: {IssueItem},
        name: "issues-main",
        mounted() {
            let _this = this
            axios.get('/apiurl/api/issues/search?componentKeys=key1')
                .then(response => (_this.issueList = response.data.issues))
        },
        methods: {
            typechange(index) {

            }
        },
        data() {
            return {
                issueList: Object,
                issuetype: "",
                openindex: ["1"],
                issues: [],
                typedatas: [
                    {
                        index: "1", type: "Type", children: [
                            {index: "1-1", type: 'Bug'},
                            {index: "1-2", type: 'Vulnerabilities'},
                            {index: "1-3", type: 'Code smells'},
                            {index: "1-4", type: 'Security hotpot'}
                        ]
                    },
                    {
                        index: "2", type: "Severity", children: [
                            {index: "2-1", type: 'Blocker'},
                            {index: "2-2", type: 'Critical'}
                        ]
                    }
                ]
            }
        }
    }

</script>

<style scoped>
    .el-menu {
        padding-left: 10px;
    }

    .el-menu-item {
        font-size: 10px;
        max-height: 50px;
    }

    .el-menu div {
        max-height: 400px;
        overflow: auto;
    }

    div.issuelist {
        border-bottom: 2px solid #c0ccda;
        padding: 12px 0 10px 0;
        background: #f9fafd;
        overflow: hidden;
        position: relative;
        margin-bottom: 5px;
    }

    .issue-item {
        max-height: 150px;
    }
</style>
