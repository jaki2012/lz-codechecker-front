<template>
    <!--登录页面-->
    <div class="login-style">
    
        <div class="login-area">
            <div style="margin-bottom:20px;font-size:17px;">代码质量评测系统登录</div>
            <el-input placeholder="用户名" v-model="userInput.username"></el-input>
            <el-input placeholder="密码" type="password" style="margin-top:30px;margin-bottom:20px;" v-model="userInput.password"></el-input>
            <el-button type="primary" :loading="ifLoading" style="width:350px;" @click="checkPass()">登录</el-button>
        </div>
        <div style="margin-top:10px;margin-left:200px;color:grey">powered by LabSSE Technologies</div>
    
    </div>
</template>

<script>
export default {
    name: 'login',
    components: {
    },
    data() {
        return {
            // mock login name and password
            username: 'root',
            password: '123456',
            userInput: {
                username: '',
                password: ''
            },
            ifLoading: false
        }
    },
    methods: {
        checkPass: function () {
            this.ifLoading = true;
            if (this.userInput.username == this.username 
                    && this.userInput.password == this.password) {
                this.ifLoading = false;
                this.$router.push({ name: 'goods' })
            } else {
                this.$message({
                    message: '账户或密码错误',
                    type: 'warning'
                })
                this.ifLoading = false;
            }
        }
    }
}
</script>

<style scoped>

.login-style {
    padding-top: 60px;
    text-align: center;
}

.login-area {
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    display: inline-block
}
</style>