<template>
  <div class="result">
    <div v-for="(datas, key, index) in buyResultList" :key="index" class="result_item">
      <div class="result_item_contents">
        <ul class="result_item_list">
          <li v-for="(datasVal, datasKey, datasIndex) in datas" :key="datasIndex">
            <template v-if="datasKey === 'name'">
              {{ datasVal.name }} : {{ datasVal.val }}
            </template>
            <template v-else-if="datasKey !== 'detail'">
              {{ datasVal.name }} : {{ (datasVal.val).toLocaleString() }} {{ datasVal.unit }}
            </template>
          </li>
        </ul>
      </div>
      <div class="result_button">
        <modal :detailVal="datas"></modal>
        <button @click="delData(key)">削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import modal from './modals/modal'
import { mapActions } from 'vuex'
export default {
  components: {
    modal
  },
  name: 'buyResult',
  data () {
    return {
      buyResultList: this.$store.state.buyStore.buyResultList
    }
  },
  created () {
    if (localStorage.getItem('buyEstate')) {
      this.alreadyDatas()
    }
  },
  methods: {
    ...mapActions('buyStore', [
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
