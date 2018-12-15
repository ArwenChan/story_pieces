<template>
    <div class="container">
        <Group v-for="group in groups" :key="group.id" :group="group"
            :showJoin="false" :showHr="false" class="group-container"/>
        <div class="page" v-if="needPage">
            <Page :page-size="pageSize" :total="totalGroups"
                :current="current" @on-change="getGroups"/>
        </div>
    </div>
</template>

<script>
import Group from 'Components/Group.vue'
import { getGroupData } from 'Api/group'

export default {
    components: {
        Group
    },
    data() {
        return {
            pageSize: 33,
            current: 1,
            totalGroups: 0,
            groups: []
        }

    },
    computed: {
        needPage() {
            return this.totalTopics > this.pageSize
        }
    },
    created() {
        this.getGroups()
    },
    methods: {
        getGroups(current) {
            const page = current ? current : this.current
            getGroupData(page, this.pageSize).then(res => {
                this.groups = res.data
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.group-container {
    width: 31%;
    margin: 10px 10px 10px 0;
}
</style>

