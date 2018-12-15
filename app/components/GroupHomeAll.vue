<template>
    <div class="container">
        <h2>加入的小组</h2>
        <div class="group-container">
            <Group v-for="group in groups" :key="group.id" :group="group"
            :showJoin="false" :showHr="false" class="group-box"/>
        </div>
        <h2>发起的话题</h2>
        <div class="topic-container">
            <SimpleTopic v-for="topic in topics_my_create" :key="topic.id" :topic="topic"
                :showGroup="true" :showAuthor="false"/>
        </div>
        <h2>回应的话题</h2>
        <div class="topic-container">
            <SimpleTopic v-for="topic in topics_my_reply" :key="topic.id" :topic="topic"
                :showGroup="true" :showAuthor="false"/>
        </div>
        <h2>喜欢的话题</h2>
        <div class="topic-container">
            <SimpleTopic v-for="topic in topics_my_like" :key="topic.id" :topic="topic"
                :showGroup="true" :showAuthor="false"/>
        </div>
    </div>
</template>

<script>
import Group from 'Components/Group.vue'
import { getGroupData } from 'Api/group'
import SimpleTopic from 'Components/TopicSimpleItem.vue'
import { myTopicData } from 'Api/topic'
export default {
    components: {
        Group,
        SimpleTopic,
    },
    data() {
        return {
            groups: [],
            'topics_my_create': [],
            'topics_my_reply': [],
            'topics_my_like': [],
        }

    },
    created() {
        this.getGroups()
        this.getTopicData('my_create')
        this.getTopicData('my_reply')
        this.getTopicData('my_like')
    },
    methods: {
        getGroups() {
            getGroupData(1, 12).then(res => {
                this.groups = res.data
            })
        },
        getTopicData(filter) {
            myTopicData(1, 5, filter, 'none').then(res => {
                this['topics_' + filter] = res.data
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
}
.group-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.group-box {
    width: 31%;
    margin: 10px 10px 10px 0;
}
.topic-container {
    width: 100%;
    display: table;
    border-collapse: collapse;
}
h2 {
    margin: 10px 0;
}
</style>
