<template>
    <div>
        <el-container>
            <el-header class="qualitygate">
                <span>Quality Gate</span>
            </el-header>
            <el-main>
                <div v-for="overviewItems in overviewList" class="overviewlist">
                    <overview :overview-items="overviewItems"></overview>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped>

    div.overviewlist {
        border-bottom: 2px solid #c0ccda;
        padding: 12px 0 10px 0;
        background: #f9fafd;
        overflow: hidden;
        position: relative;
        margin-bottom: 5px;
    }

</style>
<script>
    import ElContainer from "element-ui/packages/container/src/main";
    import ElHeader from "element-ui/packages/header/src/main";
    import ElMain from "element-ui/packages/main/src/main";
    import Overview from "./Overview";
    import axios from 'axios';

    export default {
        components: {
            Overview,
            ElMain,
            ElHeader,
            ElContainer
        },
        name: "overview-list",
        mounted() {
            let _this = this
            axios.get('/apiurl/api/issues/search?componentKeys=key1&types=BUG')
                .then(response => (_this.overviewList[0][0].num = response.data.total))
            axios.get('/apiurl/api/issues/search?componentKeys=key1&types=CODE_SMELL')
                .then(response => (_this.overviewList[0][1].num = response.data.total))
            axios.get('/apiurl/api/issues/search?componentKeys=key1&types=VULNERABILITY')
                .then(response => (_this.overviewList[1][1].num = response.data.total))

        },
        data() {
            return {
                result: Object,
                overviewList: [
                    [
                        {
                            title: "Bug",
                            num: null,
                            numLink: "/project/tessssst/issues",
                            tag: "Bugs"
                        },
                        {
                            title: "Vulnerabilities",
                            num: null,
                            numLink: "/project/tessssst/issues",
                            tag: "Vulnerabilities"
                        }
                    ],
                    [
                        {
                            title: "Debt",
                            num: -1,
                            numLink: "/abc",
                            tag: "Debt"
                        },
                        {
                            title: "Code smells",
                            num: null,
                            numLink: "/abc",
                            tag: "Code smells"
                        }
                    ],
                    [
                        {
                            title: "Coverage",
                            num: "0.0%",
                            numLink: "/temp",
                            tag: "Coverage"
                        }
                    ],
                    [
                        {
                            title: "Duplications",
                            num: "0.0%",
                            numLink: "/temp",
                            tag: "Duplications"
                        },
                        {
                            title: "Duplicated Blocks",
                            num: "10",
                            numLink: "/temp",
                            tag: "Duplicated Blocks"
                        }
                    ]
                ]
            }
        }
    }
</script>

<style scoped>
    .qualitygate {
        border-bottom: 2px solid #c0ccda;
        padding: 12px 0 10px 0;
        background: #f9fafd;
        overflow: hidden;
        position: relative;
        margin-bottom: 5px;
        font-weight: bolder;
    }
</style>
