<template>
    <div class="group-img-container">
        <div class="title-container">
            <span class="title">常去的小组</span>
            <router-link to="/group/home/">全部 ></router-link>
        </div>
        <div class="group-img-list">
            <router-link v-for="item in myGroups" :key="item.id" :to="`/group/${item.id}/`">
                <img :src="item.icon" :alt="item.name" class="group-icon">
            </router-link>
        </div>
        <router-link class="create-group" to="/create-group/">+申请创建小组</router-link>
    </div>
</template>
<script>
export default {
    props: {
        myGroups: Array,
    },
}
</script>
<style scoped>
.group-img-container {
    width: 200px;
    margin-top: 50px;
}
.title-container {
    display: flex;
    justify-content: space-between;
}
.title {
    font-size: 1.3em;
}
.group-img-list {
    display: flex;
    flex-wrap: wrap;
}
.group-icon {
    width: 48px;
    height: 48px;
    margin: 1px;
}
</style>
