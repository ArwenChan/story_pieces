<template>
    <div class="register-box">
        <form class="register-form">
            <div class="title">注册</div>
            <Input type="text" placeholder="手机号" v-model="phone"
                @change.native="checkPhone"/>
            <VerifyCode :hasPlaceHolder="true" :disable="disableCode" :phone="phone"
                type="register" @error="codeError" @finish="codeFinish"></VerifyCode>
            <Input type="password" placeholder="密码" v-model="password"
                @change.native="checkPassword"/>
            <Input type="text" placeholder="创建名号" v-model.trim="nickname"
                @change.native="checkName"/>
            <Alert type="error" :class="{'hidden': !has_error}" show-icon>{{error_msg}}</Alert>
            <div class="buttons">
                <Button shape="circle" class="sign-button" @click="submit">注册</Button>
            </div>
            <div class="login primary-color" @click="toLogin">去登陆</div>
        </form>
    </div>
</template>
<script>
import {
    validate_phone,
    validate_password,
    validate_nickname,
    validate_verify_code,
} from '../utils/validate.js'
import { register } from 'Api/user'
import { TOGGLE_POPUP, CHANGE_POPUP } from 'Store/mutation-types'
import { mapMutations } from 'vuex'
import VerifyCode from 'Components/VerifyCode.vue'

export default {
    components: {
        VerifyCode
    },
    data() {
        return {
            phone: '',
            verCode: '',
            password: '',
            nickname: '',
            has_error: false,
            error_msg: '',
            getTimer: null,
            seconds: 0,
            isGettingCode: false,
            disableCode: true,
        }
    },
    methods: {
        ...mapMutations({
            close: TOGGLE_POPUP,
        }),
        checkPhone() {
            if (!validate_phone(this.phone)) {
                this.disableCode = true
                this.has_error = true
                this.error_msg = '请输入正确的手机号码'
                return false
            }
            this.has_error = false
            this.disableCode = false
            return true
        },
        checkPassword() {
            if (!validate_password(this.password)) {
                this.has_error = true
                this.error_msg = '密码需是8位以上包含数字和字母'
                return false
            }
            this.has_error = false
            return true
        },
        checkName() {
            if (!validate_nickname(this.nickname)) {
                this.has_error = true
                this.error_msg = '名号格式不正确'
                return false
            }
            this.has_error = false
            return true
        },
        checkVerCode() {
            if (!validate_verify_code(this.verCode)) {
                this.has_error = true
                this.error_msg = '验证码格式不正确'
                return false
            }
            this.has_error = false
            return true
        },
        submit() {
            if (this.hasError) {
                return
            }
            if (!this.checkPhone() || !this.checkVerCode() ||
                !this.checkPassword() || !this.checkName()) {
                return
            }
            if (this.phone && this.password && this.nickname && this.verCode) {
                register(this.phone, this.password, this.nickname, this.verCode).then(res => {
                    this.$message.info('注册成功')
                    this.close()
                })
            }
            else {
                this.has_error = true
                this.error_msg = '请填写完整'
            }

        },
        codeError(error_msg) {
            this.hasError = true
            this.error_msg = error_msg
        },
        codeFinish(code) {
            this.hasError = false
            this.verCode = code
        },
        toLogin() {
            this.$store.commit(CHANGE_POPUP, 'login')
        }
    }
}
</script>


<style lang="scss" scoped>
.register-box {
    width: 60%;
    height: 100%;
    margin: auto;
}
.register-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
}
.verify-box {
    position: relative;
    input {
        width: 100%;
    }
}
.verify {
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        cursor: pointer;
    }
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
.login-button {
    float: right;
}
.sign-button {
    float: left;
}
.hidden {
    visibility: hidden;
}
.buttons {
    align-self: center;
}
.login {
    cursor: pointer;
    align-self: flex-end;
}
</style>
