<template>
    <fragment>
        <div class="cnt-vote">
            <div class="vote">Yes: {{ yes | getPercent(totalVote) }} %</div>
            <div class="notvote">NoWithVeto: {{ noWithVeto | getPercent(totalVote) }} %</div>
        </div>
        <div class="cnt-vote cnt-absta">
            <div class="no-ab">No: {{ no | getPercent(totalVote) }} %</div>
            <div class="abstain">Abstain: {{ abstain | getPercent(totalVote) }} %</div>
        </div>
    </fragment>
</template>
<script>
import { Fragment } from 'vue-fragment'

export default {
    components: { Fragment },
    props: {
        yes: String,
        noWithVeto: String,
        no: String,
        abstain: String,
    }, 
    filters: {
        getPercent(value, totalVote) {
            return ((value / totalVote) * 100).toFixed(2)
        }
    },
    computed: {
        totalVote() {
            const {yes, no, noWithVeto, abstain} = this
            return Number(no) + Number(yes) + Number(noWithVeto) + Number(abstain)
        },
    }
}
</script>