<template>
    <div class="container">
        <div>
            <img :src="reply.create_user.avatar ? reply.create_user.avatar : defaultAvatar"
            alt="avatar" class="avatar">
        </div>
        <div class="reply">
            <div class="header">
                <span class="nickname single-line primary-color">{{reply.create_user.nickname}}</span>
                <span>{{createTime}}</span>
            </div>
            <div class="content">
                <div class="answer-to" v-if="reply.answer_to_message">
                    <p>
                        {{reply.answer_to_message.content}}
                        <span class="primary-color">@{{reply.answer_to_message.create_user}}</span>
                    </p>
                </div>
                {{reply.content}}
            </div>
            <div class="footer">
                <span v-if="liked">已赞</span>
                <span v-else @click="like">赞</span>
                <span @click="toShowAnswer">回应</span>
            </div>
            <div v-show="showAnswer" class="answer">
                <Input type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" :maxlength="500"
                    v-model="answer" placeholder="写下你的回复..."/>
                <span class="answer-button" @click="answerReply"><Icon type="ios-send-outline" size="30"/></span>
            </div>
        </div>
    </div>
</template>

<script>
import { timeBeauty } from 'Utils/date'
import { likeMessage } from 'Api/topic'
import { DEFAULT_AVATAR } from 'Api/user'
export default {
    props: {
        reply: {
            type: Object,
            default() {
                return {}
            }
        },
        likedArray: {
            type: Array,
            default() {
                return []
            }
        },
    },
    data() {
        return {
            liked: this.likedArray.includes(this.reply.id),
            showAnswer: false,
            answer: '',
            defaultAvatar: DEFAULT_AVATAR
        }
    },
    computed: {
        createTime() {
            return timeBeauty(this.reply.create_time)
        }
    },
    methods: {
        like() {
            if (!this.liked) {
                likeMessage(this.reply.id).then(res => {
                    this.liked = true
                })
            }
        },
        toShowAnswer() {
            if (this.showAnswer) {
                this.showAnswer = false
            }
            else {
                this.showAnswer = true
            }
        },
        answerReply() {
            if (this.answer) {
                this.$emit('answer', 'event', this.reply.id, this.answer)
                this.answer = ''
                this.showAnswer = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 20px 5px;
    width: 100%;
    display: flex;
}
.avatar {
    width: 48px;
    height: 48px;
    margin-right: 10px;
}
.reply {
    width: 100%;
}
.nickname {
    font-size: 1.2em;
    padding-right: 10px;
    max-width: 200px;
}
.content {
    padding: 10px 5px 20px 5px;
}
.footer {
    direction: rtl;
    span {
        margin: 0 10px;
        cursor: pointer;
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
.answer-to {
    border-left: 1px solid black;
    padding-left: 10px;
    margin: 10px 0;
    span {
        padding-left: 10px;
    }
}
</style>
