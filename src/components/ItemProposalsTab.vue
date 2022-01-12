<template>
    <a href="javascript:void (0)" @click="eventModal">
        <li>
            <div class="item-proposal-detail">
                <ProposalHeader 
                    :id="index + 1"
                    :status="status"
                    :title="des.typeUrl"
                />
                <div class="box-item-detail-proposal">
                    <div class="left-item-detail">
                        <div class="sub-title-item"
                             style="height: 100px!important;,width: 350px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;">
                            {{ des.content }}
                        </div>
                        <ProposalInfo 
                            :proposer="proposer"
                            :submitTime="submitTime"
                            :votingStartTime="votingStartTime"
                            :votingEndTime="votingEndTime"
                        />
                    </div>
                    <div class="right-item-proposal">
                        <ProposalChart 
                            :yes="vote.yes"
                            :no="vote.no"
                            :abstain="vote.abstain"
                            :noWithVeto="vote.noWithVeto"
                        />
                        <ProposalVoteInfo
                            :yes="vote.yes"
                            :no="vote.no"
                            :abstain="vote.abstain"
                            :noWithVeto="vote.noWithVeto"
                        />
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
import { WalletHelper } from "../utils/wallet";
import ProposalHeader from "@/components/proposal/ProposalHeader.vue"
import ProposalInfo from "@/components/proposal/ProposalInfo.vue"
import ProposalVoteInfo from "@/components/proposal/ProposalVoteInfo.vue"
import ProposalChart from "@/components/proposal/ProposalChart.vue"

export default {
    name: "ItemProposalsTab",
    components: {
        ProposalHeader,
        ProposalInfo,
        ProposalVoteInfo,
        ProposalChart
    },
    props: {
        index: Number,
        status: Number,
        title: Uint8Array,
        submitTime: {type: Date},
        votingStartTime: {type: Date},
        votingEndTime: {type: Date},
        vote: {
            type: Object,
            default: function (){
                return  {
                    yes: '',
                    no: '',
                    noWithVeto: '',
                    abstain: ''
                }
            }
        },
        proposalId: Number,
        proposer: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
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
        }
    },
    computed: {
        des() {
            return  WalletHelper.convertContent(this.title)
        },
        proposerAddress() {
            return this.proposer
        }
    },
    methods: {
        eventModal() {
            this.$emit('showModal')
        },
    }
}
</script>

<style scoped>

</style>
