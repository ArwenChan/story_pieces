<template>
    <div class="container">
        <div class="like secondary-color">{{item.likes_num}}<br/>喜欢</div>
        <div class="topic">
            <p><router-link class="single-line title" :to="`/topic/${item.id}/`">{{item.title}}</router-link></p>
            <div class="content">
                <img v-if="item.index_pic" class="pic" :src="item.index_pic">
                <div :class="item.index_pic ? 'brief-pic' : ''">{{item.brief}}</div>
            </div>
            <div class="tail">
                <span class="from">来自{{item.group}}小组</span>&nbsp;&nbsp;&nbsp;
                <span class="time">{{timeTransfered}}</span>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
import { timeReadable } from '../utils/date.js'
export default {
    props: {
        item: Object,
    },
    computed: {
        timeTransfered() {
            return timeReadable(this.item.create_time)
        }
    }
}
</script>

<style lang="scss" scoped>
$like-width: 3.2em;
$img-width: 4.5em;
$container-width: 680px;

.container {
    width: $container-width;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin: 20px 0;
}
.like {
    width: $like-width;
    height: $like-width;
    background-color: bisque;
    font-weight: 900;
    font-size: 1em;
    text-align: center;
}
.topic {
    padding-left: 10px;
    width: 600px;
    .title {
        font-size: 1.5em;
        color: black;
        &:hover {
            color: black;
        }
    };
}
.pic {
    width: $img-width;
    height: $img-width;
    object-fit: cover;
}

.content {
    margin-top: 10px;
    margin-bottom: 10px;
    height: $img-width;
    display: flex;
    justify-content: flex-start;
}

.brief-pic {
    padding-left: 10px;
    width: calc(#{$container-width} - #{$img-width});
}
</style>
