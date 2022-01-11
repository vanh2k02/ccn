<template>
    <a href="javascript:void (0)" @click="eventModal">
        <li>
            <div class="item-proposal-detail">
                <div class="title-item-proposal">
                    <div class="number-title">
                        <div class="number">{{ index + 1 }}</div>
                        <h3>{{ des.typeUrl }}</h3>
                    </div>
                    <div class="cnt-text"><a href="#">Status</a><a
                        :style="{backgroundColor:style}" href="#">{{ name }}</a></div>
                </div>
                <div class="box-item-detail-proposal">
                    <div class="left-item-detail">
                        <div class="sub-title-item"
                             style="height: 100px!important;,width: 350px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;">
                            {{ des.content }}
                        </div>
                        <ul class="info-item">
                            <li><span class="title">Proposer:</span><span
                                class="info"> {{ proposal }}</span></li>
                            <li><span class="title">Submitted on:</span><span
                                class="info"> {{ submitTime| formatDateTime }} </span></li>
                            <li><span class="title">Voting Period:</span><span
                                class="info"> {{ votingStartTime| formatDateTime }} to {{
                                    votingEndTime| formatDateTime
                                }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="right-item-proposal">
                        <div class="chart">
                            <pie-chart :data="chartData" style="width: 100px"></pie-chart>
                        </div>
                        <div class="cnt-vote">
                            <div class="vote">Yes: {{ ((yes / totalVote) * 100).toFixed(2) }} %</div>
                            <div class="notvote">NoWithVeto: {{ ((noWithVeto / totalVote) * 100).toFixed(2) }} %</div>
                        </div>
                        <div class="cnt-vote cnt-absta">
                            <div class="no-ab">No: {{ ((no / totalVote) * 100).toFixed(2) }} %</div>
                            <div class="abstain">Abstain: {{ ((abstain / totalVote) * 100).toFixed(2) }} %</div>
                        </div>
                        <div class="cnt-vote">
                            <button class="btn btn-vote">Vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </a>

</template>

<script>
import {proposalStatus} from "../utils/constant";
import {WalletHelper} from "../utils/wallet";
import PieChart from "@/utils/doughnutChart";
import moment from "moment";

export default {
    name: "ItemProposalsTab",
    components: {
        PieChart
    },
    props: {
        index: Number,
        status: Number,
        title: Uint8Array,
        submitTime: {type: Date, default: ''},
        votingStartTime: {type: Date, default: ''},
        votingEndTime: {type: Date, default: ''},
        vote: Object,
        proposalId: Number
    }, filters: {
        formatDateTime(dateTime) {
            return moment(dateTime, "dddd, MMMM Do YYYY, h:mm:ss a")
        }

    },
    data: function () {
        return {
            yes: this.vote.yes,
            no: this.vote.no,
            noWithVeto: this.vote.noWithVeto,
            abstain: this.vote.abstain,
            totalVote: 0,
            name: '',
            style: '',
            des: '',
            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 50,
                borderWidth: 1,
                labels: [],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: ["#89C777", "#FF9300", "#DE3232", "#0A198E"],
                        data: [this.vote.yes, this.vote.no, this.vote.noWithVeto, this.vote.abstain]
                    }
                ]
            },
            proposal: ''
        }
    },
    mounted() {
        this.getTotal()
        this.checkStatus()
        this.getDescription()
        this.getProposal()
    },
    methods: {
        getTotal() {
            this.totalVote = Number(this.no) + Number(this.yes) + Number(this.noWithVeto) + Number(this.abstain)
        },
        checkStatus() {
            proposalStatus.forEach(item => {
                if (item.status === this.status) {
                    this.name = item.name
                    this.style = item.style
                }
            })
        },
        async getDescription() {
            const wallet = await WalletHelper.connect()
            this.des = wallet.convertContent(this.title)
        },
        eventModal() {
            this.$emit('showModal')
        },
        getProposal() {
            const result = WalletHelper.getSumitProposer(this.proposalId)
            Promise.resolve(result).then(res => {
                this.proposal = res
            })

        }
    }
}
</script>

<style scoped>

</style>
