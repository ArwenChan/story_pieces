<template>
    <div>
        <h1 class="title primary-color" @click="toHome">帐号管理</h1>
        <router-link :to="{name: 'hot'}" class="link secondary-color">返回首页</router-link>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        toHome() {
            this.$router.push({ name: 'userInfo' })
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: inline-block;
    line-height: 100px;
    margin-right: 20px;
    font-size: 2.8em;
    cursor: pointer;
}
.view {
    display: flex;
    justify-content: center;
    align-content: center;
}
.link {
    padding: 15px;
    font-size: 1.5em;
}
</style>
