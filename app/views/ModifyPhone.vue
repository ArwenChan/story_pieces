<template>
    <div class="container">
        <Steps :current="current" :status="status">
            <Step title="验证密码"></Step>
            <Step title="验证新手机"></Step>
        </Steps>
        <div v-if="current === 0" class="step">
            <!-- <form action=""> -->
                <div class="inputs">
                    <label>密码：</label>
                    <Input type="password" v-model="password"/>
                </div>
            <!-- </form> -->
            <Button type="primary" @click="validatePassword" class="button">下一步</Button>
        </div>
        <div v-if="current === 1" class="step">
            <div class="inputs">
                <label>手机号：</label>
                <Input type="text" v-model="phone" @change.native="validatePhone"/>
            </div>
            <VerifyCode :hasLabel="true" :disable="disableCode" :phone="phone"
                type="change_mobile" @error="codeError" @finish="codeFinish"></VerifyCode>
            <Button type="primary" @click="submit" class="button">确认修改</Button>
        </div>
    </div>
</template>
<script>
import { validate_phone, validate_password } from '../utils/validate.js'
import { checkPassword, changeMobile } from 'Api/user'
import VerifyCode from 'Components/VerifyCode.vue'
export default {
    components: {
        VerifyCode
    },
    data() {
        return {
            current: 0,
            status: 'process',
            password: '',
            phone: '',
            verifyCode: '',
            disableCode: true,
            hasError: false,
        }
    },
    methods: {
        validatePassword() {
            if (!this.password) {
                this.hasError = true
                this.$message.warning('请填写完整')
                return
            }
            if (!validate_password(this.password)) {
                this.hasError = true
                this.$message.warning('请填写格式正确的密码')
                return
            }
            checkPassword(this.password).then(res => {
                this.hasError = false
                this.current = 1
            })
        },
        validatePhone() {
            if (!validate_phone(this.phone)) {
                this.hasError = true
                this.$message.warning('请填写正确的手机号')
                this.disableCode = true
                return
            }
            this.hasError = false
            this.disableCode = false
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
            if (this.phone && this.verifyCode) {
                changeMobile(this.phone, this.verifyCode).then(res => {
                    this.status = 'finish'
                    this.$router.replace({ name: 'userInfo' })
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
    justify-content: space-between;
    align-content: center;
    width: 400px;
    height: 400px;
}
.step {
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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

