<template>
    <div class="page-container">
        <SideBar @setAddress="getAddress"/>
        <div class="page-content-wrapper">
            <div class="page-content home-page">
                <div class="container">
                    <router-view :address="address"></router-view>
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
    }, data: function () {
        return {
            address: localStorage.getItem('address')
        }
    }
    , methods: {
        getAddress(val) {
            this.address = val
        }
    }
}
</script>

