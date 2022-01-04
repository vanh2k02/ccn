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
                                                                  :title="proposal.content.value"
                                                                  @click="showModal"/>
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
                                                                  @click="showModal"/>
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
                                                                  :title="proposal.content.value"
                                                                  @click="showModal"/>
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
                                                                  :title="proposal.content.value"
                                                                  @click="showModal"/>

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
        <div class="modal modal-dialog-centered fade popup_customer" id="contentDetailProposal" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="my-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="item-proposal-detail">
                            <div class="title-item-proposal">
                                <div class="number-title">
                                    <div class="number">04</div>
                                    <h3>Fixing Centralization From Gamed Stakedrop</h3>
                                </div>
                                <div class="cnt-text"><a href="#">Status</a><a class="active" href="#">Voting Perlod</a>
                                </div>
                            </div>
                        </div>
                        <div class="box-item-detail-proposal">
                            <div class="left-item-detail">
                                <div class="box-left-detail">
                                    <ul class="info-item">
                                        <li><span class="title">Proposer:</span><span
                                            class="info"> juno1r…jhwwccx</span></li>
                                        <li><span class="title">Submitted on:</span><span class="info"> 07-Oct-2021 19:55:41</span>
                                        </li>
                                        <li><span class="title">Voting Period:</span><span class="info"> 12-Oct-2021 19:28:58 to 17-Oct-2021 19:28:58</span>
                                        </li>
                                    </ul>
                                    <p>This is the account that gamed the fair stakedrop. </p>
                                    <p>It has 2.5 million Juno instead of 50k (Which was the max per account) </p>
                                    <p>One of the main reasons for this proposal is that this address has staked the
                                        majority to one validator. This action is centralizing the network. They also
                                        did not delegate until Juno started trading on Osmosis. This would indicate that
                                        it was done so that it would be impossible to just restart the chain with this
                                        amount changed to 50k. </p>
                                    <p>They just started to redelegate 250k Juno to SG1, which is the second biggest
                                        validator I can only assume because of the backlash. SG1 is the 2nd biggest
                                        validator so they don’t seem to understand the concept of decentralization. By
                                        not fixing this issue now it will lead to long term centralized governance
                                        issues. </p>
                                    <p>I propose that we blacklist/delete 90% of the Juno in this account. This action
                                        is not done lightly. By the time this proposal goes through, they will not have
                                        been able to undelegate in time to prevent the decision of governance. </p>
                                    <p>By voting yes to this proposal you agree that the Juno tokens in this account be
                                        reduced by 90% and that future blacklisting/reducing of coins should not be
                                        taken lightly.</p>
                                </div>
                            </div>
                            <div class="right-item-proposal">
                                <div class="cnt-proposal">
                                    <div class="chart"><img src="public/admin/assets/images/chart1.png" alt=""/></div>
                                    <div class="cnt-vote">
                                        <div class="vote">Yes: 82%</div>
                                        <div class="notvote">NoWithVeto: 0.72%</div>
                                    </div>
                                    <div class="cnt-vote cnt-absta">
                                        <div class="no-ab">No: 12%</div>
                                        <div class="abstain">Abstain: 5.28%</div>
                                    </div>
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
    async created() {
        await this.getWallet()
        this.checkClick('all', this.statusProposal.UNRECOGNIZED)
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
        showModal() {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "block"
        },
        closeModal() {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = ""
        },
    }
}
</script>

<style scoped>

</style>
