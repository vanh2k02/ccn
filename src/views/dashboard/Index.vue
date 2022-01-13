<template>
    <div class="content-wallet">
        <div class="row">
            <Login/>
            <div class="col-md-7 float-left">
                <div class="content-wall-left">
                    <div class="blocks-status">
                        <div class="status-items">
                            <div class="title">Available Tokens</div>
                            <div class="number">{{ availableTokens.toFixed(2) }}</div>
                            <div class="list-link"><a href="javascript:void (0)" @click="showModal('', 'modalStake')">Stake</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Staked Tokens</div>
                            <div class="number">{{ stakedTokens.toFixed(1) }}</div>
                            <div class="list-link"><a class="active" href="javascript:void (0)"
                                                      @click="showModal('', 'modalUnDelegate')">UNDELEGATE</a><a
                                href="javascript:void (0)" @click="showModal('', 'modalReDelegate')">REDELEGATE</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Rewards</div>
                            <div class="number">{{ reward.toFixed(1) }}</div>
                            <div class="list-link"><a class="disable" href="javascript:void(0)" @click="claim">CLAIM</a></div>
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
                                                <ValidatorTable :validators="allValidators.validators" @showModal="showModal"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab" id="staked"
                                     v-show="activeClass('stakedValidators') === 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <ValidatorTable :validators="stakedValidators.validators" @showModal="showModal"/>
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
                                        :proposer="proposal.proposer"
                                        :index="index"
                                        :proposalId="proposal.proposalId.low"
                                        :status="proposal.status"
                                        :submitTime="proposal.submitTime"
                                        :votingStartTime="proposal.votingStartTime"
                                        :votingEndTime="proposal.votingEndTime"
                                        :vote="proposal.finalTallyResult"
                                        :title="proposal.content.value"
                                    />
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
                                @click="closeModal('modalStake')">
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
                                @click="closeModal('modalUnDelegate')">
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
                                @click="closeModal('modalReDelegate')">
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
                                @click="closeModal('modalDelegate')">
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
import { WalletHelper } from "@/utils/wallet";
import { KelprWallet } from "@/utils/connectKeplr";
import ItemProposals from "@/components/item-top-proposals/ItemProposals";
import ModalStake from "@/components/ModalStake";
import ModalRelegate from "@/components/ModalRelegate";
import ModalUndelegate from "@/components/ModalUndelegate";
import ModalDelegate from "@/components/ModalDelegate";
import ValidatorTable from "@/components/validator/ValidatorTable.vue"
import { ProposalStatus } from "@/utils/constant"

const DENOM = process.env.VUE_APP_COIN_MINIMAL_DENOM
export default {
    name: "Dashboard",
    components: {
        ModalDelegate, 
        ModalUndelegate, 
        ModalRelegate, 
        ModalStake, 
        ItemProposals, 
        Login,
        ValidatorTable
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
            validators: [],
            coin: '0',
            delegate: [],
            titleDelegate: '',
            address: '',
            listReward: []
        }
    },
    async mounted() {
        this.getAddressFromLocalStorage()
        await this.getWallet()
        await this.getAllValidators()
        await this.stakeds()
        // this.detailValidator()
        await this.getRewards()
        await this.getBalances()
        await this.delegation()
        // this.unbonding()
        await this.getProposals()
    },
    methods: {
        getAddressFromLocalStorage() {
            this.address = localStorage.getItem('address', "")
        },
        setActiveTab(tabId) {
            this.activeTab = tabId
        },
        activeClass(tabId) {
            if (tabId === this.activeTab) {
                return 'active'
            }
            return ''
        },
        showModal(title, refName) {
            if(refName == 'modalDelegate') {
                this.titleDelegate = title
            }
            this.$refs[refName].classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs[refName].style.display = "block"
        },
        closeModal(refName) {
            this.$refs[refName].classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs[refName].style.display = "none"
        },
        async getWallet() {
            try {   
                this.wallet = await WalletHelper.connect()
            } catch (err) {
                this.$toast.error(err.message);
            }
            
        },
        async getAllValidators() {
            const data = await this.wallet.getValidators("BOND_STATUS_BONDED")
            this.validators = [...data.validators]
            data.validators.splice(10, data.validators.length - 10)
            this.allValidators = data
        },
        async getProposals() {
            const res = await this.wallet.getListProposal(ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD, '', '')
            this.proposals = res.proposals
            await this.formatProposals()
        },
        async getProposal(proposalId) {
            return await WalletHelper.getSumitProposer(this.stargateClient, proposalId)
        },
        async formatProposals() {
            const proposals = [...this.proposals]
            for await (const data of proposals) { 
                data.des = WalletHelper.convertContent(data.content.value)
                data.proposer = await this.getProposal(data.proposalId)
            }
            this.proposals = [...proposals]
        },
        async getRewards() {
            if(this.address){
                const response = await this.wallet.getRewards("juno1rzlnl0yjuztvm7ctkmhc3aj9pyash66nuuvstg")
                response.total.forEach(item => {
                    if (item.denom === DENOM) {
                        this.reward = item.amount / 10 ** 24
                    }
                })
                this.listReward = response.rewards
            }
        },
        async getBalances() {
            if(this.address){
                const balances = await this.wallet.getBalances('juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh')
                balances.forEach(item => {
                    if (item.denom === DENOM) {
                        this.coin = item.amount
                        this.availableTokens = item.amount / 10 ** 6
                    }
                })
            }
        },
        async unbonding() {
            if(this.address){
                await this.wallet.getUnbonding(this.address)
            }
        },
        async delegation() {
            if(this.address){
                const delegation = await this.wallet.getDelegation('juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh')
                delegation.delegationResponses.forEach(item => {
                    if (item.balance.denom === DENOM) {
                        this.delegate.push(item)
                        this.stakedTokens += item.balance.amount / 10 ** 8
                    }
                })
            }
        },
        async stakeds() {
            if(this.address){
                this.stakedValidators = await this.wallet.getStakedValidators("juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh")
            }
        },
        async claim() {
            try {
                const kelprWallet = await KelprWallet.getKeplrWallet()
                const address = await KelprWallet.getAddress()
                for await (const data of this.listReward) { 
                    await kelprWallet.claimRewards(address, data.validatorAddress)
                }
            } catch (err) {
                this.$toast.error(err.message);
            }
        }
    },
}
</script>

<style scoped>

</style>
