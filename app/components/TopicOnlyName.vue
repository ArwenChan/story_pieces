<template>
    <div class="topic-wrapper">
        <span class="single-line"><router-link :to="`/topic/${topic.id}/`">{{topic.title}}</router-link></span>
        <span class="topic-user single-line">（{{topic.create_user}}）</span>
    </div>
</template>
<script>
export default {
    props: {
        topic: Object
    }
}
</script>

<style lang="scss" scoped>
.topic-wrapper {
    width: 100%;
    padding: 5px 0;
    border-bottom: 1px dashed rgb(223, 216, 216);
}
.topic-user {
    color:rgb(132, 133, 133);
}
</style>
