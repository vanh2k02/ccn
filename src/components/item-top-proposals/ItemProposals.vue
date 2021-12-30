<template>
    <li>
        <div class="item-vali-detail">
            <div class="title-item-vali">
                <div class="number">{{ index + 1 }}</div>
                <div class="cnt-text"><a href="#">Status</a><a
                    :style="{backgroundColor:style}" href="#">{{ name }}</a>
                </div>
            </div>
            <div class="box-item-detail">
                <h3>Fixing Centralization From Gamed Stakedrop</h3>
                <div class="sub-title-item">{{ des }}
                </div>
                <ul class="info-item">
                    <li><span class="title">Proposer:</span><span
                        class="info"> juno1r…jhwwccx</span></li>
                    <li><span class="title">Submitted on:</span><span
                        class="info"> {{ submitTime| moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span></li>
                    <li><span class="title">Voting Period:</span><span
                        class="info"> {{
                            votingStartTime| moment("dddd, MMMM Do YYYY, h:mm:ss a")
                        }} to {{ votingEndTime| moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
                    </li>
                </ul>
            </div>
            <div class="bottom-item-vali">
                <div class="cnt-vote">
                    <button class="btn btn-vote">Vote</button>
                </div>
                <div class="cnt-vote">
                    <div class="vote">Yes: {{ ((yes / totalVote) * 100).toFixed(2) }} %</div>
                    <div class="notvote">NoWithVeto: {{ ((noWithVeto / totalVote) * 100).toFixed(2) }} %</div>
                </div>
                <div class="cnt-vote cnt-absta">
                    <div class="no-ab">No: {{ ((no / totalVote) * 100).toFixed(2) }} %</div>
                    <div class="abstain">Abstain: {{ ((abstain / totalVote) * 100).toFixed(2) }} %</div>
                </div>
            </div>
        </div>
    </li>

</template>

<script>

import {proposalStatus} from "../../utils/constant";

export default {
    name: "ItemProposals",
    props: {
        index: Number,
        status: Number,
        description: Object,
        submitTime: {type: Date, default: ''},
        votingStartTime: {type: Date, default: ''},
        votingEndTime: {type: Date, default: ''},
        vote: Object
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
            des: ''
        }
    },
    mounted() {
        this.getTotal()
        this.checkStatus()
        this.getDescription()
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
        getDescription() {
            this.des = Buffer.from(this.description).toString()
        }
    }
}
</script>

<style scoped>

</style>
