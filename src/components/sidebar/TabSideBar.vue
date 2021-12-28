<template>
    <div>
        <li v-for="(tab,index) in tabs" :key="index"><a :href="tab.url">
            <div class="icon"><img class="default" :src="tab.image_default" alt="index"/><img
                class="active" :src="tab.image_action" alt="index"/></div>
            <span class="title">{{ tab.name }}</span></a></li>
    </div>

</template>

<script>
import {defaultData} from "@/utils/config";

export default {
    name: "TabSideBar",
    data: function () {
        return {
            tabs: defaultData
        }
    }
}
</script>

<style scoped>

</style>
