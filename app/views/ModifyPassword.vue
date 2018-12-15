<template>
    <div class="container">
        <div class="inputs">
            <label>旧密码：</label>
            <Input type="password" v-model="oldPassword"/>
        </div>
        <div class="inputs">
            <label>新密码：</label>
            <Input type="password" v-model="password"/>
        </div>
        <div class="inputs">
            <label>确认新密码：</label>
            <Input type="password" v-model="confirmPassword"/>
        </div>
        <Button type="primary" @click="submit" class="button">确认修改</Button>
    </div>
</template>
<script>
import { modifyPassword } from 'Api/user'
import { validate_password } from '../utils/validate.js'
import { TOGGLE_POPUP, CHANGE_POPUP } from 'Store/mutation-types'
export default {
    data() {
        return {
            oldPassword: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        validate() {
            if (!(this.oldPassword && this.password && this.confirmPassword)) {
                this.$message.warning('请填写完整')
                return false
            }
            if (!validate_password(this.password)) {
                this.$message.warning('新密码格式不正确')
                return false
            }
            if (!validate_password(this.oldPassword)) {
                this.$message.warning('旧密码格式不正确')
                return false
            }
            if (this.password !== this.confirmPassword) {
                this.$message.warning('确认不一致')
                return false
            }
            return true
        },
        submit() {
            if (this.validate()) {
                modifyPassword(this.oldPassword, this.password).then(res => {
                    this.$router.replace({ name: 'hot' })
                    this.$store.commit(CHANGE_POPUP, 'login')
                    this.$store.commit(TOGGLE_POPUP)
                })
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

