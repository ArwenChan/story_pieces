<template>
    <div class="login-box">
        <form class="login-form">
            <div class="title">欢迎到来，请登陆</div>
            <Input type="text" placeholder="手机号" v-model="phone" @on-focus="clearError"/>
            <Input type="password" placeholder="密码" v-model="password" @on-focus="clearError"/>
            <Alert type="error" :class="{'hidden': !has_error}" show-icon>{{error_msg}}</Alert>
            <div class="buttons">
                <Button shape="circle" class="login-button" @click="Login">登陆</Button>
            </div>
            <div class="bottom">
                <span class="register primary-color" @click="toRegister">去注册</span>&nbsp;&nbsp;
                <span class="register primary-color" @click="toReset">忘记密码</span>
            </div>
        </form>
    </div>
</template>
<script>
import { CHANGE_POPUP, TOGGLE_POPUP } from 'Store/mutation-types'
import { mapMutations } from 'vuex'
import { login } from 'Api/user'

export default {
    data() {
        return {
            phone: '',
            password: '',
            has_error: false,
            error_msg: ''
        }
    },
    methods: {
        ...mapMutations({
            close: TOGGLE_POPUP,
        }),
        toRegister() {
            this.$store.commit(CHANGE_POPUP, 'register')
        },
        toReset() {
            this.close()
            this.$router.push('/user/reset-password/')
        },
        clearError() {
            this.has_error = false
            this.error_msg = ''
        },
        Login() {
            if (this.has_error) {
                return
            }
            if (this.phone && this.password) {
                login(this.phone, this.password).then(res => {
                    this.$message.info('登陆成功')
                    this.close()
                })
            }
            else {
                this.has_error = true
                this.error_msg = '填写完整才可以登陆'
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.login-box {
    width: 50%;
    height: 100%;
    margin: auto;
}
.login-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
}
input {
    border: none;
    border-bottom: 1px solid black;
    &:focus {
        outline: none;
    }
}
.title {
    font-size: 20px;
    font-weight: bold;
}
.buttons {
    align-self: center;
}
.bottom {
    align-self: flex-end;
}
.register {
    cursor: pointer;
}
.hidden {
    visibility: hidden;
}
</style>
