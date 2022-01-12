<template>
    <div>
        <div class="col-md-5 float-right" v-if="!address">
            <div class="cnt-btn-wallet"><a href="javascript:void (0)" @click="connectWallet()">CONNECT WALLET</a></div>
        </div>
        <div class="row" v-if="address">
            <div class="col-md-12">
                <div class="cnt-acount-user">
                    <div class="name-acount">
                        <div class="name"></div>
                        <div class="cnt-link-copy">
                            <div class="link">{{ address }}</div>
                            <button class="btn btn-copy" @click="doCopy">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import {KelprWallet} from "@/utils/connectKeplr";
import {EventBus} from "@/main";

export default {
    name: "Login",
    data: function () {
        return {
            address: ''
        }
    },
    created() {
        EventBus.$on('setAddress', (address) => {
            this.address = address
        })

    },
    mounted: function () {
        this.getAddress()
    },
    methods: {
        async connectWallet() {
            try {
                await KelprWallet.connectWallet()
                this.getAddress()
            } catch (err) {
                console.log(err.message)
            }
        },
        getAddress() {
            this.address = localStorage.getItem("address")
        }, 
        doCopy: function () {
            this.$copyText(this.address).then(function (e) {
                alert('Copied')
                console.log(e)
            }, function (e) {
                alert('Can not copy')
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>

</style>
