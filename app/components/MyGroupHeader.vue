<template>
    <div class="group-header-wrapper">
        <img :src="user.avatar" class="avatar">
        <div class="info">
            <router-link to="/group/home/" class="title">我的小组主页</router-link>
            <p>{{user.nickname}}</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'getUserInfo'
        }),
        cityInfo() {
            return this.user.province + ' ' + this.user.city
        }
    }
}
</script>
<style scoped>
.group-header-wrapper {
    width: 200px;
    display: flex;
    justify-content: flex-start;
}
.info {
    font-size: 1.1em;;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.title {
    font-size: 1.2em;
}
.avatar {
    width: 4.4em;
    height: 4.4em;
    margin-right: 10px;
}
</style>
