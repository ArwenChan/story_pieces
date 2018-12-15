<template>
    <div class="home">
        <header>
            <VHeader @search="toSearch">
                <router-link to="/mine/" class="link secondary-color">我的</router-link>
                <router-link to="/hot/" class="link secondary-color">精选</router-link>
                <router-link to="/" class="link secondary-color">反馈</router-link>
            </VHeader>
        </header>
        <router-view></router-view>
        <pop-up></pop-up>
    </div>
</template>

<script>
import popUp from 'Components/Popup.vue'
import VHeader from 'Components/Header.vue'

import { mapMutations } from 'vuex'
import { TOGGLE_POPUP } from 'Store/mutation-types'

export default {
    components: {
        popUp,
        VHeader,
    },
    data() {
        return {
            items: [],
            groups: [],
            pageSize: 2,
            total: 1,
            current: 1,
            showLogin: false,
        }
    },
    methods: {
        ...mapMutations({
            toShowLogin: TOGGLE_POPUP
        }),
        toSearch(value) {
            const url = '/hot/?q=' + value
            console.log(url)
            this.$router.push(url)
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    position: relative;
}
header {
    height: 100px;
}
.link {
    padding: 15px;
    font-size: 1.5em;
}
</style>
