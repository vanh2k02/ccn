<template>
    <div class="content-wallet">
        <div class="row">

            <div class="col-md-7 float-left">
                <div class="content-wall-left">
                    <div class="blocks-status">
                        <div class="status-items">
                            <div class="title">Available Tokens</div>
                            <div class="number">{{ availableTokens.toFixed(2) }}</div>
                            <div class="list-link"><a href="javascript:void (0)"
                                                      @click="showModal('', 'modalStake','','')">Stake</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Staked Tokens</div>
                            <div class="number">{{ stakedTokens.toFixed(1) }}</div>
                            <div class="list-link"><a class="active" href="javascript:void (0)"
                                                      @click="showModal('', 'modalUnDelegate','','')">UNDELEGATE</a><a
                                href="javascript:void (0)"
                                @click="showModal('', 'modalReDelegate','','')">REDELEGATE</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Rewards</div>
                            <div class="number">{{ reward.toFixed(1) }}</div>
                            <div class="list-link"><a :class="reward===0?'disable':''" href="javascript:void(0)"
                                                      @click="claim">CLAIM</a>
                            </div>
                        </div>
                        <div class="status-items">
                            <div class="title">Unstaked Tokens</div>
                            <div class="number">0</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5 float-right">
                <Login/>
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
                                            <div class="table-responsive" ref="validatorTable">
                                                <ValidatorTable
                                                    :validators="allValidators"
                                                    :isStake="false"
                                                    :unbondings="unbondings"
                                                    @showModal="showModal"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab" id="staked"
                                     v-show="activeClass('stakedValidators') === 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <ValidatorTable
                                                    :validators="stakedValidators"
                                                    :isStake="true"
                                                    :unbondings="unbondings"
                                                    @showModal="showModal"
                                                />
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
                            <div class="content-detail-vali" ref="proposalTable">
                                <ul>
                                    <ItemProposals v-for="(proposal,index) in proposals" :key="index"
                                                   :proposer="proposal.proposer"
                                                   :index="proposal.proposalId.low"
                                                   :proposalId="proposal.proposalId.low"
                                                   :status="proposal.status"
                                                   :submitTime="proposal.submitTime"
                                                   :votingStartTime="proposal.votingStartTime"
                                                   :votingEndTime="proposal.votingEndTime"
                                                   :vote="proposal.finalTallyResult"
                                                   :title="proposal.content.value"
                                                   :des="proposal.des"
                                                   @showModal="showModal('','modalProposal',proposal.proposalId.low,index+1)"
                                    />
                                    <ProposalNoData :proposals="proposals"/>
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
                                @click="closeModal('modalStake','closeStake')">
                            <span aria-hidden="true" class="icon-close-modal" ></span></button>
                    </div>
                    <ModalStake :validators="validators" :coin="coin" ref="closeStake"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalUnDelegate" id="popupUndelegate">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModal('modalUnDelegate','closeUnDelegate')">
                            <span aria-hidden="true" class="icon-close-modal"></span></button>
                    </div>
                    <ModalUndelegate :stakedValidators="stakedValidators" :delegate="delegate"
                                     ref="closeUnDelegate"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalReDelegate" id="popupRedelega">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModal('modalReDelegate','closeRelegate')">
                            <span aria-hidden="true" class="icon-close-modal"></span></button>
                    </div>
                    <ModalRelegate :stakedValidators="stakedValidators" :validators="validators"
                                   :delegate="delegate" ref="closeRelegate"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalDelegate" id="popupStakeTokens">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModal('modalDelegate','closeDelegate')">
                            <span aria-hidden="true" class="icon-close-modal"></span></button>
                    </div>
                    <ModalDelegate :validators="validators" :coin="coin" :titleDelegate="titleDelegate"
                                   ref="closeDelegate" @changeTitleDelegate="changeTitleDelegate"/>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" id="contentDetailProposal" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalProposal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true"
                                @click="closeModal('modalProposal','')"><span aria-hidden="true"
                                                                              class="icon-close-modal"></span></button>
                    </div>
                    <div class="modal-body" v-if="!isEmpty(proposalDetail)">
                        <div class="item-proposal-detail">
                            <ProposalHeader
                                :id="i"
                                :status="proposalDetail.status"
                                :title="proposalDetail.des.typeUrl"
                            />
                        </div>
                        <div class="box-item-detail-proposal">
                            <div class="left-item-detail">
                                <div class="box-left-detail">
                                    <ProposalInfo
                                        :proposer="proposalDetail.proposer"
                                        :submitTime="proposalDetail.submitTime"
                                        :votingStartTime="proposalDetail.votingStartTime"
                                        :votingEndTime="proposalDetail.votingEndTime"
                                    />
                                    <p>{{ proposalDetail.des.content }}</p>
                                </div>
                            </div>
                            <div class="right-item-proposal">
                                <div class="cnt-proposal">
                                    <ProposalChart
                                        :yes="proposalDetail.finalTallyResult.yes"
                                        :no="proposalDetail.finalTallyResult.no"
                                        :noWithVeto="proposalDetail.finalTallyResult.noWithVeto"
                                        :abstain="proposalDetail.finalTallyResult.abstain"
                                    />
                                    <ProposalVoteInfo
                                        :yes="proposalDetail.finalTallyResult.yes"
                                        :no="proposalDetail.finalTallyResult.no"
                                        :noWithVeto="proposalDetail.finalTallyResult.noWithVeto"
                                        :abstain="proposalDetail.finalTallyResult.abstain"
                                        :status="proposalDetail.status"
                                        @changeOption="handelChangeOption"
                                    />
                                    <div class="cnt-vote">
                                        <button class="btn btn-vote" @click="handelVote">Vote</button>
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
import {KelprWallet} from "@/utils/connectKeplr";
import ItemProposals from "@/components/item-top-proposals/ItemProposals";
import ModalStake from "@/components/ModalStake";
import ModalRelegate from "@/components/ModalRelegate";
import ModalUndelegate from "@/components/ModalUndelegate";
import ModalDelegate from "@/components/ModalDelegate";
import ValidatorTable from "@/components/validator/ValidatorTable.vue"
import {ProposalStatus} from "@/utils/constant"
import {mapMutations, mapState} from "vuex";
import ProposalInfo from "@/components/proposal/ProposalInfo";
import ProposalChart from "@/components/proposal/ProposalChart";
import ProposalVoteInfo from "@/components/proposal/ProposalVoteInfo";
import ProposalHeader from "@/components/proposal/ProposalHeader";
import ProposalNoData from "../../components/proposal/ProposalNoData";

