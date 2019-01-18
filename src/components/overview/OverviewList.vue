<template>
    <div>
        <el-container>
            <el-header class="quality-gate">
                <span>Quality Gate</span>
                <div class="tooltip">
                    <el-tooltip class="item" effect="dark" content="
Quality Gate是一组基于测量的布尔条件。它可以帮助您立即了解您的项目是否已满足生产环境的需要。如果您的当前状态未通过，您将看到导致问题的措施和通过所需的值。" placement="top-start">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <span class="level level-ok">Passed</span>
                <div style="text-align:left; margin-top:2px;">
                    <el-alert title="您的项目已通过Quality Gate质量审核" type="success" show-icon>
                    </el-alert>
                </div>
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
                .then(response => (_this.overviewList[0].blocks[0].num = response.data.total))
            axios.get('/apiurl/api/issues/search?componentKeys=key1&types=CODE_SMELL')
                .then(response => (_this.overviewList[0].blocks[1].num = response.data.total))
            axios.get('/apiurl/api/issues/search?componentKeys=key1&types=VULNERABILITY')
                .then(response => (_this.overviewList[1].blocks[1].num = response.data.total))

        },
        data() {
            return {
                result: Object,
                overviewList: [{
                        title: 'Bugs and Vulnerabilities',
                        blocks: [{
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
                        ]
                    },
                    {
                        title: 'Code Smells',
                        blocks: [{
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
                        ]
                    },
                    {
                        title: 'Coverage',
                        blocks: [{
                            title: "Coverage",
                            num: "0.0%",
                            numLink: "/temp",
                            tag: "Coverage"
                        }]
                    },
                    {
                        title: 'Duplications',
                        blocks: [{
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
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .quality-gate {
        border-bottom: 2px solid #c0ccda;
        padding: 12px 0 10px 0;
        background: #f9fafd;
        overflow: hidden;
        position: relative;
        margin-bottom: 5px;
        font-weight: bolder;
        text-align: left;
        height:75px !important;
    }

    .tooltip {
        display: inline-block;
        margin-left: 0.5em;
    }

    /* 限制悬浮窗口的文本长度 */
    body /deep/ .el-tooltip__popper  {
        max-width: 200px;
    }

    .overviewlist > div{
        padding-left: 5%
    }

    .tooltip i {
        font-size: 12px;
        color: grey;
    }

    .level-ok {
        background-color: #00aa00;
    }

    .level {
        margin-left: 1em;
        display: inline-block;
        width: auto;
        min-width: 80px;
        padding-left: 9px;
        padding-right: 9px;
        height: 24px;
        line-height: 24px;
        border-radius: 24px;
        box-sizing: border-box;
        color: #fff;
        letter-spacing: 0.02em;
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        text-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
    }
</style>