<template>
  <div>
    <PieChart :data="pieChartData" :options="options"></PieChart>
  </div>
</template>

<script>
import PieChart from './PieChart.vue'

export default {
  props: ['chartVal'],
  components: {
    PieChart
  },
  name: 'chart',
  data () {
    return {
      pieChartData: {
        labels: [
          this.chartVal.price.name,
          this.chartVal.rateSum.name,
          this.chartVal.adminSum.name,
          this.chartVal.reserveSum.name
        ],
        datasets: [{
          data: [
            this.chartVal.price.val,
            this.chartVal.rateSum.val,
            this.chartVal.adminSum.val,
            this.chartVal.reserveSum.val
          ],
          backgroundColor: [
            '#FC3E6A',
            '#4569FB',
            '#86FF6D',
            '#FEE03C'
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: this.chartVal.sum.name + 'に対する割合',
          fontSize: 16,
          fontColor: '#333',
          fontStyle: 'normal'
        },
        legend: {
          labels: {
            fontSize: 14,
            fontColor: '#333'
          }
        }
      }
    }
  }
}
</script>
