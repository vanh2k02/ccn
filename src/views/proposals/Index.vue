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
                    <div class="modal-body">
                        <div class="item-proposal-detail">
                            <ProposalHeader 
                                :id="i"
                                :status="proposalDetail.status"
                            />
                        </div>
                        <div class="box-item-detail-proposal">
                            <div class="left-item-detail">
                                <div class="box-left-detail">
                                    <ul class="info-item">
                                        <li>
                                            <span class="title">Proposer:</span>
                                            <span class="info"> {{ proposal }}</span>
                                        </li>
                                        <li>
                                            <span class="title">Submitted on:</span>
                                            <span class="info"> 
                                                {{ proposalDetail.submitTime|formatDateTime }}
                                            </span>
                                        </li>
                                        <li>
                                            <span class="title">Voting Period:</span>
                                            <span class="info"> 
                                                {{
                                                proposalDetail.votingStartTime| formatDateTime }} to 
                                                {{ proposalDetail.votingEndTime| formatDateTime }}
                                            </span>
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
import { WalletHelper } from "@/utils/wallet";
import ItemProposalsTab from "@/components/ItemProposalsTab";
import { ProposalStatus } from "@/utils/constant";
import PieChart from "@/utils/doughnutChart";
import moment from "moment";
import ProposalHeader from "@/components/proposal/ProposalHeader.vue"

export default {
    name: "proposals",
    components: {
        ItemProposalsTab, 
        Login, 
        PieChart,
        ProposalHeader
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
            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 50,
                borderWidth: 1,
                labels: [],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: ["#89C777", "#FF9300", "#DE3232", "#0A198E"],
                        data: [1, 1, 1, 1]
                    }
                ]
            },
            proposalsForStatus: []
        }
    },
    filters: {
        formatDateTime(dateTime) {
            const a = moment(dateTime, "dddd, MMMM Do YYYY, h:mm:ss").toString()
            return a.split(' ').slice(0, 5).join(' ');
        }

    },
    async created() {
        await this.getWallet()
        await this.getProposals()
        await this.getStargetClient()
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
            console.log(this.stargateClient)
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
        async getDescription() {
            this.des = WalletHelper.convertContent(this.proposalDetail.content.value)
        },
        getProposal() {
            console.log(1)
            // const proposal_id = this.proposalDetail.proposalId.low
            // // chuyen sang dung await va filter theo proposal_id
            // // proposal_id --> proposalId
            // const result = WalletHelper.getSumitProposer(this.stargateClient, proposal_id)
            // Promise.resolve(result).then(res => {
            //     this.proposal = res
            // })
        },
        getProposalByStatus(status) {
            console.log(status)
            this.proposals.forEach(item => {
                if (item.status === status) {
                    this.proposalsForStatus.push(item)
                }
            })
            console.log(this.proposalsForStatus)
        }
    }
}
</script>

<style scoped>

</style>
