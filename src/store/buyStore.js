import * as types from './mutation-types'
import { validCheck } from './validCheck'
import { delData, alreadyDatas } from './data'
import { sum } from './calc'

export const buyStore = {
  namespaced: true,
  state: {
    buy: {
      name: {
        val: null,
        name: '物件名',
        placeholder: 'リアルエステート',
        valid: false,
        error: ''
      },
      price: {
        val: null,
        name: '物件価格',
        placeholder: '3500',
        unit: '万円',
        min: 1,
        valid: false,
        error: ''
      },
      deposit: {
        val: null,
        name: '頭金',
        placeholder: '500',
        unit: '万円',
        min: 0,
        valid: false,
        error: ''
      },
      rate: {
        val: null,
        name: '金利',
        placeholder: '1',
        unit: '%/年',
        min: 0,
        payMethod: '1',
        valid: false,
        error: ''
      },
      year: {
        val: null,
        name: '返済期間',
        unit: '年',
        valid: false,
        error: ''
      },
      admin: {
        val: null,
        name: '管理費',
        placeholder: '10000',
        unit: '円/月',
        min: 0,
        valid: false,
        error: ''
      },
      reserve: {
        val: null,
        name: '修繕積立金',
        placeholder: '10000',
        unit: '円/月',
        min: 0,
        valid: false,
        error: ''
      }
    },
    buyResult: {
      name: {
        val: null,
        name: '物件名'
      },
      price: {
        val: null,
        name: '物件価格',
        unit: '万円'
      },
      rateSum: {
        val: null,
        name: '金利',
        unit: '万円'
      },
      adminSum: {
        val: null,
        name: '管理費',
        unit: '万円'
      },
      reserveSum: {
        val: null,
        name: '修繕費',
        unit: '万円'
      },
      sum: {
        val: null,
        name: '総支払額',
        unit: '万円'
      },
      everyMonth: {
        val: null,
        name: '支払額',
        unit: '万円/月'
      },
      detail: {
        val: {
          everyMonth: [],
          principal: [],
          rate: [],
          balance: []
        }
      }
    },
    payData: {
      rateCalc: 0,
      rateVal: 0,
      rateCount: 0,
      principal: 0,
      paysMonth: 0,
      paysNum: 0,
      resultVal: 0,
      priceVal: 0,
      runningVal: 0,
      constPrice: 0
    },
    buyResultList: []
  },
  mutations: {
    [types.VALIDCHECK] (state) {
      if (validCheck(state.buy)) {
        if (state.buy.price.val <= state.buy.deposit.val) {
          alert('現金一括払い！')
          return false
        }
        sum(state)
      }
    },
    [types.DELDATA] (state, index) {
      delData(state.buyResultList, index, 'buyEstate')
    },
    [types.ALREADYDATAS] (state) {
      alreadyDatas(state.buyResultList, 'buyEstate')
    }
  },
  actions: {
    validCheck ({ commit }) {
      commit(types.VALIDCHECK)
    },
    delData ({ commit }, index) {
      commit(types.DELDATA, index)
    },
    alreadyDatas ({ commit }) {
      commit(types.ALREADYDATAS)
    }
  }
}
