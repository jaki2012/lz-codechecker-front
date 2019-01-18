<template>
    <!--登录页面-->
    <div class="login-style">
        <div class="login-area">
            
            <div id="login-title">代码质量评测系统登录</div>
            <el-input placeholder="用户名" v-model="userInput.username"></el-input>
            <el-input placeholder="密码" type="password" style="margin-top:30px;margin-bottom:20px;" v-model="userInput.password"></el-input>
            <el-button type="primary" :loading="ifLoading" style="width:300px;" @click="checkPass()">登录</el-button>
        </div>
        <div id="copyright-tag">powered by LabSSE Technologies</div>
    
    </div>
</template>

<script>
import store from '@/vuex/store'
export default {
    name: 'login',
    store,
    components: {
    },
    data() {
        return {
            // mock login name and password
            // mockUsername: 'root',
            // mockPassword: '123456',
            mockUsername: 'cloud_user1',
            mockPassword: '222222',
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
            if (this.userInput.username == this.mockUsername 
                    && this.userInput.password == this.mockPassword) {
                this.ifLoading = false;
                store.commit('login')
                this.$message({
                    message: '您已登录成功',
                    type: 'success'
                });
                this.$router.push({ name: 'home' })
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
    padding-top: 15%;
    text-align: center;
}

#login-title {
    margin-bottom:20px;
    font-size:16px;
}

.login-area {
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 300px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    display: inline-block
}

#copyright-tag {
    color: #bbbaba;
    font-size: 13px;
    margin-top:10px;
    margin-left:150px;
}
</style>