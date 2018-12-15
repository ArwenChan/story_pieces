<template>
   <div class="container">
        <h1 class="desc">话题精选</h1>
        <div class="topics content">
            <Topic v-for="item in items" :key="item.id" :item="item"/>
        </div>
        <Page class-name="pagination" :page-size="pageSize" :total="total"
            :current="current" @on-change="getTopicData" v-if="needPage"/>
        <div class="side">
            <div class="group-title">推荐小组</div>
            <Group v-for="group in groups" :key="group.id" :group="group"
                :userGroups="userGroups"/>
        </div>
    </div>
</template>

<script>
import Topic from 'Components/Topic.vue'
import Group from 'Components/Group.vue'
import { api } from 'Api/api'
import { topicList } from 'Api/topic'

export default {
    components: {
        Topic,
        Group,
    },
    data() {
        return {
            items: [],
            groups: [],
            pageSize: 10,
            total: 1,
            current: 1,
        }
    },
    computed: {
        userGroups() {
            let user_info = this.$store.getters.getUserInfo
            return user_info.member_groups ? user_info.member_groups : []
        },
        needPage() {
            return this.total > this.pageSize
        }
    },
    created() {
        this.getTopicData()
        this.getGroupData()
    },
    beforeRouteUpdate(to, from, next) {
        next()
        this.getTopicData()
    },
    methods: {
        getTopicData(current) {
            const page = current ? current : this.current
            topicList(page, this.pageSize, this.$route.query.q).then(res => {
                this.items = res.data
                this.total = res.count
            })
        },
        getGroupData() {
            let data = {}
            api.get('hot_group_list', data).then(res => {
                this.groups = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}
.desc {
    margin-bottom: 20px;
}
.topics {
    width: 750px;
}
.pagination {
    position: relative;
    left: 25%;
}
.group-title {
    font-size: 2em;
    font-weight: 900;
    padding: 10px 0 20px 0;
}
</style>

