<template>
    <div class="topic-wrapper">
        <span><router-link :to="`/topic/${topic.id}/`" class="name single-line">
            {{topic.title}}</router-link>
        </span>
        <span v-show="showAuthor" class="create-user single-line">{{topic.create_user}}</span>
        <span>{{topic.answers_num}}</span>
        <span>{{updateTime}}</span>
        <span v-show="showGroup">{{topic.group}}</span>
    </div>
</template>


<script>
import { timeReadable } from '../utils/date.js'

export default {
    props: {
        topic: {
            type: Object,
            default() {
                return {}
            }
        },
        showAuthor: {
            type: Boolean,
            default: true
        },
        showGroup: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        updateTime() {
            return timeReadable(this.topic.update_time)
        }
    }
}
</script>

<style lang="scss" scoped>
.topic-wrapper {
    display: table-row;
    span {
        display: table-cell;
        padding: 5px;
        border-top: 1px dashed rgb(223, 216, 216);
        border-bottom: 1px dashed rgb(223, 216, 216);
    }
    .name {
        max-width: 450px;
    }
    .create-user {
        max-width: 100px;
    }
}
</style>
