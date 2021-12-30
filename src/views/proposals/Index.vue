<template>
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
                                                <ItemProposalsTab v-for="(proposal,index) in proposals" :key="index"
                                                                  :index="index"
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
                                <div class="content-tab" id="passed" v-show="activeClass('passed')==='active'">
                                    <div class="content-detail">
                                        <div class="content-detail-prop">
                                            <ul>
                                                <ItemProposalsTab v-for="(proposal,index) in proposals" :key="index"
                                                                  :index="index"
                                                                  :status="proposal.status"
                                                                  :submitTime="proposal.submitTime"
                                                                  :votingStartTime="proposal.votingStartTime"
                                                                  :votingEndTime="proposal.votingEndTime"
                                                                  :vote="proposal.finalTallyResult"
                                                                  :title="proposal.content.value"
                                                                  @click="showModal('modal')"/>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab" id="pending" v-show="activeClass('pending')==='active'">
                                    <div class="content-detail">
                                        <div class="content-detail-prop">
                                            <ul>
                                                <ItemProposalsTab v-for="(proposal,index) in proposals" :key="index"
                                                                  :index="index"
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
                                <div class="content-tab" id="reject" v-show="activeClass('reject')==='active'">
                                    <div class="content-detail">
                                        <div class="content-detail-prop">
                                            <ul>
                                                <ItemProposalsTab v-for="(proposal,index) in proposals" :key="index"
                                                                  :index="index"
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
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import Login from "@/components/login/Login";
import {WalletHelper} from "@/utils/wallet";
import ItemProposalsTab from "@/components/ItemProposalsTab";
import {ProposalStatus} from "@/utils/constant";

export default {
    name: "proposals",
    components: {ItemProposalsTab, Login},
    data: function () {
        return {
            class: 'all',
            wallet: '',
            statusProposal: ProposalStatus,
            proposals: []
        }
    },
    async mounted() {
        await this.getWallet()
    },
    methods: {
        checkClick(key, status) {
            this.class = key
            this.getProposals(status)
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
        async getProposals(status) {
            const res = await this.wallet.getListProposal(status, "", "")
            this.proposals = res.proposals
            console.log(this.proposals, 'proposals')
        },

    }
}
</script>

<style scoped>

</style>