const DENOM = process.env.VUE_APP_COIN_MINIMAL_DENOM
export default {
    name: "Dashboard",
    components: {
        ProposalNoData,
        ProposalHeader,
        ProposalVoteInfo,
        ProposalChart,
        ProposalInfo,
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
            unbondings: [],
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
            listReward: [],
            proposalDetail: [],
            i: 0,
            option: -1,
        }
    },
    computed: {
        ...mapState('auth', ["address"]),
        allValidators() {
            const validators = [...this.validators]
            return validators.splice(0, 10)
        }
    },
    async mounted() {
        await this.getWallet()
        await this.getData()
        await this.getProposals()
        this.$store.subscribe(mutation => {
            if (mutation.type === 'auth/setAddress') {
                this.getData()
            }
        })
    },
    methods: {
        ...mapMutations("modal", ["setIsOpen"]),
        setActiveTab(tabId) {
            this.activeTab = tabId
        },
        activeClass(tabId) {
            if (tabId === this.activeTab) {
                return 'active'
            }
            return ''
        },
        async getData() {
            await this.getRewards()
            await this.getBalances()
            await this.getAllValidators()
            await this.stakeds()
            await this.getDelegation()
            await this.unbonding()
        },
        showModal(title, refName, proposalId, index) {
            if (this.address == '' && proposalId == '') {
                this.$toast.error('Account not connected. Please connect to wallet')
                return
            }
            if (refName == 'modalDelegate') {
                this.titleDelegate = title
            }
            if (proposalId) {
                this.i = index
                this.proposals.forEach(item => {
                    if (item.proposalId.low === proposalId) {
                        this.proposalDetail = item
                        return
                    }
                })

            }
            this.$refs[refName].classList.toggle("in")
            document.body.classList.toggle("modal-open")
            this.$refs[refName].style.display = "block"
            this.setIsOpen(true)

        },
        closeModal(refName, refCloseName) {
            if (refCloseName) {
                this.$refs[refCloseName].closeModal()
            }
            this.$refs[refName].classList.toggle("in")
            document.body.classList.toggle("modal-open")
            this.$refs[refName].style.display = "none"
            this.setIsOpen(false)
        },
        async getWallet() {
            try {
                this.wallet = await WalletHelper.connect()
            } catch (err) {
                this.$toast.error(err.message);
            }
        },
        async getStargetClient() {
            return await WalletHelper.getStargateClient()
        },
        async getAllValidators() {
            const loader = this.showLoadling("validatorTable")
            try {
                const data = await this.wallet.getValidators("BOND_STATUS_BONDED")
                this.validators = [...data.validators]
                await this.getValidatorImage(0, this.validators, "validators")
            } catch (err) {
                this.$toast.error(err.message);
            }
            this.hideLoading(loader)
        },
        async getValidatorImage(index, validators, property) {
            const array = [];
            for (let i = 0; i < 3; i++) {
                if (validators[index + i]) {
                    const value = validators[index + i];
                    if (value && value.description && value.description.identity) {
                        array.push(this.getKeyBaseImage(value.description.identity));
                    }
                } else {
                    break;
                }
            }
            Promise.all(array).then((data) => {
                data.forEach((item, i) => {
                    this.$set(this[property][index + i], 'imageUrl', item)
                })
                if (index + 3 <= validators.length - 1) {
                    this.getValidatorImage(index + 3, validators, property);
                }
            });
        },
        async getKeyBaseImage (identity) {
            const response = await this.axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`)
            return response.data.them[0].pictures.primary.url
        },
        async getProposals() {
            const loader = this.showLoadling("proposalTable")
            try {
                const res = await this.wallet.getListProposal(ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD, '', '')
                this.proposals = res.proposals
                this.sortProposal()
                await this.formatProposals()
            } catch (err) {
                this.$toast.error(err.message)
            }
            this.hideLoading(loader)
        },
        async getProposal(stargateClient, proposalId) {
            return await WalletHelper.getSumitProposer(stargateClient, proposalId)
        },
        async formatProposals() {
            const proposals = [...this.proposals]
            const stargateClient = await this.getStargetClient()
            for await (const data of this.proposals) {
                data.des = WalletHelper.convertContent(data.content.value)
                data.proposer = await this.getProposal(stargateClient, data.proposalId)
            }
            this.proposals = [...proposals]
        },
        async getRewards() {
            if (this.address) {
                const response = await this.wallet.getRewards(this.address)
                response.total.forEach(item => {
                    if (item.denom === DENOM) {
                        this.reward = item.amount / 10 ** 24
                        console.log(this.reward)
                    }
                })
                this.listReward = response.rewards
            }
        },
        async getBalances() {
            if (this.address) {
                const balances = await this.wallet.getBalances(this.address)
                balances.forEach(item => {
                    if (item.denom === DENOM) {
                        this.coin = item.amount
                        this.availableTokens = item.amount / 10 ** 6
                    }
                })
            }
        },
        async unbonding() {
            if (this.address) {
                const response = await this.wallet.getUnbonding(this.address)
                this.unbondings = response.unbondingResponses
            }
        },
        async getDelegation() {
            if (this.address) {
                this.stakedTokens = 0
                const delegation = await this.wallet.getDelegation(this.address)
                delegation.delegationResponses.forEach(item => {
                    if (item.balance.denom === DENOM) {
                        this.delegate.push(item)
                        this.stakedTokens += item.balance.amount / 10 ** 6
                    }
                })
            }
        },
        async stakeds() {
            if (this.address) {
                const response = await this.wallet.getStakedValidators(this.address)
                this.stakedValidators = response.validators
                await this.getValidatorImage(0, this.stakedValidators, "stakedValidators")
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
        },
        showLoadling(refName) {
            const loader = this.$loading.show({
                container: this.$refs[refName],
                canCancel: true,
                onCancel: this.onCancel,
            });
            return loader
        },
        hideLoading(loader) {
            loader.hide()
        },
        async handelVote() {
            await this.vote(this.proposalDetail.proposalId, this.option)
        },
        async vote(proposalId, option) {
            try {
                const voter = await KelprWallet.getAddress()
                const keplrWallet = await KelprWallet.getKeplrWallet()
                await keplrWallet.vote(voter, proposalId, option)
                this.$toast.success("Vote success");
            } catch (err) {
                this.$toast.error(err.message);
            }
        },
        handelChangeOption(option) {
            this.option = option
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        sortProposal() {
            this.proposals.sort(function (a, b) {
                return b.proposalId.low - a.proposalId.low;
            });
        },
        changeTitleDelegate(title) {
            this.titleDelegate = title
        }
    }
}
</script>

<style scoped>

</style>
