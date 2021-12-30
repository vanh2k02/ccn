<template>
    <div class="content-wallet">
        <Login/>
        <div class="content-validate-detail">
            <div class="row">
                <div class="col-md-7">
                    <div class="cnt-wallet-left">
                        <div class="cnt-validator">
                            <div class="title-vali">
                                <div class="title title-tab">
                                    <ul>
                                        <li :class="activeClass('allValidators')"><a href="javascript:void(0)"
                                                                                     @click="setActiveTab('allValidators')">All
                                            Validators</a></li>
                                        <li :class="activeClass('stakedValidators')"><a href="javascript:void(0)"
                                                                                        @click="setActiveTab('stakedValidators')">Staked
                                            Validators</a></li>
                                    </ul>
                                </div>
                                <div class="link-see-all">See all ></div>
                            </div>
                            <div class="content-tab-vali">
                                <div class="content-tab" id="allvali"
                                     v-show="activeClass('allValidators') === 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <table
                                                    class="table table-striped table-bordered table-hover text-center">
                                                    <thead>
                                                    <tr>
                                                        <th>Validator</th>
                                                        <th>Status</th>
                                                        <th>Voting Power</th>
                                                        <th>Commission</th>
                                                        <th>Tokens Staked</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(validator,index) in allValidators.validators"
                                                        :key="index">
                                                        <td>
                                                            <div class="td-acount">
                                                                <div class="icon"></div>
                                                                <span>{{ validator | getMoniker }}</span>
                                                            </div>
                                                        </td>
                                                        <td><span class="status"
                                                                  v-if="validator.status===3">Active</span>
                                                        </td>
                                                        <td>{{ validator|getTokens }}</td>
                                                        <td>{{ validator|getRate }}</td>
                                                        <td>no tokens</td>
                                                        <td><a href="#">DELEGATE</a></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab" id="staked"
                                     v-show="activeClass('stakedValidators') === 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <table
                                                    class="table table-striped table-bordered table-hover text-center">
                                                    <thead>
                                                    <tr>
                                                        <th>Validator</th>
                                                        <th>Status</th>
                                                        <th>Voting Power</th>
                                                        <th>Commission</th>
                                                        <th>Tokens Staked</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(validator,index) in stakedValidators.validators"
                                                        :key="index">
                                                        <td>
                                                            <div class="td-acount">
                                                                <div class="icon"></div>
                                                                <span>{{ validator | getMoniker }}</span>
                                                            </div>
                                                        </td>
                                                        <td><span class="status"
                                                                  v-if="validator.status===3">Active</span>
                                                        </td>
                                                        <td>{{ validator|getTokens }}</td>
                                                        <td>{{ validator|getRate }}</td>
                                                        <td>no tokens</td>
                                                        <td><a href="#">DELEGATE</a></td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Login from "@/components/login/Login";
import {WalletHelper} from "@/utils/wallet";

export default {
    name: "stake",
    components: {Login},
    data: function () {
        return {
            allValidators: [],
            activeTab: "allValidators",
            stakedValidators: [],
        }
    },
    async mounted() {
        await this.getWallet()
        this.getAllValidators()
        this.stakeds()
    },
    filters: {
        getMoniker(validator) {
            if (validator.description) {
                return validator.description.moniker
            }
            return ''
        },
        getTokens(validator) {
            if (validator.tokens) {
                let a = (validator.tokens / 10 ** 6).toFixed(1)
                return new Intl.NumberFormat().format(a) + '0'
            }
        },
        getRate(validator) {
            if (validator.commission.commissionRates.rate) {
                return (validator.commission.commissionRates.rate) / 10 ** 12
            }
        }
    },
    methods: {
        setActiveTab(tabId) {
            this.activeTab = tabId
        },
        activeClass(tabId) {
            if (tabId === this.activeTab) {
                return 'active'
            }
            return ''
        },
        async getWallet() {
            this.wallet = await WalletHelper.connect()
        },
        async getAllValidators() {
            this.allValidators = await this.wallet.getValidators("BOND_STATUS_BONDED")
        }, async stakeds() {
            this.stakedValidators = await this.wallet.getStakedValidators('juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh')
            console.log(this.stakedValidators, 'staked')
        },
    }
}
</script>

<style scoped>

</style>
