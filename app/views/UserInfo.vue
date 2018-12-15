<template>
    <div class="container">
        <div class="inputs">
            <label for="name">名号：</label>
            <Input id="name" type="text" v-model="nickname"/>
        </div>
        <div>
            <label>头像：</label><img :src="avatar" class="avatar">
            <img :src="newAvatar" class="avatar" v-show="uploaded">
            <Upload
                name="image"
                :with-credentials="true"
                :show-upload-list="false"
                :headers="headers"
                :max-size="2048"
                :on-error="handleError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess"
                :data="{name: imageName}"
                :action="uploadUrl"
                class="upload">
                <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
        </div>
        <div>
            <label>常居地：</label><span>{{province}}&nbsp;</span><span>{{city}}&nbsp;</span>
            <span class="move-button primary-color" @click="toMove">搬家</span>
            <Location v-show="selectCity" @choose="moved"></Location>
        </div>
        <div>
            <label>登陆密码：</label><router-link to="/user/modify-password/">更改</router-link>
        </div>
        <div>
            <label>手机号：</label><span>{{secretMobile}}&nbsp;</span><router-link to="/user/modify-phone/">更改</router-link>
        </div>
        <Button type="primary" class="button" @click="submit">更新</Button>
    </div>
</template>
<script>
import { host } from 'Api/paths'
import { changeUserInfo } from 'Api/user'
import { avatarPreview } from 'Utils/image'
import { getCookie } from 'Utils/storage'
import Location from 'Components/Location.vue'

export default {
    components: {
        Location,
    },
    inject: ['reload'],
    data() {
        return {
            nickname: '',
            avatar: '',
            province: '',
            city: '',
            newAvatar: '',
            uploadUrl: host + '/upload/',
            headers: { 'zhouyu': getCookie('machao') },
            uploaded: false,
            selectCity: false,
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUserInfo
        },
        secretMobile() {
            let mobile = this.user.mobile
            return mobile.substr(0, 3) + '****' + mobile.substr(-4)
        },
        imageName() {
            let time = new Date()
            let timeStamp = time.getTime()
            let name = this.secretMobile + '*' + String(timeStamp).substr(-7)
            return name
        }
    },
    created() {
        this.nickname = this.user.nickname
        this.province = this.user.province
        this.city = this.user.city
        this.avatar = this.user.avatar
        this.newAvatar = this.avatar
    },
    methods: {
        handleError(errObj) {
            this.$message.error(errObj.error)
        },
        handleMaxSize() {
            this.$message.error('文件不可超过2M')
        },
        handleSuccess(data) {
            if (data.result && data.result.file) {
                this.uploaded = true
                this.newAvatar = avatarPreview(data.result.file)
            }
            else {
                this.$message.warning('上传失败')
            }
        },
        toMove() {
            this.selectCity = true
        },
        moved({ province, city }) {
            this.selectCity = false
            this.province = province
            this.city = city
        },
        submit() {
            let changedData = {}
            if (this.nickname !== this.user.nickname) {
                changedData['nickname'] = this.nickname
            }
            if (this.newAvatar !== this.avatar) {
                changedData['avatar'] = this.newAvatar
            }
            if (this.province !== this.user.province) {
                changedData['province'] = this.province
            }
            if (this.city !== this.user.city) {
                changedData['city'] = this.city
            }
            if (Object.keys(changedData).length > 0) {
                changeUserInfo(changedData).then(res => {
                    this.reload()
                })
            }
            this.$message.success('更新成功')
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: flex-start;
    width: 400px;
    height: 300px;
}
.inputs {
    width: 200px;
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
.avatar {
    vertical-align: top;
    margin: 5px 5px 10px 5px;
}
.move-button {
    cursor: pointer;
}
.upload {
    display: inline-block;
}
</style>
