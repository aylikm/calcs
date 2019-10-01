import * as types from './mutation-types'
import { validCheck } from './validCheck'
import { addData, delData, alreadyDatas } from './data'

export const rentalStore = {
  namespaced: true,
  state: {
    rental: {
      name: {
        val: null,
        name: '物件名',
        placeholder: 'リアルエステート',
        valid: false,
        error: ''
      },
      price: {
        val: null,
        name: '家賃/月',
        placeholder: '70000',
        unit: '円',
        min: 1,
        valid: false,
        error: ''
      },
      admin: {
        val: null,
        name: '管理費',
        placeholder: '5000',
        unit: '円/月',
        min: 0,
        valid: false,
        error: ''
      },
      year: {
        val: null,
        name: '居住期間',
        unit: '年',
        valid: false,
        error: ''
      },
      month: {
        val: null,
        name: '居住期間',
        unit: '月',
        valid: false,
        error: ''
      },
      deposit: {
        val: null,
        name: '敷金',
        unit: 'ヵ月分',
        valid: false,
        error: ''
      },
      lostMoney: {
        val: null,
        name: '礼金',
        unit: 'ヵ月分',
        valid: false,
        error: ''
      }
    },
    rentalResult: {
      name: {
        val: null,
        name: '物件名'
      },
      adminSum: {
        val: null,
        name: '管理費',
        unit: '万円'
      },
      depositSum: {
        val: null,
        name: '敷金',
        unit: '万円'
      },
      lostMoneySum: {
        val: null,
        name: '礼金',
        unit: '万円'
      },
      RenewelFeeSum: {
        val: null,
        name: '更新費',
        unit: '万円',
        show: false
      },
      sum: {
        val: null,
        name: '総支払額',
        unit: '万円'
      }
    },
    rentalResultList: []
  },
  mutations: {
    [types.VALIDCHECK] (state) {
      if (validCheck(state.rental)) {
        const residenceDays = (state.rental.year.val * 12) + state.rental.month.val
        const contractMoney = state.rental.deposit.val + state.rental.lostMoney.val

        // 物件名
        state.rentalResult.name.val = state.rental.name.val
        // 管理費
        state.rentalResult.adminSum.val = (state.rental.admin.val * residenceDays) / 10000

        if ((state.rental.year.val >= 3) || (state.rental.year.val >= 2 && state.rental.month.val >= 1)) {
          let renewelFeeSum = 0

          if (state.rental.year.val % 2 === 0 && state.rental.month.val === 0) {
            renewelFeeSum = Math.floor(state.rental.year.val / 2) - 1
          } else {
            renewelFeeSum = Math.floor(state.rental.year.val / 2)
          }

          // 総支払額
          state.rentalResult.sum.val = ((state.rental.price.val * (residenceDays + contractMoney + renewelFeeSum)) / 10000) + state.rentalResult.adminSum.val
          state.rentalResult.RenewelFeeSum.show = true
          // 更新費
          state.rentalResult.RenewelFeeSum.val = (state.rental.price.val * renewelFeeSum) / 10000
        } else {
          state.rentalResult.RenewelFeeSum.show = false
          // 総支払額
          state.rentalResult.sum.val = ((state.rental.price.val * (residenceDays + contractMoney)) / 10000) + state.rentalResult.adminSum.val
        }

        // 敷金
        state.rentalResult.depositSum.val = (state.rental.price.val * state.rental.deposit.val) / 10000
        // 礼金
        state.rentalResult.lostMoneySum.val = (state.rental.price.val * state.rental.lostMoney.val) / 10000

        addData(state.rentalResult, state.rentalResultList, 'rentalEstate')

        Object.keys(state.rentalResult).forEach((i) => {
          state.rentalResult[i].val = null
        }, state.rentalResult)

        Object.keys(state.rental).forEach((i) => {
          state.rental[i].val = null
        }, state.rental)
      }
    },
    [types.DELDATA] (state, index) {
      delData(state.rentalResultList, index, 'rentalEstate')
    },
    [types.ALREADYDATAS] (state) {
      alreadyDatas(state.rentalResultList, 'rentalEstate')
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
