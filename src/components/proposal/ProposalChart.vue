<template>
    <div class="chart">
        <pie-chart :data="chartData" style="width: 100px"></pie-chart>
    </div>
</template>
<script>
import PieChart from "@/utils/doughnutChart";
export default {
    components: {
        PieChart
    },
    props: {
        yes: String,
        noWithVeto: String,
        no: String,
        abstain: String,
    }, 
    computed: {
        chartData() {
            const {yes, no, noWithVeto, abstain} = this
            return {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 50,
                    borderWidth: 1,
                    labels: [],
                    datasets: [
                        {
                            label: "Data One",
                            backgroundColor: ["#89C777", "#FF9300", "#DE3232", "#0A198E"],
                            data: [yes, no, noWithVeto, abstain]
                        }
                    ]
                }
        }
    },
}
</script>