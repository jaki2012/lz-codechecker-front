<template>
    <div>

        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>处理中心</el-breadcrumb-item>
            <el-breadcrumb-item>代码卫士</el-breadcrumb-item>
            <el-breadcrumb-item>开始评测</el-breadcrumb-item>
            <el-breadcrumb-item>外部项目</el-breadcrumb-item>
        </el-breadcrumb>
        <el-steps class="steps" :active="stepsActive" finish-status="finish">
            <el-step :title="stepsDesc[0]" description="填写评测基本信息"></el-step>
            <el-step :title="stepsDesc[1]" description="上传代码文件"></el-step>
            <el-step :title="stepsDesc[2]" description="校验信息/开始评测"></el-step>
        </el-steps>

        <div class="step-area">
            <!-- 步骤1区域内容 -->
            <div v-show="stepsActive==0">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="info-form">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <!-- 外部项目的分支和版本不可选 -->
                    <el-form-item label="项目版本" prop="version" required>
                        <el-input disabled v-model="ruleForm.version"></el-input>
                    </el-form-item>
                    <el-form-item label="项目分支" prop="branch" required>
                        <el-input disabled v-model="ruleForm.branch"></el-input>
                    </el-form-item>
                    <el-form-item label="评测发起人" prop="launcher" required>
                        <el-input v-model="ruleForm.launcher"></el-input>
                    </el-form-item>
                    <el-form-item label="项目语言" prop="language" required="">
                        <el-select v-model="ruleForm.language" placeholder="请选择项目语言及形式">
                            <el-option label="Java (Ant)" value="java-a"></el-option>
                            <el-option label="Java (Gradle)" value="java-g"></el-option>
                            <el-option label="Java (Maven)" value="java-m"></el-option>
                            <el-option label="Python 3" value="py3"></el-option>
                            <el-option label="Python 2" value="py2"></el-option>
                            <el-option label="Golang" value="go"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消息通知" prop="notification">
                        <el-switch active-color="#13ce66" v-model="ruleForm.notification"></el-switch>
                    </el-form-item>
                    <el-form-item label="评测内容" prop="content">
                        <!-- border 边框 -->
                        <el-checkbox-group v-model="ruleForm.content">
                            <!-- disabled属性使其必选 -->
                            <el-checkbox label="1" disabled name="content">代码缺陷倾向性</el-checkbox>
                            <el-checkbox label="2" ame="content">代码异味</el-checkbox>
                            <el-checkbox label="3" ame="content">代码风格</el-checkbox>
                            <el-checkbox label="4" name="content">静态代码语义缺陷</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="评测阈值" prop="sdpThreshold">
                        <el-col :span="22">
                            <!-- show-stops显示离散点 -->
                            <el-slider v-model="ruleForm.sdpThreshold" :step="10">
                            </el-slider>
                        </el-col>
                        <el-col style="padding-left:5px;" :span="2">
                            <el-tooltip content="阈值越高，缺陷倾向性评测越严格" placement="top">
                                <i class="el-icon-question">

                                </i>
                            </el-tooltip>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="任务类别" prop="type">
                        <el-radio-group v-model="ruleForm.type">
                            <el-radio label="1">即时任务</el-radio>
                            <el-radio label="2">定时任务</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 只有在定时任务时才开启 -->
                    <el-form-item v-show="ruleForm.type=='2'" label="定时时间" :required="ruleForm.type=='2'">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" :disabled="ruleForm.type=='1'" placeholder="选择日期" v-model="ruleForm.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker type="fixed-time" :disabled="ruleForm.type=='1'" placeholder="选择时间"
                                    v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="评测备注" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="step-one-btns">
                        <el-button type="primary" size="small" @click="handleFirstStep('ruleForm')">下一步</el-button>
                        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 步骤2区域内容 -->
            <div v-show="stepsActive==1">
                <el-upload class="upload-area" drag :on-success="handleUploadSuccess" :on-remove="handleRemoveSuccess"
                    :file-list="fileList" action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传zip/gzip文件，且不超过500kb</div>
                </el-upload>
                <div id="start">
                    <el-button id="upload-button" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <el-button id="start-button" style="margin-left: 10px;" size="small" type="primary" @click="handleSecondStep">下一步</el-button>
                </div>
            </div>
            <!-- 步骤3区域内容 -->
            <div v-show="stepsActive==2">

                <div class="confirm-div">
                    <div style="text-align:left">
                        <el-alert title="请校验您输入的此次评测作业的基本信息" type="info" show-icon>
                        </el-alert>
                    </div>
                    <table class="info-table">
                        <thead>
                            <th>属性名</th>
                            <th>属性值</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>项目名称</td>
                                <td>{{ruleForm.name}}</td>
                            </tr>
                            <tr>
                                <td>项目版本</td>
                                <td>{{ruleForm.branch}}</td>
                            </tr>
                            <tr>
                                <td>项目名称</td>
                                <td>{{ruleForm.version}}</td>
                            </tr>
                            <tr>
                                <td>项目发起人</td>
                                <td>{{ruleForm.launcher}}</td>
                            </tr>
                            <tr>
                                <td>项目语言</td>
                                <td>{{ruleForm.language}}</td>
                            </tr>
                            <tr>
                                <td>评测任务类型</td>
                                <td>{{ruleForm.type}}</td>
                            </tr>
                            <tr>
                                <td>评测任务内容</td>
                                <td>{{taskContent}}</td>
                            </tr>
                            <tr>
                                <td>代码文件信息</td>
                                <td>xxxx.zip/555kb</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div class="start">
                    <el-button id="upload-button" style="margin-left: 10px;" size="small" type="success" @click="editAgain">重新编辑</el-button>
                    <el-button id="start-button" style="margin-left: 10px;" size="small" type="primary" @click="doAnalyze">开始评测</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                stepsActive: 2,
                // TODO 校验表单的提示span
                // 字段的可视化 而不只是label
                // 模拟加载框
                stepsDesc: ['进行中', '步骤 2', '步骤 3'],
                ruleForm: {
                    // TODO: remove temoporally mock
                    name: 'code-analyze',
                    branch: 'master',
                    version: 'v1.0.0',
                    launcher: 'xietiandi',
                    language: '',
                    date1: '',
                    date2: '',
                    notification: true,
                    content: ["1"],
                    type: '1',
                    remark: '',
                    sdpThreshold: 50
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入项目名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 20,
                            message: '长度在 3 到 20 个字符',
                            trigger: 'blur'
                        }
                    ],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    language: [{
                        required: true,
                        message: '请选择项目的语言及构建形式',
                        trigger: 'blur'
                    }],
                    launcher: [{
                        required: true,
                        message: '请输入评测发起人的名称',
                        trigger: 'blur'
                    }],
                    //TODO-FIXIT
                    // date1: [{
                    //     type: 'date',
                    //     required: this.ruleForm.type=='2',
                    //     message: '请选择日期',
                    //     trigger: 'change'
                    // }],
                    // date2: [{
                    //     type: 'date',
                    //     required: this.ruleForm.type=='2',
                    //     message: '请选择时间',
                    //     trigger: 'change'
                    // }],
                    // TODO-FIXIT
                    // type: [{
                    //     type: 'array',
                    //     required: true,
                    //     message: '请至少选择一个任务类型',
                    //     trigger: 'change'
                    // }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }]
                },
                archiveReady: false,
                // 已上传的文件list
                fileList: []
            }
        },
        computed: {
            taskContent: function () {
                return this.ruleForm.content.join('/')
            }
        },
        methods: {
            stepForward() {
                this.stepsActive++
            },
            // 处理第一步: 填写评测作业信息
            handleFirstStep(formName) {
                // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：
                // 是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
                // 保存vue实例的上下文引用
                let vuectx = this
                // this.$refs引用保存了vue实例<template>中的引用
                this.$refs[formName].validate(function (succeed, fields) {
                    if (succeed) {
                        // 如果校验成功则向前推进
                        vuectx.stepsActive++
                        vuectx.stepsDesc[0] = "已完成"
                        vuectx.stepsDesc[1] = "进行中"
                    } else {
                        console.log(fields)
                        vuectx.$message({
                            message: '请检查您的输入信息',
                            type: 'warning'
                        })
                    }
                });
            },
            // 处理第二步: 上传代码文件
            handleSecondStep() {
                // this.fileList.length <= 0 || 
                if (this.archiveReady == false) {
                    this.$message({
                        message: '您还没有上传任何代码文件',
                        type: 'warning'
                    })
                    return
                }
                this.stepsActive++
                this.stepsDesc[1] = '已完成'
                this.stepsDesc[2] = "进行中"
            },
            // 处理第三步: 检查评测任务信息并开始评测
            doAnalyze() {
                this.$message({
                    message: '您的作业已提交到后台，请耐心等待评测结果',
                    type: 'success'
                })
                this.$router.push({
                    name: 'task',
                    query: {
                        state: 'in-progress'
                    }
                })
            },
            editAgain() {
                this.stepsActive = 0
                this.stepsDesc[0] = '进行中'
                this.stepsDesc[1] = '步骤 2'
                this.stepsDesc[2] = '步骤 3'
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitUpload() {
                //当前模式为auto-upload 无需做额外的事情
            },

            // 上传文件成功的钩子
            handleUploadSuccess(response, file, fileList) {
                // 设置项目文件就绪标志为true
                this.archiveReady = true
                this.$message({
                    message: file.name + '已成功上传',
                    type: 'success'
                });
            },
            // 移除文件成功的钩子
            handleRemoveSuccess(file, fileList) {
                if (fileList.length <= 0) {
                    // 当前没有文件
                    this.archiveReady = false
                }
                this.$message(file.name + '已成功从上传列表中移除');
            }
        }
    }
</script>


<style scoped>
    .breadcrumb {
        margin-bottom: 40px;
    }

    .steps {
        text-align: left
    }

    .step-area {
        margin-top: 50px;
    }

    .info-form {
        width: 460px;
        margin: 2% auto;
        text-align: left;
    }

    /* .info-form /deep/ .el-form-item__content {
        margin-left: 110px !important;
    }

    .info-form /deep/ .el-form-item__label{
        width: 110px !important;
    } */

    .info-form .el-checkbox {
        float: left;
        width: 160px;
        padding-right: 20px;
        margin: 0;
        padding: 0;
    }

    .line {
        text-align: center;
    }

    .step-one-btns {
        text-align: center;
    }

    #start {
        margin-top: 2em;
    }

    .start {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    /* 加上边框 */
    .confirm-div {
        /* padding-top: 20px; */
        width: 80%;
        margin: 0 auto;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
    }

    .info-table {
        border-collapse: collapse;
        width: 98%;
        background-color: #fff;
        font-size: 14px;
        /* margin-bottom: 45px; */
        line-height: 1.2em;
        margin-left: 1%;
        margin-right: 1%;
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