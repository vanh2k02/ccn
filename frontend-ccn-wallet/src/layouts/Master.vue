<template>
    <div class="page-container">
        <SideBar/>
        <router-view/>

    </div>
</template>

<script>
import SideBar from "./SideBar/SideBar";

export default {
    name: "Master",
    components: {SideBar}
}
</script>

<style scoped>

</style>
