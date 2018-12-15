<template>
    <div class="container">
        <div class="content">
            <div class="group" v-if="creater.length > 0">
                <div class="header primary-color">
                    组长...
                </div>
                <div class="users">
                    <div v-for="item in creater" :key="item.user.id" class="avatar-container">
                        <img :src="item.user.avatar" class="avatar">
                        <p>{{item.user.nickname}}</p>
                        <p v-if="item.user.city">({{item.user.city}})</p>
                    </div>
                </div>
            </div>
            <div class="group" v-if="manager.length > 0">
                <div class="header primary-color">
                    管理员...
                </div>
                <div class="users">
                    <div v-for="item in manager" :key="item.user.id" class="avatar-container">
                        <img :src="item.user.avatar" class="avatar">
                        <p>{{item.user.nickname}}</p>
                        <p v-if="item.user.city">({{item.user.city}})</p>
                    </div>
                </div>
            </div>
            <div class="group" v-if="normal.length > 0">
                <div class="header primary-color">
                    组员...
                </div>
                <div class="users">
                    <div v-for="item in normal" :key="item.user.id" class="avatar-container">
                        <img :src="item.user.avatar" class="avatar">
                        <p>{{item.user.nickname}}</p>
                        <p v-if="item.user.city">({{item.user.city}})</p>
                    </div>
                </div>
            </div>
            <div class="page" v-if="needPage">
                <Page :page-size="pageSize" :total="usersCount"
                    :current="current" @on-change="getGroupUsers"/>
            </div>
        </div>
        <div class="side">
            <Group :group="group" :userGroups="userGroups"></Group>
            <div class="side-body">
                <h2>小组简介</h2>
                {{group.brief}}
            </div>
        </div>
    </div>
</template>

<script>
import { groupUsers, groupDetail } from 'Api/group'
import Group from 'Components/Group.vue'

export default {
    components: {
        Group,
    },
    data() {
        return {
            users: [],
            usersCount: 0,
            group: {},
            pageSize: 20,
            current: 1,
        }
    },
    computed: {
        creater() {
            if (this.current === 1) {
                return this.users.filter((value) => {
                    return value.role === 'create_user'
                })
            }
            return []
        },
        manager() {
            if (this.current === 1) {
                return this.users.filter((value) => {
                    return value.role === 'manager'
                })
            }
            return []
        },
        normal() {
            if (this.current === 1) {
                return this.users.filter((value) => {
                    return value.role === 'user'
                })
            }
            return this.users
        },
        needPage() {
            return this.usersCount > this.pageSize
        },
        userGroups() {
            let userInfo = this.$store.getters.getUserInfo
            return userInfo.member_groups ? userInfo.member_groups : []
        },
    },
    created() {
        this.getGroup()
        this.getGroupUsers()
    },
    methods: {
        getGroup() {
            const groupId = this.$route.params.id
            groupDetail(groupId).then(res => {
                this.group = res
            })
        },
        getGroupUsers(current) {
            const groupId = this.$route.params.id
            let page = current ? current : this.current
            groupUsers(groupId, page, this.pageSize).then(res => {
                this.users = res.data
                this.usersCount = res.count
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}
.content {
    width: 700px;
}
.header {
    font-size: 1.7em;
    margin: 20px 0;
}
.avatar-container {
    max-width: 65px;
    text-align: center;
    margin: 15px;
    .avatar {
        width: 48px;
        height: 48px;
    }
}
.group {
    display: block;
}
.users {
    display: flex;
    flex-wrap: wrap;
}
.side-body {
    margin: 10px 2px;
    padding: 10px 10px;
    line-height: 1.8;
    height: 300px;
    overflow: auto;
    background-color: rgb(248, 239, 217);
}
</style>
