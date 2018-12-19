<template>
    <div class="container">
        <div class="content">
            <div class="header">
                <div>
                    <img :src="group.icon" class="icon">
                    <span class="header-content title single-line">{{group.name}}</span>
                </div>
                <div>
                    <span v-show="isMember" class="header-content">我是这个小组的{{identity}} > </span>
                    <Button size="small" v-if="isCreater" @click="edit">编辑</Button>
                    <Button size="small" v-else-if="isMember" @click="confirmQuit">退出</Button>
                    <Button size="small" v-else @click="join">加入</Button>
                </div>
            </div>
            <div class="desc">
                <div>创建于 {{ createTime }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    组长：{{group.create_user ? group.create_user.nickname : ''}}</div>
                <div>{{group.brief}}</div>
                <div>小组标签：
                    <span class="tag" v-for="item in group.tags" :key="item">{{item}}</span>
                </div>
            </div>
            <div class="topics" id="topics">
                <div class="topic-toggle">
                    <a @click="getRecent">最近讨论</a> / <a @click="getHot">最热讨论</a>
                    <Button type="primary" size="small" class="write" @click="toWrite">发言+</Button>
                </div>
                <template v-if="hasTopics">
                    <div class="topic-header">
                        <span>讨论</span>
                        <span>作者</span>
                        <span>回应</span>
                        <span>最后回应</span>
                    </div>
                    <SimpleTopic v-for="item in topics" :key="item.id" :topic="item"></SimpleTopic>
                </template>
                <div v-else class="no-topics">暂无讨论，快来添砖吧！</div>
            </div>
            <div class="page" v-if="needPage">
                        <Page :page-size="pageSize" :total="totalTopics"
                :current="current" @on-change="getGroupTopics"/>
            </div>
        </div>
        <div class="side">
            <div class="side-title">最近加入</div>
            <div class="side-body">
                <div v-for="item in recentUsers" :key="item.user.id">
                    <img :src="item.user.avatar ? item.user.avatar : defaultAvatar">
                    <span class="single-line">{{item.user.nickname}}</span>
                </div>
            </div>
            <div class="side-foot">
                <router-link :to="`/group/${group.id}/members/`">> 浏览所有成员（{{totalMembers}}）</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { groupDetail, groupTopics, groupUsers, removeUserFromGroup, add_user_to_group } from 'Api/group'
import { mapGetters } from 'vuex'
import { timeReadable } from '../utils/date.js'
import SimpleTopic from 'Components/TopicSimpleItem.vue'
import { DEFAULT_AVATAR } from 'Api/user'

export default {
    components: {
        SimpleTopic
    },
    inject: ['reload'],
    data() {
        return {
            group: {},
            topics: [],
            totalTopics: 0,
            users: [],
            totalMembers: 0,
            pageSize: 20,
            current: 1,
            orderBy: 'create_time',
            defaultAvatar: DEFAULT_AVATAR
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserInfo'
        }),
        isMember() {
            return this.user.member_groups && this.user.member_groups.includes(this.group.id)
        },
        isCreater() {
            return this.group.create_user && this.group.create_user.id === this.user.id
        },
        identity() {
            if (this.isCreater) {
                return '创建者'
            }
            if (this.isMember) {
                return '成员'
            }
            return ''
        },
        createTime() {
            return timeReadable(this.group.create_time)
        },
        recentUsers() {
            return this.users.filter((value, index) => {
                return value.role === 'user' && index < 10
            })
        },
        needPage() {
            return this.totalTopics > this.pageSize
        },
        hasTopics() {
            return this.topics.length > 0
        }
    },
    created() {
        this.getGroupDetail()
        this.getGroupTopics()
        this.getGroupUsers()
        if (!window.hasEditor) {
            window.createEditor()
            window.hasEditor = true
        }

    },
    methods: {
        getGroupDetail() {
            groupDetail(this.$route.params.id).then(res => {
                this.group = res
            })
        },
        getGroupTopics(current) {
            let page = current ? current : this.current
            groupTopics(this.$route.params.id, this.orderBy, page, this.pageSize).then(res => {
                this.topics = res.data
                this.totalTopics = res.count
            })
        },
        getGroupUsers() {
            groupUsers(this.$route.params.id).then(res => {
                this.users = res.data
                this.totalMembers = res.count
            })
        },
        getRecent() {
            if (this.orderBy !== 'create_time') {
                this.orderBy = 'create_time'
                this.getGroupTopics()
            }
        },
        getHot() {
            if (this.orderBy !== 'heat') {
                this.orderBy = 'heat'
                this.getGroupTopics()
            }
        },
        confirmQuit() {
            this.$modal.confirm({
                title: '确定退出本小组',
                content: '<p>在对话框关闭后立即生效</p>',
                onOk: () => {
                    removeUserFromGroup(this.group.id)
                },
            })
        },
        edit() {
            this.$router.push(`/group/${this.group.id}/update/`)
        },
        join() {
            add_user_to_group(this.group.id).then(res => {
                this.reload()
            })
        },
        toWrite() {
            this.$router.push(`/group/${this.group.id}/write/`)
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
.header {
    padding: 0;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
}
.header-content {
    vertical-align: top;
    font-size: 1.2em;
}
.title {
    font-size: 2em;
    font-weight: bolder;
    max-width: 400px;
}
.icon {
    width: 70px;
    height: 70px;
    margin-right: 10px;
}
.desc {
    background-color: rgb(248, 239, 217);
    margin: 20px 0;
    padding: 10px;
    div {
    margin: 20px 0;
}
}
.tag {
    padding: 2px;
    margin: 0 5px;
    background-color: #fff;
}
.topics {
    display: table;
    border-collapse: collapse;
    font-size: 1.1em;
    width: 100%;
    .topic-toggle {
        display: table-caption;
        margin: 10px 0;
        font-size: 1.2em;
        a {
            color: inherit;
            &:hover {
                color: #b15226;
            }
        }
        .write {
            margin-left: 20px;
        }
    };
    .topic-header {
        display:table-header-group;
        span {
            display: table-cell;
            padding: 5px;
        }
    };
}
.no-topics {
    width: 100%;
    text-align: center;
}
.side-title {
    font-size: 1.3em;
    color: rgb(29, 29, 29);
}
.side-body {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    div {
        width: 48px;
        margin: 1px;
        img {
            width: 48px;
            height: 48px;
        }
    }
}
.side-foot {
    font-size: 1.1em;
}
.page {
    width: 100%;
    text-align: center;
    display: block;
    margin: 20px 0;
}
</style>
