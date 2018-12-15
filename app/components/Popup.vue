<template>
    <transition name="fade">
        <div v-if="show" class="popup">
            <div class="mask"></div>
            <div class="container">
                <span class="close-button" @click="close">&times;</span>
                <login v-if="type === 'login'"></login>
                <register v-else-if="type === 'register'"></register>
            </div>
        </div>
    </transition>
</template>
<script>
import { TOGGLE_POPUP } from 'Store/mutation-types'
import { mapMutations, mapState } from 'vuex'
import login from 'Components/Login.vue'
import register from 'Components/Register.vue'


export default {
    components: {
        login,
        register,
    },
    computed: mapState({
        show: state => state.globalUse.showPopup,
        type: state => state.globalUse.popupType
    }),
    methods: {
        ...mapMutations({
            close: TOGGLE_POPUP
        }),
    }
}
</script>


<style lang="scss" scoped>
.container {
    background-color:white;
    border: 1px solid rgb(151, 145, 145);
    box-shadow: 2px 4px 4px rgb(83, 83, 79), 3px 5px 6px rgb(139, 139, 238);
    border-radius: 5px;
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50vh;
    transform: translate(-50%, -50%);
}
.mask {
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
}
.close-button {
    float: right;
    border: none;
    font-size: 20px;
    padding: 0 10px;
    cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
    transition: all 0.8s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
