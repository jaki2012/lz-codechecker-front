<template>
    <div>
        <!-- TODO：面包屑与导航栏关联 以动态变化 -->
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>处理中心</el-breadcrumb-item>
            <el-breadcrumb-item>代码卫士</el-breadcrumb-item>
            <el-breadcrumb-item>作业一览</el-breadcrumb-item>
            <el-breadcrumb-item>历史记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="displayType === 'in-progress'">
            <el-row class="tac">
                <!-- offset代表栅格左侧的间隔格数 offset占24列中的一部分 -->
                <!-- 4 * 5{span} + 4 * 1{offset} -->
                <el-col :span="5" :class="{'second-row':index >= 4}" v-for="(o, index) in 5" :pull="1" :key="o" :offset="1">
                    <el-card :body-style="{ padding: '0px' }">
                        <img width="80%" src="@/assets/images/golang-logo.png" class="image">
                        <div class="task-info">
                            <span class="project-name">xietiandi/go-demo-project</span>
                            <br>
                            <span class="progress-span">进度：</span>
                            <el-progress :percentage="89"></el-progress>
                            <div class="bottom clearfix">
                                <time class="time">{{ currentDate }}</time>
                                <el-button style="margin-left:5px" type="text" class="button">取消</el-button>
                                <el-button type="text" @click="jumpToInfo(1)" class="button">详情</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="pagination">
                <el-pagination background layout="prev, pager, next" :total="20" :page-size="8"></el-pagination>
            </el-row>
        </div>

        <div v-else-if="displayType === 'finished'">
            <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
            <el-button @click="clearFilter">清除所有过滤器</el-button> -->
            <el-form class="search-form" ref="form" :model="form" label-width="80px">
                <el-form-item>
                    <!-- 前置搜索图标 prefix-icon="el-icon-search" --> 
                    <!-- 后置搜索图标 suffix-icon="el-icon-search" --> 
                    <el-input class="search-input" v-model="form.name" placeholder="请输入项目名称..."></el-input>
                    <el-button class="search-button" type="primary" icon="el-icon-search">搜索</el-button>
                </el-form-item>
            </el-form>
            <!-- height: 固定表头 600px固定宽度可以产生滚动条 -->
            <!-- stripe：斑马表格 -->
            <!-- border：表格带边框 -->
            <el-table border stripe ref="filterTable" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="作业编号" width="130">
                </el-table-column>
                <el-table-column prop="name" label="启动用户" width="100"></el-table-column>
                <el-table-column prop="address" label="项目名称及分支" :formatter="formatter"></el-table-column>
                
                <el-table-column label="作业状态" width="120">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="结束时间" sortable width="180" column-key="date" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                    :filter-method="filterHandler"></el-table-column>
                <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                    :filter-method="filterTag" filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- button采用函数方式跳转 不要嵌套router-link 否则会造成跳转链接无反应的异常 -->
                        <el-button size="mini" @click="jumpToInfo('0001')">详情</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                    :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                    :total="113">
                </el-pagination>
            </div>
        </div>

        <div v-else>
            <!-- TODO -->
            <p>404</p>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            return {
                currentDate: `${year}-${month + 1}-${day} ${h}:${m}`,
                tableData: [{
                        id: "TASK-00000001",
                        date: "2016-05-02 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1518 弄",
                        tag: "家"
                    },
                    {
                        id: "TASK-00000002",
                        date: "2016-05-04 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1517 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000003",
                        date: "2016-05-01 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1519 弄",
                        tag: "家"
                    },
                    {
                        id: "TASK-00000004",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000005",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000006",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000007",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000008",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000009",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    },
                    {
                        id: "TASK-00000010",
                        date: "2016-05-03 12:30:29",
                        name: "xietiandi",
                        address: "上海市普陀区金沙江路 1516 弄",
                        tag: "公司"
                    }
                ],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                form: {
                    name: '',
                }
            };
        },
        computed: {
            displayType: function () {
                if (this.$route.query.state === "in-progress") {
                    return "in-progress";
                } else if (this.$route.query.state === "finished") {
                    return "finished";
                } else {
                    return "error";
                }
            }
        },
        methods: {
            resetDateFilter() {
                this.$refs.filterTable.clearFilter("date");
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column["property"];
                return row[property] === value;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            jumpToInfo(taskID) {
                this.$router.push({ name:'taskinfo', params:{id:taskID}})
            }
        }
    };
</script>


<style scoped>
    .breadcrumb {
        margin-bottom: 40px;
    }

    .search-form {
        text-align: right;
    }
    .search-input {
        width: 20%;
    }

    .search-button {
        margin-left: 15px;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .task-info {
        padding: 14px;
        text-align: left;
    }

    /* 详情按钮的字体样式 */
    .toTaskInfoLink {
        color: #606266;
        text-decoration: none;
    }

    .el-col.second-row {
        margin-top: 30px;
    }

    .project-name {
        font-size: 15px;
    }

    .bottom {
        /* margin-top: 13px; */
        margin-top: 10px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }

    .el-progress {
        margin-top: 5px;
        width: 80%;
        display: inline-block;
    }

    .progress-span {
        font-size: 12.4px;
        font-style: italic;
        width: 10%;
    }

    .el-progress >>>.el-progress__text {
        margin-left: 20px;
        font-style: italic;
        font-size: 12.4px !important;
    }

    .pagination {
        margin-top: 40px;
    }
</style>