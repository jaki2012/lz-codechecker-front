<template>
<div>
    <el-upload class="upload-area" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传zip/gzip文件，且不超过500kb</div>
    </el-upload>
    <div id="start">
    <el-button id="start-button" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        submitUpload() {
            
        }
    }
}
</script>


<style scoped>
    .upload-area {
        margin-top: 100px;
    }
    
    #start{
        margin-top: 2em;
    }
</style>