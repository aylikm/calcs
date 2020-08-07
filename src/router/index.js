import Vue from 'vue'
import Router from 'vue-router'
import buyEstate from '@/components/buyEstate'
import rentalEstate from '@/components/rentalEstate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/buyEstate',
      component: buyEstate
    },
    {
      path: '/rentalEstate',
      component: rentalEstate
    }
  ]
})
