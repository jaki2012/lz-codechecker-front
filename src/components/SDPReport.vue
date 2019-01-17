<template>
    <div>
        <el-row class="table-header">
            <el-col :span="10">
                <h2 id="table-name"><i class="el-icon-document"></i>作业编号{{taskId}}-代码缺陷倾向性预测结果报表</h2>
            </el-col>
            <el-col class="table-operation-btn-group" :span="2">
                <el-button @click="backToPrevPage" class="table-operation-btn" type="primary" circle><i class="fa fa-reply"></i></el-button>
            </el-col>
        </el-row>
        <el-form class="search-form" ref="form" :model="form" label-width="80px">
            <el-form-item>
                <!-- 前置搜索图标 prefix-icon="el-icon-search" -->
                <!-- 后置搜索图标 suffix-icon="el-icon-search" -->
                <!-- TODO:方法所在的行数 -->
                <!-- TODO:根据方法数量排序，根据缺陷方法比例排序，根据缺陷方法数量排序 升序或降序 -->
                <el-input class="search-input" v-model="form.name" placeholder="请输入文件或模块名称..."></el-input>
                <el-button class="search-button" type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 手风琴模式下accordion 一次最多展开一个框 -->
        <el-collapse v-model="activeFileId" accordion>
            <el-collapse-item v-for="(file, index) in files" :title="'文件：'+file.name" :name="file.id">
                <!-- 嵌套折叠展开: 根据无锡展示视频做 -->
                <!-- TODO 根据angular编译出带表头折叠框html元素调试学习 -->
                <li class="module-li" v-for="(module, index) in file.modules">方法：{{module.name}}
                    <span :class="module.sdpResult ? 'unhealthy-module-label' : 'healthy-module-label' " style="float:right">{{module.sdpResultInRead}}</span>
                    <el-collapse class="module-collapse" v-model="activeModuleId">
                        <el-collapse-item class="module-collapse-item" title="点击以查看更详细的指标" :name="file.id+'.'+module.id">
                            <template slot="title">
                                点击以查看更详细的指标 <i class="header-icon el-icon-info"></i>
                            </template>
                            <table border="1" class="metric-table">
                                <thead>
                                    <th>指标名</th>
                                    <th>指标值</th>
                                    <th>指标解释</th>
                                    <th>指标评级</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>LOC_BLANK</td>
                                        <td>0</td>
                                        <td>代码中空行的数量</td>
                                        <td>A+</td>
                                    </tr>
                                    <tr>
                                        <td>LOC_EXECUTABLE</td>
                                        <td>4</td>
                                        <td>可执行代码行数</td>
                                        <td>A+</td>
                                    </tr>
                                    <tr>
                                        <td>LOC_TOTAL</td>
                                        <td>4</td>
                                        <td>总代码行数</td>
                                        <td>A+</td>
                                    </tr>
                                    <tr>
                                        <td>PERCENT_COMMENTS</td>
                                        <td>0</td>
                                        <td>注释行占代码的比例</td>
                                        <td>B+</td>
                                    </tr>
                                    <tr>
                                        <td>NUM_UNIQUE_OPERANDS</td>
                                        <td>12</td>
                                        <td>不同的操作符个数</td>
                                        <td>A</td>
                                    </tr>
                                    <tr>
                                        <td>PARAMETER_COUNT</td>
                                        <td>3</td>
                                        <td>形式参数的个数</td>
                                        <td>B+</td>
                                    </tr>
                                    <tr>
                                        <td>HALSTEAD_DIFFICULTIY</td>
                                        <td>3.66667</td>
                                        <td>HALSTEAD复杂度</td>
                                        <td>B+</td>
                                    </tr>
                                    <tr>
                                        <td>DESIGN_COMPLEXITY</td>
                                        <td>1</td>
                                        <td>设计复杂度</td>
                                        <td>A</td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-collapse-item>
                    </el-collapse>
                </li>
            </el-collapse-item>
        </el-collapse>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                taskId: this.$route.params.id,
                // activeFileId: 1,
                activeFileId: 9,
                activeModuleId: '',
                // activeModuleId: '1.2',
                form: {
                    name: '',
                },
                files: [{
                    id: 1,
                    name: 'filename1',
                    modules: [{
                        id: 1,
                        name: 'module1',
                        sdpResult: false,
                        sdpResultInRead: 'Non-Defective模块'
                    }, {
                        id: 2,
                        name: 'module2',
                        sdpResult: true,
                        sdpResultInRead: 'Defective模块'
                    }, {
                        id: 3,
                        name: 'module3',
                        sdpResult: false,
                        sdpResultInRead: 'Non-Defective模块'
                    }]
                }, {
                    id: 2,
                    name: 'filename2',
                }, {
                    id: 3,
                    name: 'filename3',
                }, {
                    id: 4,
                    name: 'filename4',
                }],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4
            }
        },
        methods: {
            backToPrevPage: function () {
                this.$router.back(-1)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>
    /* TODO:CSS全部改成SASS */
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

    .search-form {
        text-align: right;
    }

    .search-input {
        width: 20%;
    }

    .search-button {
        margin-left: 15px;
    }

    .module-li {
        text-align: left;
        line-height: 40px;
        padding: 0 20px;

    }

    .module-collapse {
        padding-left: 20px;
    }

    .module-collapse>>>.el-collapse-item__header {
        height: 30px;
        margin-top: 5px;
        padding: 0 5px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        /* background: #66b1ff;
        border-color: #66b1ff;
        color: #fff; */
    }

    .healthy-module-label {
        color: #67C23A;
        font-weight: 700;
    }

    .unhealthy-module-label {
        color: #F56C6C;
        font-weight: 700;
    }

    .module-collapse>>>.el-collapse-item__header:hover {
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }

    .module-collapse {
        border-bottom: none;
    }

    .header-icon {
        margin-left: 5px;
    }

    .metric-table {
        /* border-collapse 属性设置表格的边框是否被合并为一个单一的边框，还是象在标准的 HTML 中那样分开显示。 */
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 5px;
        line-height: 2em;
        border: 1px;
        border-color: #d8d8d8;
        /* border-top: none; */
        width: 98%;
    }

    .metric-table thead {
        background-color: #E4E7ED;
    }

    .metric-table tr {
        font-style: italic;
    }

    .metric-table th:first-child,
    .metric-table td:first-child {
        width: 30%;
    }

    .metric-table th:nth-child(2),
    .metric-table td:nth-child(2) {
        width: 20%;
    }

    .metric-table th:nth-child(3),
    .metric-table td:nth-child(3) {
        width: 30%;
    }

    .block {
        margin-top: 50px;
    }
</style>