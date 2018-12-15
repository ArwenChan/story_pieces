<template>
   <div class="container">
        <h1 class="desc">我的小组话题</h1>
        <div class="topics">
            <Topic v-for="item in items" :key="item.id" :item="item"/>
        </div>
        <Page class-name="pagination" :page-size="pageSize" :total="total"
            :current="current" @on-change="getTopicData" v-if="needPage"/>
        <div class="side">
            <GroupHeader></GroupHeader>
            <GroupImg :myGroups="groups"/>
        </div>
    </div>
</template>

<script>
import Topic from 'Components/Topic.vue'
import GroupImg from 'Components/GroupImg.vue'
import GroupHeader from 'Components/MyGroupHeader.vue'
import { getGroupData } from 'Api/group'
import { myTopicData } from 'Api/topic'

export default {
    components: {
        Topic,
        GroupImg,
        GroupHeader
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
        needPage() {
            return this.total > this.pageSize
        }
    },
    created() {
        this.getTopicData()
        this.getGroups()
    },
    methods: {
        getTopicData(current) {
            const page = current ? current : this.current
            myTopicData(page, this.pageSize, 'my_group', 'hot').then(res => {
                this.items = res.data
                this.total = res.count
            })
        },
        getGroups() {
            getGroupData(1, 8).then(res => {
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

</style>

