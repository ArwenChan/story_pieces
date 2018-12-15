<template>
    <div class="head">
        <h1 class="title primary-color" @click="toHome">小组</h1>
        <div class="navbar">
            <slot></slot>
        </div>
        <div class="right">
            <Input search placeholder="小组、话题" class="search-box"
                @on-search="toSearch"/>
            <Dropdown v-if="auth" class="login">
                <a class="primary-color single-line" href="javascript:void(0)">
                    {{user.nickname}} <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native="toUserInfo">用户管理</DropdownItem>
                    <DropdownItem @click.native="logOut">退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div v-else class="login primary-color">
                <span @click="toLogin">登陆&nbsp;·&nbsp;</span>
                <span @click="toRegister">注册</span>
            </div>
        </div>
    </div>
</template>

<script>
import { TOGGLE_POPUP, CHANGE_POPUP } from 'Store/mutation-types'
import { logout, refresh_user_info } from 'Api/user'
export default {
    computed: {
        auth() {
            let auth = this.$store.state.globalUse.hasLogin
            return auth
        },
        user() {
            let user_info = this.$store.getters.getUserInfo
            // 如果登陆了但是没存用户信息
            if (!user_info.mobile && this.auth) {
                refresh_user_info()
            }
            return user_info
        }
    },
    methods: {
        toRegister() {
            this.$store.commit(CHANGE_POPUP, 'register')
            this.$store.commit(TOGGLE_POPUP)
        },
        toLogin() {
            this.$store.commit(CHANGE_POPUP, 'login')
            this.$store.commit(TOGGLE_POPUP)
        },
        logOut() {
            logout()
            if (this.$route.meta.needAuth) {
                this.$router.push('/hot/')
            }
        },
        toHome() {
            this.$router.push({ name: 'home' })
        },
        toUserInfo() {
            this.$router.push({ name: 'userInfo' })
        },
        toSearch(value) {
            this.$emit('search', value)
        }
    }
}
</script>


<style lang="scss" scoped>

.head {
    position: relative;
}
.title {
    display: inline-block;
    line-height: 100px;
    margin-right: 20px;
    font-size: 2.8em;
    cursor: pointer;
}
.navbar {
    display: inline-block;
    line-height: 100px;
}
.search-box {
    width: 170px;
}
.login {
    display: inline-block;
    margin: 0 20px;
    font-size: 1.5em;
    font-weight: bold;
    max-width: 150px;
    cursor: pointer;
}
.right {
    position: absolute;
    right: 0;
    top: 40px;
}
</style>
