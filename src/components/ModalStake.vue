<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Stake Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}"
                                             href="#" @click="clickDropdown()">Select validator<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(validator,index) in validators" :key="index">
                                <div class="item-stake" @click="chooseValidator(validator.operatorAddress)">
                                    <div class="icon"></div>
                                    <div class="name">{{ validator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" placeholder="Enter tokens to Stake" v-model="coin.amount"/>
                    <div class="text-max">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">0</span></div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest">STAKE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {WalletHelper} from "@/utils/wallet";
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "ModalStake",
    data: function () {
        return {
            dropdown: false,
            style: 'none',
            addressDelegator: '',
            address_user: KelprWallet.getAddress(),
            coin: {
                denom: process.env.VUE_APP_COIN_MINIMAL_DENOM,
                amount: 0
            }

        }
    },
    mounted() {

    },
    props: {
        validators: Array,
    },

    methods: {
        clickDropdown() {
            if (this.dropdown === true) {
                this.style = 'none'
                this.dropdown = false
            } else {
                this.style = 'block'
                this.dropdown = true
            }
        },
        chooseValidator(address) {
            this.addressDelegator = address
            this.dropdown = false
            this.style = 'none'

        },
        async sendRequest() {
            console.log(this.addressDelegator,'ab')
            console.log(this.address_user,'abc')
            await WalletHelper.connect()
            await KelprWallet.connectWallet()
            const a = await KelprWallet.delegateTokens(this.addressDelegator, this.address_user, this.coin, '')
            console.log(a)
        }
    }
}
</script>

<style scoped>

</style>
