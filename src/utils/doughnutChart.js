import { Doughnut, mixins } from "vue-chartjs";
export default {
    extends: Doughnut,
    props: ["data"],
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
