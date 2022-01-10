<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Undelegate</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown()">{{title}}<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(stakedValidator,index) in stakedValidators" :key="index">
                                <div class="item-stake" @click="chooseStaked(stakedValidator.operatorAddress,stakedValidator.description.moniker)">
                                    <div class="icon"></div>
                                    <div class="name">{{ stakedValidator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" v-model="token"
                           placeholder="Enter tokens to Stake"/>
                    <div class="text-max" @click="maxToken()"><a href="#" style="color: #00B6ED">Max</a></div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">{{ tokenStaked }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest">STAKE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const DEMON = process.env.VUE_APP_DENOM
import {KelprWallet} from "../utils/connectKeplr";

export default {
    name: "ModalUndelegate",
    data: function () {
        return {
            dropdown: false,
            style: 'none',
            token: 0,
            tokenStaked: 0,
            address_user: KelprWallet.getAddress(),
            addressDelegator: '',
            amount: {
                demon: DEMON,
                amount: this.token
            },
            title:'Select validator'
        }
    },
    props: {
        stakedValidators: Array,
        delegate: Array
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
        maxToken() {
            this.token = this.tokenStaked
        },
        chooseStaked(address,title) {
            this.title=title
            this.addressDelegator = address
            this.delegate.forEach(item => {
                if (item.delegation.validatorAddress === address) {
                    this.tokenStaked = Number(item.balance.amount) / 10 ** 8
                }
            })
            this.dropdown = false
            this.style = 'none'
        },
        async sendRequest() {
            const a = await KelprWallet.getKeplrWallet()
            const b = await a.unDelegateTokens(this.address_user, this.addressDelegator, this.amount, '')
            console.log(b)
        }
    }
}
</script>

<style scoped>

</style>
