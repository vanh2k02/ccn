<template>
    <div class="content-wallet">
        <div class="row">
            <Login :address="address"/>
            <div class="col-md-7 float-left">
                <div class="content-wall-left">
                    <div class="blocks-status">
                        <div class="status-items">
                            <div class="title">Available Tokens</div>
                            <div class="number">{{ availableTokens.toFixed(2) }}</div>
                            <div class="list-link"><a href="javascript:void (0)" @click="showModalStake()">Stake</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Staked Tokens</div>
                            <div class="number">{{ stakedTokens.toFixed(1) }}</div>
                            <div class="list-link"><a class="active" href="javascript:void (0)"
                                                      @click="showModalUnDelegate()">UNDELEGATE</a><a
                                href="javascript:void (0)" @click="showModalReDelegate()">REDELEGATE</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Rewards</div>
                            <div class="number">{{ reward.toFixed(1) }}</div>
                            <div class="list-link"><a class="disable" href="#">CLAIM</a></div>
                        </div>
                        <div class="status-items">
                            <div class="title">Unstaked Tokens</div>
                            <div class="number">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                                <div class="link-see-all">
                                    <router-link to="/stake"> See all</router-link>
                                </div>
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
                                                        <td><a href="#"
                                                               @click="showModalDelegate(validator.description.moniker)">DELEGATE</a>
                                                        </td>
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
                <div class="col-md-5">
                    <div class="cnt-wallet-right">
                        <div class="cnt-validator">
                            <div class="title-vali">
                                <div class="title top-ac">Top Active Proposals</div>
                                <div class="link-see-all">
                                    <router-link to="/proposals"> See all</router-link>
                                </div>
                            </div>
                            <div class="content-detail-vali">
                                <ul>
                                    <ItemProposals v-for="(proposal,index) in proposals" :key="index"
                                                   :index="index"
                                                   :proposalId="proposal.proposalId.low"
                                                   :status="proposal.status"
                                                   :submitTime="proposal.submitTime"
                                                   :votingStartTime="proposal.votingStartTime"
                                                   :votingEndTime="proposal.votingEndTime"
                                                   :vote="proposal.finalTallyResult"
                                                   :title="proposal.content.value"/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalStake" id="popupStakeTokens">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModalStake">
                            <span aria-hidden="true"></span></button>
                    </div>
                    <ModalStake :validators="validators" :coin="coin"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalUnDelegate" id="popupUndelegate">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModalUnDelegate">
                            <span aria-hidden="true"></span></button>
                    </div>
                    <ModalUndelegate :stakedValidators="stakedValidators.validators" :delegate="delegate"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalReDelegate" id="popupRedelega">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModalReDelegate">
                            <span aria-hidden="true"></span></button>
                    </div>
                    <ModalRelegate :stakedValidators="stakedValidators.validators" :validators="validators"
                                   :delegate="delegate"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalDelegate" id="popupStakeTokens">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModalDelegate">
                            <span aria-hidden="true"></span></button>
                    </div>
                    <ModalDelegate :validators="validators" :coin="coin" :titleDelegate="titleDelegate"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Login from "@/components/login/Login";
import {WalletHelper} from "@/utils/wallet";
import ItemProposals from "@/components/item-top-proposals/ItemProposals";
import {KelprWallet} from "../../utils/connectKeplr";
import ModalStake from "../../components/ModalStake";
import ModalRelegate from "../../components/ModalRelegate";
import ModalUndelegate from "../../components/ModalUndelegate";
import ModalDelegate from "../../components/ModalDelegate";


const DENOM = process.env.VUE_APP_DENOM
export default {
    name: "Dashboard",
    components: {ModalDelegate, ModalUndelegate, ModalRelegate, ModalStake, ItemProposals, Login},
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
    props: {
        address: String
    },
    data: function () {
        return {
            allValidators: [],
            activeTab: "allValidators",
            stakedValidators: [],
            wallet: '',
            availableTokens: 0,
            reward: 0,
            stakedTokens: 0,
            proposals: [],
            address_user: KelprWallet.getAddress(),
            validators: [],
            coin: '0',
            delegate: [],
            titleDelegate: ''
        }
    },
    async mounted() {
        await this.getWallet()
        this.getAllValidators()
        this.getProposals()
        // this.detailValidator()
        this.getRewards()
        this.getBalances()
        this.delegation()
        this.unbonding()
        this.stakeds()
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
            const data = await this.wallet.getValidators("BOND_STATUS_BONDED")
            this.validators = [...data.validators]
            data.validators.splice(10, data.validators.length - 10)
            this.allValidators = data
            console.log(this.allValidators.validators, 'vali')
        },
        async getProposals() {
            const res = await this.wallet.getListProposal(3, '', '')
            this.proposals = res.proposals
            console.log(this.proposals, 'proposals')
        },
        // async detailValidator() {
        //     const validator = await this.wallet.getDetailValidator('junovaloper196ax4vc0lwpxndu9dyhvca7jhxp70rmcqcnylw')
        //     console.log(validator)
        // }
        // ,
        async getRewards() {
            const response = await this.wallet.getRewards(this.address_user)
            response.total.forEach(item => {
                if (item.denom === DENOM) {
                    this.reward = item.amount / 10 ** 24
                }
            })
            console.log(response, 'rewards')
        }
        ,
        async getBalances() {
            const balances = await this.wallet.getBalances('juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh')
            balances.forEach(item => {
                if (item.denom === DENOM) {
                    this.coin = item.amount
                    this.availableTokens = item.amount / 10 ** 6
                }
            })
            console.log(balances, 'bal')
        }
        ,
        async unbonding() {
            const unbonding = await this.wallet.getUnbonding(this.address_user)
            console.log(unbonding, 'unbon')
        }
        ,
        async delegation() {
            const delegation = await this.wallet.getDelegation('juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh')
            delegation.delegationResponses.forEach(item => {
                if (item.balance.denom === DENOM) {
                    this.delegate.push(item)
                    this.stakedTokens += item.balance.amount / 10 ** 8
                }
            })
            console.log(delegation, 'delegation')
        },
        async stakeds() {
            this.stakedValidators = await this.wallet.getStakedValidators("juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh")
            console.log(this.stakedValidators, 'staked')
        },
        showModalStake() {
            this.$refs.modalStake.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalStake.style.display = "block"
        }, showModalUnDelegate() {
            this.$refs.modalUnDelegate.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalUnDelegate.style.display = "block"
        }, showModalReDelegate() {
            this.$refs.modalReDelegate.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalReDelegate.style.display = "block"
        }, showModalDelegate(title) {
            this.titleDelegate = title
            this.$refs.modalDelegate.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalDelegate.style.display = "block"
        },
        closeModalStake() {
            this.$refs.modalStake.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalStake.style.display = "none"
        }, closeModalUnDelegate() {
            this.$refs.modalUnDelegate.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalUnDelegate.style.display = "none"
        }, closeModalReDelegate() {
            this.$refs.modalReDelegate.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalReDelegate.style.display = "none"
        }, closeModalDelegate() {
            this.$refs.modalDelegate.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modalDelegate.style.display = "none"
        },
    },
}
</script>

<style scoped>

</style>
