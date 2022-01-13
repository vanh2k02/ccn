import { Doughnut, mixins } from "vue-chartjs";
export default {
    extends: Doughnut,
    props: ["data", "chartData"],
    mixins: [mixins.reactiveProp],
    watch: {
        data () {
          this.renderChart(this.data)
        }
    },
    mounted() {
        this.renderChart(this.data)
    }
};
