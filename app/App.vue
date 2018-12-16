<template>
    <div class="grid-container">
        <router-view v-if="isRouterAlive" class="content"></router-view>
        <footer></footer>
    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style lang="scss">
@import './assets/styles/common.scss';
@import './assets/styles/iview.css';
@import './assets/styles/my-iview.scss';

.grid-container {
    display: grid;
    grid-template-columns: auto 950px auto;
    grid-template-rows: auto 100px;
    padding: 0;
    min-height: 100vh;
}
footer {
    grid-area: 2 / 2 / 2 / 2;
}
.content {
    grid-area: 1 / 2 / 1 / 2;
}

</style>

