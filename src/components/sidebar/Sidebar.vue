<template>
    <div class="page-sidebar-wrapper vetical-menu">
        <div class="page-sidebar navbar-collapse collapse">
            <Logo/>
            <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                <TabSideBar/>
            </ul>
            <div class="content-logout">
                <ul>
                    <li><a href="javascript:void (0)" @click="logout"> <span>ログアウト</span></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import Logo from "@/components/sidebar/Logo";
import TabSideBar from "./TabSideBar";
import { mapMutations } from "vuex";

export default {
    name: "SideBar",
    components: {
        TabSideBar,
        Logo,
    }, 
    data: function () {
        return {
            address: ''
        }
    },
    methods: {
        ...mapMutations("auth", [
            'setAddress'
        ]),
        logout() {
            localStorage.removeItem('address')
            this.setAddress('')
        },
    }
}
</script>

<style scoped>

</style>
