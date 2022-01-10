<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Redelegate</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown()">{{ titleStakedValidator }}<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(stakedValidator,index) in stakedValidators" :key="index">
                                <div class="item-stake"
                                     @click="chooseStaked(stakedValidator.operatorAddress,stakedValidator.description.moniker)">
                                    <div class="icon"></div>
                                    <div class="name">{{ stakedValidator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown2">{{ titleValidator }}<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-lists" :style="{display: style2}">
                            <li v-for="(validator,index) in validators" :key="index">
                                <div class="item-stake"
                                     @click="chooseValidator(validator.operatorAddress,validator.description.moniker)">
                                    <div class="icon"></div>
                                    <div class="name">{{ validator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" v-model="token"
                           placeholder="Enter tokens to Stake"/>
                    <div class="text-max" @click="maxToken">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">{{ Number(tokenStaked) / 10 ** 8 }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendData()">STAKE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {KelprWallet} from "../utils/connectKeplr";

export default {
    name: "ModalRelegate",
    data: function () {
        return {
            dropdown: false,
            dropdown2: false,
            style: 'none',
            style2: 'none',
            tokenStaked: 0,
            token: 0,
            addressDelegator: '',
            addressStaked: '',
            address_user: KelprWallet.getAddress(),
            amount: {
                denom: process.env.VUE_APP_DENOM,
                amount: this.token
            },
            titleStakedValidator: 'Select validator from',
            titleValidator: 'Select validator to'
        }
    },
    props: {
        stakedValidators: Array,
        validators: Array,
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
        clickDropdown2() {
            if (this.dropdown2 === true) {
                this.style2 = 'none'
                this.dropdown2 = false
            } else {
                this.style2 = 'block'
                this.dropdown2 = true
            }
        },
        chooseStaked(address, title) {
            this.titleStakedValidator = title
            this.addressStaked = address
            this.delegate.forEach(item => {
                if (item.delegation.validatorAddress === address) {
                    this.tokenStaked = Number(item.balance.amount)
                }
            })
            this.dropdown = false
            this.style = 'none'
        },
        maxToken() {
            this.token = this.tokenStaked
        },
        chooseValidator(address, title) {
            this.titleValidator = title
            this.addressDelegator = address
            this.dropdown2 = false
            this.style2 = 'none'

        },
        async sendData() {
            const a = await KelprWallet.getKeplrWallet()
            await a.redelegateTokens(this.address_user, this.addressStaked, this.amount, '')
            await a.delegateTokens(this.address_user, this.addressDelegator, this.amount, '')
        }
    }
}
</script>

<style scoped>

</style>
