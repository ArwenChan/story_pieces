<template>
    <div>
        <div class="group">
            <img class="img" :src="group.icon" alt="groupImage">
            <div class="desc">
                <router-link class="name single-line" :to="'/group/'+ group.id">{{group.name}}</router-link>
                <div>
                    <span>{{groupCount}}位成员&nbsp;&nbsp;</span>
                    <span v-if="inUserGroups && showJoin">已加入</span>
                    <span v-else-if="showJoin" class="join primary-color" @click="join">+加入</span>
                </div>
            </div>
        </div>
        <hr v-show="showHr">
    </div>
</template>

<script>
import { add_user_to_group } from 'Api/group'

export default {
    props: {
        group: Object,
        showHr: {
            type: Boolean,
            default: true,
        },
        userGroups: {
            type: Array,
            default() {
                return []
            }
        },
        showJoin: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            groupCount: this.group.count,
        }
    },
    computed: {
        inUserGroups() {
            return this.userGroups.includes(this.group.id)
        }
    },
    // beforeUpdate() {
    //     this.groupCount = this.group.count
    // },
    methods: {
        join() {
            add_user_to_group(this.group.id).then(res => {
                this.groupCount += 1
            })
        },
    }
}
</script>

<style lang="scss" scoped>
$img-width: 48px;

.group {
    padding: 5px;
    display: flex;
    justify-content: flex-start;
}

.img {
    width: $img-width;
    height: $img-width;
    object-fit: cover;
    margin-right: 10px;
}
.desc {
    width: calc(100% - #{$img-width});
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.name {
    font-size: 1.2em;
}
.join {
    cursor: pointer;
}
</style>
