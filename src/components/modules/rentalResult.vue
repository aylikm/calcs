<template>
  <div class="result">
    <div v-for="(datas, key, index) in rentalResult" :key="index">
      <div class="result_item_contents">
        <ul class="result_item_list">
          <li v-for="(datasVal, datasKey, datasIndex) in datas" :key="datasIndex">
            <template v-if="datasKey == 'name'">
              {{ datasVal.name }} : {{ datasVal.val }}
            </template>
            <template v-else-if="datasKey !== 'RenewelFeeSum'">
              {{ datasVal.name }} : {{ (datasVal.val).toLocaleString() }} {{ datasVal.unit }}
            </template>
            <template v-else-if="datasVal.show === true">
              {{ datasVal.name }} : {{ (datasVal.val).toLocaleString() }} {{ datasVal.unit }}
            </template>
          </li>
        </ul>
      </div>
      <div class="result_button">
        <button @click="delData(key)">削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'rentalResult',
  data () {
    return {
      rentalResult: this.$store.state.rentalStore.rentalResultList
    }
  },
  created () {
    if (localStorage.getItem('rentalEstate')) {
      this.alreadyDatas()
    }
  },
  methods: {
    ...mapActions('rentalStore', [
      'delData',
      'alreadyDatas'
    ])
  }
}
</script>

<style scoped lang="scss">
.result {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 500px);
  grid-gap: 30px 20px;
}
.result_item_contents {
  display: grid;
  grid-template-columns: repeat(auto-fill, 50%);
}
.result_item_list {
  word-break: break-all;
}
.result_button {
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
