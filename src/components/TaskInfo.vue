<template>
    <div>
        <el-row class="table-header">
            <el-col :span="10">
                <!-- 作业编号{{taskInfo.taskId}}- -->
                <h2 id="table-name"><i class="el-icon-document"></i>作业编号{{taskInfo.taskId}}-评测情况汇总</h2>
            </el-col>
            <el-col class="table-operation-btn-group" :span="4">
                <!-- TODO 收藏作业或分享作业 -->
                <el-button class="table-operation-btn" @click="handleFav" type="warning" icon="el-icon-star-off" circle></el-button>
                <!-- TODO 按照这个模板（配置）重新开始作业 可以解决异常问题-->
                <el-tooltip class="item" effect="light" content="快速重新执行" placement="top-start">
                    <el-button class="table-operation-btn" type="success" circle><i class="fa fa-repeat"></i></el-button>
                </el-tooltip>
                <el-button class="table-operation-btn" type="danger" @click="handleDelete(taskInfo.taskId)" icon="el-icon-delete"
                    circle></el-button>
                <span style="color:#C0C4CC"> - </span>
                <el-button @click="backToPrevPage" class="table-operation-btn" type="primary" circle><i class="fa fa-reply"></i></el-button>
            </el-col>

        </el-row>

        <table class="info-table">
            <thead>
                <th>属性说明</th>
                <th>属性值</th>
                <th>属性备注</th>
            </thead>
            <tbody>
                <tr>
                    <td>评测作业ID</td>
                    <td>TASK-{{taskInfo.taskId}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>评测发起人</td>
                    <td>{{taskInfo.taskLauncher}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>项目名称</td>
                    <td>[{{taskInfo.projectName}}]</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>项目版本</td>
                    <td>{{taskInfo.projectVersion}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>项目分支</td>
                    <td>{{taskInfo.projectBranch}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>项目持有人</td>
                    <td>{{taskInfo.projectOwner}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>项目代码下载路径</td>
                    <td>
                        <a :href="taskInfo.codeDownloadUrl">{{taskInfo.codeDownloadUrl}}
                            <i style="color:#409EFF" class="fa fa-download"></i>
                        </a>
                    </td>
                    <td>本次评测作业对应代码SNAPSHOT的下载地址</td>
                </tr>
                <tr>
                    <td>作业执行状态</td>
                    <td>
                        <el-tooltip class="item" effect="dark" content="评测作业成功执行完毕" placement="top-start">
                            <span>{{taskInfo.taskStatus}}</span>
                        </el-tooltip>
                        <i style="margin-left:5px; color:rgb(103, 194, 58)" class="el-icon-circle-check"></i>
                    </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>作业执行进度</td>
                    <td>
                        <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress> -->
                        <el-progress :percentage="100" status="success"></el-progress>
                    </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>作业开始时间</td>
                    <td>{{taskInfo.taskStartTime}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>作业结束时间</td>
                    <td>{{taskInfo.taskEndTime}}</td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>作业持续时间</td>
                    <td><i class="el-icon-time"></i>{{taskInfo.taskDuration}}</td>
                    <td>一个评测作业从开始排队到任务结束的持续时间</td>
                </tr>
                <tr>
                    <td>代码质量总体评分</td>
                    <td>
                        <el-rate v-model="taskInfo.overallScore" disabled show-score text-color="#ff9900"
                            score-template="{value} / 5">
                        </el-rate>
                    </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>Sonarqube质量检测报表</td>
                    <td><router-link to="/">{{taskInfo.sonarqubeUrl}}</router-link></td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>PMD代码风格检测报表</td>
                    <td><router-link to="/">{{taskInfo.pmdReportUrl}}</router-link></td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>代码缺陷倾向性预测报表</td>
                    <td><router-link :to="{name:'sdpreport', params:{ id: taskInfo.taskId}}">{{taskInfo.sdpReportUrl}}</router-link></td>
                    <td>基于机器学习技术的静态缺陷预测（方法级别）</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                taskId: this.$route.params.id,
                taskInfo: {
                    taskId: '0001',
                    taskLauncher: 'xietiandi',
                    projectName: 'xietiandi/code-analyze',
                    projectVersion: 'v1.0.3',
                    projectOwner: 'xietiandi',
                    projectBranch: 'dev',
                    codeDownloadUrl: 'https://repository.labsse.org/proxy/archive/codeguard/master/codeanalyze.zip',
                    // 1xx: 排队中{重试中}; 2xx: 分析中; 
                    // 3xx: 成功; 4xx: 失败{包括下载代码失败，代码编译失败，代码组织形式不支持，人为取消任务等等}
                    taskStatus: '成功完成',
                    taskProgress: '100%',
                    taskStartTime: '2019-01-14 12:12:25',
                    // 如果还未完成，则显示暂未完成
                    taskEndTime: '2019-01-14 12:14:29',
                    // 需要根据持续时间显示合适的单位
                    taskDuration: '1min 4s',
                    overallScore: 4.2,
                    sonarqubeUrl: 'https://sonarqube.labsse.org/0001',
                    pmdReportUrl: 'https://codeguard.labsse.org/task/0001/pmdreport',
                    // 机器预测报表
                    sdpReportUrl: 'https://codeguard.labsse.org/task/0001/sdpreport'
                }
            }
        },
        created() {
            //TODO: request real data from backend
        },
        methods: {
            backToPrevPage: function () {
                this.$router.back(-1)
            },
            handleDelete: function (taskId) {
                this.$confirm('此操作将永久删除该评测记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //TODO 实际删除 回调显示成功消息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //TODO 实际跳转逻辑
                    this.backToPrevPage()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleFav: function() {
                let favIcon = document.getElementsByClassName("el-icon-star-off")[0]
                let message = "收藏成功！"
                if(undefined != favIcon) {
                    favIcon.classList.remove("el-icon-star-off")
                    favIcon.classList.add("el-icon-star-on")
                } else {
                    favIcon = document.getElementsByClassName("el-icon-star-on")[0]
                    favIcon.classList.remove("el-icon-star-on")
                    favIcon.classList.add("el-icon-star-off")
                    message = "取消收藏成功！"
                }
                this.$notify({
                    title: '成功',
                    message: message,
                    type: 'success'
                });
            }
        }
    }
</script>
<style scoped>
    .table-header {
        /* 99% + 1% margin left */
        width: 100%;
        margin-left: 1%;
        margin-bottom: 20px;
    }

    #table-name {
        text-align: left;
        font-weight: 400;
        color: #1f2f3d;
        margin: 5px 0 20px;
    }

    .table-operation-btn-group {
        margin: 5px 0 20px;
    }

    /* 修改fa样式以适配element-ui的icon图标 */
    .table-operation-btn>>>span {
        height: 14px;
        display: inline-block;
    }

    .table-operation-btn>>>.fa {
        margin-right: 0;
        width: 14px;
    }

    .table-operation-btn {
        padding: 7px !important;
    }

    #table-name i {
        margin-right: 15px;
    }

    .info-table {
        border-collapse: collapse;
        width: 99%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.2em;
        margin-left: 1%;
    }

    .info-table th {
        text-align: left;
        white-space: nowrap;
        color: #666;
        font-weight: 400;
    }

    .info-table td:first-child,
    .info-table th:first-child {
        width: 18%;
        padding-left: 10px;
    }

    .info-table td:nth-child(2),
    .info-table th:nth-child(2) {
        width: 54%;
        padding-left: 10px;
    }

    .info-table td {
        text-align: left;
    }

    .info-table th,
    .info-table td {
        border-bottom: 1px solid #d8d8d8;
        padding: 15px;
        max-width: 250px;
    }

    /* 属性值斜体显示 */
    .info-table tr td:nth-child(2),
    .info-table tr td:nth-child(3) {
        font-style: italic;
    }

    .info-table tr td:nth-child(3) {
        font-size: 0.8em
    }

    /* 斑马色配置 */
    .info-table tr:nth-child(odd) {
        background: #FAFAFA;
    }

    .info-table a {
        color: #409eff;
        text-decoration: none;
    }

    .info-table a:hover {
        color: #60d1e6;
    }
</style>