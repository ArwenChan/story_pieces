<template>
    <div class="verify-box">
        <label for="verify-code" v-show="hasLabel">验证码：</label>
        <Input type="text" id="verify-code" :placeholder="hasPlaceHolder ? '验证码' : ''"
            v-model.trim="verCode" @change.native="checkVerCode" class="input" :disabled="disable">
            <div slot="append" style="width:70px;">
                <Button v-if="!getTimer" :disabled="disable" @click="getCode" >
                    发送验证码
                </Button>
                <Button v-else disabled>{{seconds}}s重新获取</Button>
            </div>
        </Input>
    </div>
</template>

<script>
import { validate_verify_code } from '../utils/validate.js'
import { get_verify_code } from 'Api/user'

export default {
    props: {
        disable: {
            type: Boolean,
            default: true,
        },
        hasPlaceHolder: {
            type: Boolean,
            default: false
        },
        hasLabel: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'register'
        }
    },
    data() {
        return {
            verCode: '',
            seconds: 0,
            getTimer: null,
            isGettingCode: false,
        }
    },
    methods: {
        getCode() {
            if (this.isGettingCode) {
                this.$message.info('正在获取验证码')
            }
            this.isGettingCode = true
            get_verify_code(this.phone, this.type).then(res => {
                this.doCountDown()
                this.$message.info('获取验证码成功')
                this.isGettingCode = false
            })
        },
        // 倒计时
        doCountDown() {
            clearInterval(this.getTimer)
            this.seconds = 60
            this.getTimer = setInterval(() => {
                if (this.seconds > 0) {
                    this.seconds -= 1
                }
                else {
                    clearTimeout(this.getTimer)
                    this.getTimer = null
                }
            }, 1000)
        },
        checkVerCode() {
            if (!validate_verify_code(this.verCode)) {
                this.$emit('error', '验证码格式有误')
            }
            else {
                this.$emit('finish', this.verCode)
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.verify-box {
    display: flex;
    width: 100%;
}

label {
    word-break: keep-all;
    align-self: center;
}
</style>
