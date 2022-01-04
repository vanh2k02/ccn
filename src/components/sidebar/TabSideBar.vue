<template>
    <div>
        <li v-for="(tab,index) in tabs" :key="index" :class="showClass(tab.url)" @click="checkClass(tab.url)">
            <router-link :to="tab.url">
                <div class="icon"><img class="default" :src="tab.image_default" alt="index"/><img
                    class="active" :src="tab.image_action" alt="index"/></div>
                <span class="title">{{ tab.name }}</span></router-link>
        </li>
    </div>

</template>

<script>
import {defaultData} from "@/utils/config";

export default {
    name: "TabSideBar",
    data: function () {
        return {
            tabs: defaultData,
            check:'/'
        }
    },
    methods: {
        checkClass(path) {
            this.check = path
        },
        showClass(path) {
            if (this.check === path) {
                return 'menu-active'
            }
            return ''
        }
    }
}
</script>

<style scoped>

</style>
