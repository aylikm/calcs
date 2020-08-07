import Vue from 'vue'
import Vuex from 'vuex'
import { buyStore } from './buyStore'
import { rentalStore } from './rentalStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    buyStore: buyStore,
    rentalStore: rentalStore
  }
})
