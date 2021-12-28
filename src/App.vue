<template>
    <div class="page-container">
        <SideBar/>
        <div class="page-content-wrapper">
            <div class="page-content home-page">
                <div class="container">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from "@/components/sidebar/Sidebar";
export default {
    components: {
        SideBar
    },
}
</script>

