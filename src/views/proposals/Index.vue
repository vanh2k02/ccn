<template>
    <div>
        <div class="content-wallet">
            <Login/>
            <div class="content-proposal-detail">
                <div class="row">
                    <div class="col-md-12">
                        <div class="cnt-wallet-left">
                            <div class="cnt-proppsals">
                                <div class="title-proppsal">
                                    <div class="title title-tab">
                                        <ul>
                                            <li :class="activeClass('all')"><a
                                                @click="checkClick('all',statusProposal.UNRECOGNIZED)"
                                                href="javascript:void (0)">All</a></li>
                                            <li :class="activeClass('passed')"><a href="javascript:void (0)"
                                                                                  @click="checkClick('passed',statusProposal.PROPOSAL_STATUS_PASSED)">Passed</a>
                                            </li>
                                            <li :class="activeClass('pending')"><a href="javascript:void (0)"
                                                                                   @click="checkClick('pending',statusProposal.PROPOSAL_STATUS_DEPOSIT_PERIOD)">Pending</a>
                                            </li>
                                            <li :class="activeClass('rejected')"><a href="javascript:void (0)"
                                                                                    @click="checkClick('rejected',statusProposal.PROPOSAL_STATUS_REJECTED)">Rejected</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content-tab-proposal">
                                    <div class="content-tab" id="all" v-show="activeClass('all')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposals" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="index"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-tab" id="passed" v-show="activeClass('passed')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposalsForStatus" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="index"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-tab" id="pending" v-show="activeClass('pending')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposalsForStatus" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="index"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-tab" id="reject" v-show="activeClass('rejected')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposalsForStatus" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="index"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                </ul>
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
        <div class="modal modal-dialog-centered fade popup_customer" id="contentDetailProposal" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true"
                                @click="closeModal"><span aria-hidden="true"></span></button>
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
                                    />
                                    <div class="cnt-vote">
                                        <button class="btn btn-vote">Vote</button>
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
import { WalletHelper } from "@/utils/wallet";
import ItemProposalsTab from "@/components/ItemProposalsTab";
import { ProposalStatus } from "@/utils/constant";
import ProposalHeader from "@/components/proposal/ProposalHeader.vue"
import ProposalVoteInfo from "@/components/proposal/ProposalVoteInfo.vue"
import ProposalChart from "@/components/proposal/ProposalChart.vue"
import ProposalInfo from "@/components/proposal/ProposalInfo.vue"

export default {
    name: "proposals",
    components: {
        ItemProposalsTab, 
        Login, 
        ProposalHeader,
        ProposalVoteInfo,
        ProposalChart,
        ProposalInfo
    },
    data: function () {
        return {
            class: 'all',
            wallet: '',
            stargateClient: null,
            statusProposal: ProposalStatus,
            proposals: [],
            proposalDetail: {},
            i: 0, // remove
            name: '',
            style: '',
            des: '',
            proposal: '',
            proposalsForStatus: []
        }
    },
    async created() {
        await this.getWallet()
        await this.getProposals()
        await this.getStargetClient()
        await this.formatProposals()
    },
    methods: {
        checkClick(key, status) {
            this.class = key
            this.proposalsForStatus = []
            this.getProposalByStatus(status)
        },
        activeClass(key) {
            if (key === this.class) {
                return 'active'
            }
            return ''
        },
        async getWallet() {
            this.wallet = await WalletHelper.connect()
        },
        async getStargetClient() {
            this.stargateClient = await WalletHelper.getStargateClient()
        },
        async getProposals() {
            const res = await this.wallet.getListProposal(this.statusProposal.UNRECOGNIZED, "", "")
            this.proposals = res.proposals
        },
        showModal(val, index) {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "block"
            this.i = index // remove i
            this.proposals.forEach(item => {
                if (item.proposalId.low === val) {
                    this.proposalDetail = item
                    console.log(this.proposalDetail)
                    return
                }
            })
        },
        closeModal() {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "none"
        },
        getProposalByStatus(status) {
            this.proposalsForStatus = this.proposals.filter(x => x.status === status)
        },
        async getProposal(proposalId) {
            return await WalletHelper.getSumitProposer(this.stargateClient, proposalId)
        },
        async formatProposals() {
            const proposals = [...this.proposals]
            for await (const data of proposals) { 
                data.proposer = await this.getProposal(data.proposalId)
                data.des = WalletHelper.convertContent(data.content.value)
            }
            this.proposals = [...proposals]
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }
    }
}
</script>

<style scoped>

</style>
