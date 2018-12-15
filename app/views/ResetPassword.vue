<template>
    <div class="container">
        <div class="inputs">
            <label>手机号：</label>
            <Input type="text" v-model="phone" @change.native="validatePhone"/>
        </div>
        <VerifyCode :hasLabel="true" :disable="disableCode" :phone="phone"
            type="reset_password" @error="codeError" @finish="codeFinish"></VerifyCode>
        <div class="inputs">
            <label>新密码：</label>
            <Input type="password" v-model="password" @change.native="validatePassword"/>
        </div>
        <Button type="primary" @click="submit" class="button">重置密码</Button>
    </div>
</template>
<script>
import {
    validate_phone,
    validate_password,
    validate_verify_code
} from '../utils/validate.js'
import { resetPassword } from 'Api/user'
import VerifyCode from 'Components/VerifyCode.vue'
export default {
    components: {
        VerifyCode
    },
    data() {
        return {
            password: '',
            phone: '',
            verifyCode: '',
            disableCode: true,
            hasError: false,
        }
    },
    methods: {
        validatePassword() {
            if (!validate_password(this.password)) {
                this.hasError = true
                this.$message.warning('请填写格式正确的密码')
                return false
            }
            this.hasError = false
            return true
        },
        validatePhone() {
            if (!validate_phone(this.phone)) {
                this.hasError = true
                this.$message.warning('请填写正确的手机号')
                this.disableCode = true
                return false
            }
            this.hasError = false
            this.disableCode = false
            return true
        },
        validateVerCode() {
            if (!validate_verify_code(this.verifyCode)) {
                this.has_error = true
                this.$message.warning('验证码格式不正确')
                return false
            }
            this.has_error = false
            return true
        },
        codeError(error_msg) {
            this.hasError = true
            this.$message.warning(error_msg)
        },
        codeFinish(code) {
            this.hasError = false
            this.verifyCode = code
        },
        submit() {
            if (this.hasError) {
                return
            }
            if (!this.validatePhone() || !this.validateVerCode() || !this.validatePassword()) {
                return
            }
            if (this.phone && this.verifyCode && this.password) {
                resetPassword(this.phone, this.verifyCode, this.password).then(res => {
                    this.$router.replace({ name: 'hot' })
                })
            }
            else {
                this.$message.warning('请填写完整')
            }
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 250px;
    height: 300px;
}
.inputs {
    width: 100%;
    display: flex;
}
label {
    word-break: keep-all;
    align-self: center;
}
.button {
    width: 100px;
    align-self: center;
}
</style>
