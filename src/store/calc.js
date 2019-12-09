import { addData } from './data'

export const sum = (state) => {
  state.payData.priceVal = (state.buy.price.val - state.buy.deposit.val) * 10000 // 入力した価格に計算上必要なので10000をかける
  state.payData.paysNum = state.buy.year.val * 12 // 返済回数 支払年数 × 12ヵ月
  state.payData.runningVal = state.buy.admin.val + state.buy.reserve.val

  if (state.buy.rate.val !== 0) { //  金利が1%以上の場合
    state.payData.rateVal = state.buy.rate.val / 100 // 金利(%)
    payMethods(state.buy.rate.payMethod, state.payData)
  } else { // 金利が0%の場合
    state.payData.constPrice = state.payData.priceVal
  }
  modalCalc(state.payData, state.buy.rate.payMethod, state.buyResult)

  Object.keys(state.buyResult).forEach((val) => {
    switch (val) {
      case 'name':
        state.buyResult[val].val = state.buy.name.val
        break
      case 'price':
        state.buyResult[val].val = state.buy.price.val - state.buy.deposit.val
        break
      case 'rateSum':
        state.buyResult[val].val = Math.floor((state.payData.resultVal / 10000) * 10) / 10
        break
      case 'adminSum':
        state.buyResult[val].val = Math.floor(((state.buy.year.val * 12 * state.buy.admin.val) / 10000) * 10) / 10
        break
      case 'reserveSum':
        state.buyResult[val].val = Math.floor(((state.buy.year.val * 12 * state.buy.reserve.val) / 10000) * 10) / 10
        break
      case 'sum':
        state.buyResult[val].val = state.buyResult.price.val + state.buyResult.rateSum.val + state.buyResult.adminSum.val + state.buyResult.reserveSum.val
        break
      case 'everyMonth':
        state.buyResult[val].val = state.buy.year.val === 0 ? '-' : Math.round((state.buyResult.sum.val / state.buy.year.val / 12) * 10) / 10
        break
    }
  }, state.buyResult)

  addData(state.buyResult, state.buyResultList, 'buyEstate')

  // Object.keys(state.payData).forEach((i, val) => {
  //   state.payData[i] = 0
  // }, this)

  Object.keys(state.buy).forEach((i) => {
    state.buy[i].val = null
  }, state.buy)
}

const payMethods = (payMethod, stateItem) => {
  if (payMethod === 1) { // 元利均等
    stateItem.rateCount = Math.floor(stateItem.priceVal * (stateItem.rateVal / 12) / (1 - Math.pow(1 + stateItem.rateVal / 12, -stateItem.paysNum)))
  } else { // 元金均等
    stateItem.constPrice = stateItem.priceVal
  }
}

const modalCalc = (data, method, result) => {
  // モーダル内に表示される全要素を削除
  Object.keys(result.detail.val).forEach((i) => {
    result.detail.val[i].length = 0
  }, result.detail.val)

  // モーダル用計算
  console.log(data.paysNum)

  for (let i = 0; i < data.paysNum; i++) {
    data.rateCalc = Math.floor(data.priceVal * (data.rateVal / 12))

    if (method === 1) { // 元利均等
      data.principal = data.rateCount - data.rateCalc
    } else { // 元金均等
      data.principal = Math.floor(data.constPrice / data.paysNum)
    }

    data.paysMonth = data.principal + data.rateCalc + data.runningVal
    data.priceVal -= data.principal
    data.resultVal += data.rateCalc

    result.detail.val.everyMonth[i] = data.paysMonth
    result.detail.val.principal[i] = data.principal
    result.detail.val.rate[i] = data.rateCalc
    result.detail.val.balance[i] = data.priceVal

    if (result.detail.val.balance[data.paysNum - 1] !== 0) {
      result.detail.val.everyMonth[data.paysNum - 1] += result.detail.val.balance[data.paysNum - 1]
      result.detail.val.balance[data.paysNum - 1] = 0
    }
  }
}
