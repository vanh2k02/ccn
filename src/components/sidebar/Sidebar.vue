<template>
    <div class="page-sidebar-wrapper vetical-menu">
        <div class="page-sidebar navbar-collapse collapse">
            <Logo/>
            <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                <li class="menu-active"><a href="#">
                    <div class="icon"><img class="default" src="@frontend/images/logo.png" alt="index"/><img
                        class="active" src="@frontend/images/icon/dash_ac.svg" alt="index"/></div>
                    <span class="title">DASHBOARD</span></a></li>
                <TabSideBar/>
            </ul>
            <div class="content-logout">
                <ul>
                    <li><a href="#"> <span>ログアウト</span></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import TabSideBar from "@/components/sidebar/TabSideBar";
import Logo from "@/components/sidebar/Logo";

export default {
    name: "SideBar",
    components: {
        Logo, 
        TabSideBar
    },
}
</script>

<style scoped>

</style>
