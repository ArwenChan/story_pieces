<template>
    <div class="container">
        <div class="content">
            <h1>我的小组主页</h1>
            <a id="home" class="tab primary-color button" @click="toHome">小组主页</a>
            <a id="group" class="tab primary-color" @click="toGroup">加入的小组</a>
            <a id="created" class="tab primary-color" @click="toCreated">发起</a>
            <a id="answered" class="tab primary-color" @click="toReplied">回应</a>
            <a id="liked" class="tab primary-color" @click="toLiked">喜欢</a>
            <hr/>
            <keep-alive>
                <component :is="currentTab" v-bind="bindData"></component>
            </keep-alive>
        </div>
        <div class="side">
            <div class="avatar-container">
                <div><img :src="user.avatar ? user.avatar : defaultAvatar" class="avatar"></div>
                <div class="user-info">
                    <p class="single-line">{{user.nickname}}</p>
                    <p class="single-line" v-if="user.city">({{user.city}})</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GroupJoined from 'Components/GroupJoined.vue'
import GroupHomeAll from 'Components/GroupHomeAll.vue'
import TopicList from 'Components/SimpleTopicList.vue'
import { mapGetters } from 'vuex'
import { DEFAULT_AVATAR } from 'Api/user'
export default {
    components: {
        GroupHomeAll,
        GroupJoined,
        TopicListCreate: TopicList,
        TopicListReply: TopicList,
        TopicListLike: TopicList,
    },
    data() {
        return {
            groups: [],
            createdTopics: [],
            currentTab: GroupHomeAll,
            bindData: {},
            defaultAvatar: DEFAULT_AVATAR,
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserInfo'
        }),
    },
    methods: {
        toHome() {
            document.querySelector('#home').classList.remove('button')
            document.querySelector('#group').classList.remove('button')
            document.querySelector('#created').classList.remove('button')
            document.querySelector('#answered').classList.remove('button')
            document.querySelector('#liked').classList.remove('button')
            document.querySelector('#home').classList.add('button')
            this.currentTab = GroupHomeAll
        },
        toGroup() {
            document.querySelector('#home').classList.remove('button')
            document.querySelector('#group').classList.remove('button')
            document.querySelector('#created').classList.remove('button')
            document.querySelector('#answered').classList.remove('button')
            document.querySelector('#liked').classList.remove('button')
            document.querySelector('#group').classList.add('button')
            this.bindData = { groups: this.groups }
            this.currentTab = GroupJoined
        },
        toCreated() {
            document.querySelector('#home').classList.remove('button')
            document.querySelector('#group').classList.remove('button')
            document.querySelector('#created').classList.remove('button')
            document.querySelector('#answered').classList.remove('button')
            document.querySelector('#liked').classList.remove('button')
            document.querySelector('#created').classList.add('button')
            this.bindData = { filter: 'my_create' }
            this.currentTab = 'TopicListCreate'
        },
        toReplied() {
            document.querySelector('#home').classList.remove('button')
            document.querySelector('#group').classList.remove('button')
            document.querySelector('#created').classList.remove('button')
            document.querySelector('#answered').classList.remove('button')
            document.querySelector('#liked').classList.remove('button')
            document.querySelector('#answered').classList.add('button')
            this.bindData = { filter: 'my_reply' }
            this.currentTab = 'TopicListReply'
        },
        toLiked() {
            document.querySelector('#home').classList.remove('button')
            document.querySelector('#group').classList.remove('button')
            document.querySelector('#created').classList.remove('button')
            document.querySelector('#answered').classList.remove('button')
            document.querySelector('#liked').classList.remove('button')
            document.querySelector('#liked').classList.add('button')
            this.bindData = { filter: 'my_like' }
            this.currentTab = 'TopicListLike'
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
.tab {
    display: inline-block;
    border: 1px solid white;
    border-radius: 6px;
    font-size: 1.4em;
    cursor: pointer;
    margin: 20px 10px 5px 0;
    padding: 2px;
}
.button {
    color: white;
    background-color: #b15226;
    border-color:#d3b861;
}
.avatar-container {
    display: flex;
    text-align: center;
    margin: 15px;
    .avatar {
        width: 48px;
        height: 48px;
    }
    .user-info {
        max-width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px;
    }
}
</style>
