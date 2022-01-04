<template>
    <div>
        <div class="col-md-5 float-right" v-if="!address">
            <div class="cnt-btn-wallet"><a href="javascript:void (0)" @click="connectWallet()">CONNECT WALLET</a></div>
        </div>
        <div class="row" v-if="address">
            <div class="col-md-12">
                <div class="cnt-acount-user">
                    <div class="name-acount">
                        <div class="name">USERNAME</div>
                        <div class="cnt-link-copy">
                            <div class="link">juno1n…xyqq087</div>
                            <button class="btn btn-copy">Copy</button>
                        </div>
                    </div>
                    <div class="icon"></div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import {WalletHelper} from "@/utils/wallet";
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "Login",
    data: function () {
        return {
            address: ''
        }
    },
    mounted() {
        this.getAddress()
    },
    methods: {
        async connectWallet() {
            this.address = await KelprWallet.connectWallet()
            await WalletHelper.connect()
            this.getAddress()

        },
        getAddress() {
            this.address = KelprWallet.getAddress();
        },
    }
}
</script>

<style scoped>

</style>
