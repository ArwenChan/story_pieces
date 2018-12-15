<template>
    <div class="container">
        <SimpleTopic v-for="topic in topics" :key="topic.id" :topic="topic"
            :showGroup="true" :showAuthor="false"/>
        <div class="page" v-if="needPage">
            <Page :page-size="pageSize" :total="totalTopics"
                :current="current" @on-change="getTopicData"/>
        </div>
    </div>
</template>

<script>
import SimpleTopic from 'Components/TopicSimpleItem.vue'
import { myTopicData } from 'Api/topic'
export default {
    components: {
        SimpleTopic,
    },
    props: {
        filter: String
    },
    data() {
        return {
            topics: [],
            pageSize: 20,
            totalTopics: 0,
            current: 1,
        }
    },
    computed: {
        needPage() {
            return this.totalTopics > this.pageSize
        }
    },
    created() {
        this.getTopicData()
    },
    methods: {
        getTopicData(current) {
            const page = current ? current : this.current
            myTopicData(page, this.pageSize, this.filter, 'none').then(res => {
                this.topics = res.data
                this.totalTopics = res.count
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: table;
    border-collapse: collapse;
}
</style>
