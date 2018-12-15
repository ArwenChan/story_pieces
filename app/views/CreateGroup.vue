<template>
    <div class="container">
        <h1 class="desc">申请创建小组</h1>
        <GroupForm></GroupForm>
        <div class="side" style="width:250px;">
            <p><h2>小组创建</h2>小组需要审核通过后才能完成创建,管理员会在3日内审核 申请,
            审核结果会用豆邮通知你,请耐心等待。 </p>
            <p><h2>小组标签</h2>小组可以有不超过5个的标签，用来描述小组的目的。
            标签作为关键词可以被用户搜索到。 多个标签之间用空格分隔开。小组名称本
            身可以被搜索，就不用再加在标签里了。 </p>
            <p>小组的名称、介绍、标签在创立后都可以随时更改。</p>
        </div>
    </div>
</template>
<script>
import GroupForm from 'Components/GroupForm.vue'
export default {
    components: {
        GroupForm,
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
</style>
