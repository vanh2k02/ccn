<template>
    <ul class="info-item">
        <li>
            <span class="title">Proposer:</span>
            <span class="info"> {{ proposer }}</span>
        </li>
        <li>
            <span class="title">Submitted on:</span>
            <span class="info"> 
                {{ submitTime | formatDateTime }}
            </span>
        </li>
        <li>
            <span class="title">Voting Period:</span>
            <span class="info"> 
                {{ votingStartTime | formatDateTime }} to 
                {{ votingEndTime | formatDateTime }}
            </span>
        </li>
    </ul>
</template>
<script>
import moment from "moment";
export default {
    props: {
        proposer: String,
        submitTime: String,
        votingStartTime: String,
        votingEndTime: String
    },
    filters: {
        formatDateTime(dateTime) {
            const a = moment(dateTime, "dddd, MMMM Do YYYY, h:mm:ss").toString()
            return a.split(' ').slice(0, 5).join(' ');
        }, 
    }
}
</script>
