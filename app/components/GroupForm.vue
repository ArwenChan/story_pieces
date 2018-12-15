<template>
    <div class="content">
        <div class="inputs">
            <label for="name" class="label">小组名称：</label>
            <Input type="text" element-id="name" v-model="name" :maxlength="30"/>
        </div>
        <div class="inputs">
            <label for="icon" :class="icon ? 'area-label' : 'label'">小组头像：</label>
            <img :src="icon" class="avatar" v-if="icon">
            <Upload
                id="icon"
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
        <div class="inputs">
            <label for="brief" class="area-label">小组介绍：</label>
            <Input element-id="brief" type="textarea" v-model="brief" class="area-input"
                :autosize="{ minRows: 4, maxRows: 6 }" :maxlength="500"/>
        </div>
        <div class="inputs">
            <label for="tags" class="label">小组标签：</label>
            <Input element-id="tags" type="text" v-model="tags"/>
        </div>
        <div class="tips">最多设置5个标签，标签作为关键词可以被用户搜索到，多个标签之间用空格分隔开。</div>
        <div class="inputs">
            <label for="phone" class="label">手机号：</label>
            <span>{{secretMobile}}</span>
        </div>
        <Button type="primary" class="button" @click="submit">提交</Button>
    </div>
</template>
<script>
import { host } from 'Api/paths'
import { getCookie } from 'Utils/storage'
import { avatarPreview } from 'Utils/image'
import { createGroup, editGroup } from 'Api/group'
export default {
    props: {
        group: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            name: this.group ? this.group.name : '',
            icon: this.group ? this.group.icon : '',
            brief: this.group ? this.group.brief : '',
            tags: this.group ? ''.concat(...this.group.tags) : '',
            uploadUrl: host + '/upload/',
            headers: { 'zhouyu': getCookie('machao') },
            uploaded: false,
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
            let name = this.user.mobile.substr(-4) + '*' + String(timeStamp).substr(-7)
            return name
        },
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
                this.icon = avatarPreview(data.result.file)
            }
            else {
                this.$message.warning('上传失败')
            }
        },
        validateTags() {
            const tagsArray = this.tags ? this.tags.split(' ') : []
            if (tagsArray.length > 5) {
                this.$message.warning('标签不得超过5个')
                return
            }
            for (let tag of tagsArray) {
                if (tag.length > 10) {
                    this.$message.warning('标签长度不得超过10')
                    return
                }
            }
            return tagsArray
        },
        submit() {
            const tags = this.validateTags()
            if (!tags) {
                return
            }
            if (this.group) {
                editGroup(this.group.id, this.name, this.icon, this.brief, tags).then(res => {
                    this.$message.success('更新成功')
                })
            }
            else {
                createGroup(this.name, this.icon, this.brief, tags).then(res => {
                    this.$message.success('创建成功，审核中...')
                    setTimeout(this.$router.push('/mine/'), 2000)
                })
            }
        },
    }
}
</script>
<style scoped>
.content {
    width: 500px;
    height: 500px;
    content: 500px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.inputs {
    display: flex;
    margin: 10px 0;
    align-content: flex-start;
}
.tips {
    color:rgb(161, 158, 158);
    padding-bottom: 10px;
}
.button {
    width: 100px;
    align-self: center;
}
.area-label {
    word-break: keep-all;
    align-self: flex-start;
}
.label {
    word-break: keep-all;
    align-self: center;
}
.area-input {
    resize: none;
}
h2 {
    padding: 20px 0 10px 0;
}
.avatar {
    vertical-align: top;
    margin: 5px 5px 10px 5px;
}
</style>
