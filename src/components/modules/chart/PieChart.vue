<script>
import { Pie } from 'vue-chartjs'
export default {
  name: 'PieChart',
  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data (val) {
      this.renderChart(this.data, this.options)
    },
    options (val) {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>
