<template>
    <div class="container">
        <div class="content">
            <h1>{{topic.title}}</h1>
            <div class="topic-box">
                <div><img :src="userInfo.avatar" class="avatar"></div>
                <div class="info">
                    <div class="topic-header">
                        <span class="create-user single-line">来自：{{userInfo.nickname}}</span>
                        <span>{{createTime}}</span>
                    </div>
                    <div class="topic-content">
                        <div v-html="topic.content"></div>
                        <div class="reply-button">
                            <Button shape="circle" @click="toShowAnswer">回复</Button>
                        </div>
                        <div class="footer">
                            <Button :class="topicLiked ? 'liked-topic' : 'like-topic'" @click="like">
                                <Icon :type="topicLiked ? 'ios-thumbs-up' : 'ios-thumbs-up-outline'" size="22"></Icon>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="showAnswer" class="answer">
                <Input type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" :maxlength="500"
                    v-model="answer" placeholder="写下你的回复..."/>
                <span class="answer-button" @click="sendAnswer"><Icon type="ios-send-outline" size="40"/></span>
            </div>
            <div class="topic-replies">
                <hr>
                <div v-if="replyCount === 0" class="no-reply">暂无回复!</div>
                <Reply v-for="reply in replies" :key="reply.id" :reply="reply" :likedArray="likes"
                    @answer="sendAnswer"/>
            </div>
            <div class="page" v-if="needPage">
                <Page :page-size="pageSize" :total="replyCount"
                    :current="current" @on-change="getTopic"/>
            </div>
        </div>
        <div class="side">
            <Group :group="group" :userGroups="userGroups"/>
            <SimpleTopic v-for="item in groupRecent" :key="item.id" :topic="item"/>
        </div>
    </div>
</template>

<script>
import { topicDetail, answerTopic, likeMessage } from 'Api/topic'
import { groupTopics } from 'Api/group'
import { timeBeauty } from 'Utils/date'
import Reply from 'Components/Reply.vue'
import Group from 'Components/Group.vue'
import SimpleTopic from 'Components/TopicOnlyName.vue'

export default {
    components: {
        Reply,
        Group,
        SimpleTopic
    },
    data() {
        return {
            topic: {},
            replies: [],
            replyCount: 0,
            likes: [],
            topicLiked: false,
            showAnswer: false,
            answer: '',
            pageSize: 10,
            current: 1,
            group: {},
            groupRecent: [],
            initial: true,
        }
    },
    computed: {
        userInfo() {
            return this.topic.create_user ? this.topic.create_user : {}
        },
        createTime() {
            return this.topic.create_time ? timeBeauty(this.topic.create_time) : ''
        },
        needPage() {
            return this.replyCount > this.pageSize
        },
        userGroups() {
            let userInfo = this.$store.getters.getUserInfo
            return userInfo.member_groups ? userInfo.member_groups : []
        },
    },
    created() {
        this.getTopic()
    },
    beforeRouteUpdate(to, from, next) {
        next()
        this.getTopic()
    },
    methods: {
        getTopic(current) {
            if (current) {
                this.current = current
            }
            const topicId = this.$route.params.id
            topicDetail(topicId, this.current, this.pageSize).then(res => {
                this.topic = res.topic
                this.replies = res.replies.data
                this.replyCount = res.replies.count
                this.likes = res.likes
                this.topicLiked = this.likes.includes(this.topic.id)
                // 侧边栏不随topic更新
                if (this.initial) {
                    this.initial = false
                    this.group = this.topic.group
                    groupTopics(this.group.id, 'create_time', 1, 5).then(res => {
                        this.groupRecent = res.data
                    })
                }
            })
        },
        toShowAnswer() {
            if (!this.showAnswer) {
                this.showAnswer = true
            }
            else {
                this.showAnswer = false
            }
        },
        sendAnswer(event, messageId, answer) {
            let theAnswer = answer ? answer : this.answer
            if (theAnswer) {
                answerTopic(this.topic.id, theAnswer, messageId).then(res => {
                    this.answer = ''
                    this.showAnswer = false
                    this.getTopic()
                })
            }
        },
        like() {
            if (!this.topicLiked) {
                likeMessage(this.topic.id).then(res => {
                    this.topicLiked = true
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}
.content {
    width: 650px;
}
.topic-box {
    display: flex;
    margin-top: 15px;
    .info {
        width: 100%;
    }
    .avatar {
        width: 48px;
        height: 48px;
        margin-right: 10px;
    }
}
.topic-header {
    margin: 12px 0;
    align-content: center;
    font-size: 1.2em;
    span {
        max-width: 400px;
        padding: 0 10px;
    }
}
.topic-content {
    font-size: 1.1em;
    line-height: 1.8;
    min-height: 300px;
    position: relative;
    padding: 10px 10px 80px 10px;
    .reply-button {
        position: absolute;
        right: 50%;
        bottom: 20px;
    }
    .footer {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
    .like-topic {
        font-size: 0.4rem;
        color: #b15226;
        padding: 1px;
        background-color: #fcccb7;
        border: 1px solid #facd6dd7;
        border-radius: 4px;
        outline: none;
        &::after {
            content: '赞';
            vertical-align: bottom;
        }
    }
    .liked-topic {
        font-size: 0.4rem;
        color: #807d7b;
        padding: 1px;
        background-color: #d3d2d1;
        border: 1px solid #a7a6a4d7;
        border-radius: 4px;
        outline: none;
        &::after {
            content: '已赞';
            vertical-align: bottom;
        }
    }
    img {
        width: 600px;
    }
}
.answer {
    position: relative;
    .answer-button {
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
    }
}
.page {
    width: 100%;
    text-align: center;
    display: block;
    margin: 20px 0;
}
.no-reply {
    width: 100%;
    text-align: center;
    font-size: 1.1em;
    margin: 10px 0;
}
</style>
