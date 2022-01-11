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
                                                    <ItemProposalsTab v-for="(proposal,index) in proposals" :key="index"
                                                                      :index="index"
                                                                      :status="proposal.status"
                                                                      :submitTime="proposal.submitTime"
                                                                      :votingStartTime="proposal.votingStartTime"
                                                                      :votingEndTime="proposal.votingEndTime"
                                                                      :vote="proposal.finalTallyResult"
                                                                      :title="proposal.content.value"
                                                                      :proposalId="proposal.proposalId.low"
                                                                      @showModal="showModal(proposal.proposalId.low,index+1)"/>
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
                                                                      :proposalId="proposal.proposalId.low"
                                                                      @showModal="showModal(proposal.proposalId.low,index+1)"/>
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
                                                                      :proposalId="proposal.proposalId.low"
                                                                      @showModal="showModal(proposal.proposalId.low,index+1)"/>
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
                                                                      :proposalId="proposal.proposalId.low"
                                                                      @showModal="showModal(proposal.proposalId.low,index+1)"/>

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
                    <div class="modal-body">
                        <div class="item-proposal-detail">
                            <div class="title-item-proposal">
                                <div class="number-title">
                                    <div class="number">{{ i }}</div>
                                    <h3>{{ des.typeUrl }}</h3>
                                </div>
                                <div class="cnt-text"><a href="#">Status</a><a :style="{backgroundColor:style}"
                                                                               href="#">{{ name }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="box-item-detail-proposal">
                            <div class="left-item-detail">
                                <div class="box-left-detail">
                                    <ul class="info-item">
                                        <li><span class="title">Proposer:</span><span
                                            class="info"> {{ proposal }}</span></li>
                                        <li><span class="title">Submitted on:</span><span class="info"> {{
                                                this.proposalDetail.submitTime| moment("dddd, MMMM Do YYYY, h:mm:ss a")
                                            }}</span>
                                        </li>
                                        <li><span class="title">Voting Period:</span><span class="info"> {{
                                                this.proposalDetail.votingStartTime| moment("dddd, MMMM Do YYYY, h:mm:ss a")
                                            }} to {{
                                                this.proposalDetail.votingEndTime| moment("dddd, MMMM Do YYYY, h:mm:ss a")
                                            }}</span>
                                        </li>
                                    </ul>
                                    <p>{{ des.content }}</p>
                                </div>
                            </div>
                            <div class="right-item-proposal">
                                <div class="cnt-proposal">
                                    <div class="chart">
                                        <pie-chart :data="chartData" style="width: 100px"></pie-chart>
                                    </div>
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
import {proposalStatus} from "../../utils/constant";
import PieChart from "@/utils/doughnutChart";

export default {
    name: "proposals",
    components: {ItemProposalsTab, Login, PieChart},
    data: function () {
        return {
            class: 'all',
            wallet: '',
            statusProposal: ProposalStatus,
            proposals: [],
            proposalDetail: {},
            i: 0,
            name: '',
            style: '',
            des: '',
            proposal: '',
            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 50,
                borderWidth: 1,
                labels: [],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: ["#89C777", "#FF9300", "#DE3232", "#0A198E"],
                        data: []
                    }
                ]
            },
        }
    },
    async created() {
        await this.getWallet()
        this.checkClick('all', this.statusProposal.UNRECOGNIZED)
    },
    methods: {
        checkClick(key, status) {
            this.class = key
            this.proposals = []
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
        },
        showModal(val, index) {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "block"
            this.i = index
            this.detailProposal(val)
            this.checkStatus()

        },
        closeModal() {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "none"
        },
        async detailProposal(val) {
            const proposal = await this.wallet.getDetailProposal(val)

            this.proposalDetail = proposal.proposal
            let vote = this.proposalDetail.finalTallyResult
            this.chartData.data = [vote.yes, vote.no, vote.noWithVeto, vote.abstain]

            await this.getDescription()
            this.getProposal()
        },
        checkStatus() {
            proposalStatus.forEach(item => {
                if (item.status === this.proposalDetail.status) {
                    this.name = item.name
                    this.style = item.style
                }
            })
        },
        async getDescription() {
            const value = this.proposalDetail
            console.log(value)
            const wallet = await WalletHelper.connect()
            this.des = wallet.convertContent(this.proposalDetail.content.value)

        },
        getProposal() {
            const proposal_id = this.proposalDetail.proposalId.low
            const result = WalletHelper.getSumitProposer(proposal_id)
            Promise.resolve(result).then(res => {
                this.proposal = res
            })

        }
    }
}
</script>

<style scoped>

</style>
