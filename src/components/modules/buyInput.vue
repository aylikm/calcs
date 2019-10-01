<template>
  <div>
    <h2>購入</h2>
    <div class="data">
      <ul>
        <li v-for="(items, key, index) in inputItem" :key="index">
          <p>{{ items.name }}</p>
          <template v-if="key === 'name'">
            <input
              type="text"
              v-model="items.val"
              :placeholder="items.placeholder">
            <p class="error" v-if="items.error">{{ items.error }}を入力してください</p>
          </template>
          <template v-else-if="key === 'rate'">
            <input
              type="number"
              v-model.number="items.val"
              min="0"
              :placeholder="items.placeholder">
            <p>{{ items.unit }}</p>
            <input type="radio" id="1" value="1" v-model="items.payMethod"><label for="1">元利均等</label>
            <input type="radio" id="2" value="2" v-model="items.payMethod"><label for="2">元金均等</label>
            <p class="error" v-if="items.error">{{ items.error }}を入力してください</p>
          </template>
          <template v-else-if="key === 'year'">
            <select v-model="items.val">
              <option v-for="(n, index) in 50" :value="n" :key="index">{{ n }}</option>
            </select>
            <p>{{ items.unit }}</p>
            <p class="error" v-if="items.error">{{ items.error }}を選択してください</p>
          </template>
          <template v-else>
            <input
              type="number"
              v-model.number="items.val"
              min="0"
              :placeholder="items.placeholder">
            <p>{{ items.unit }}</p>
            <p class="error" v-if="items.error">{{ items.error }}を入力してください</p>
          </template>
        </li>
      </ul>
      <button @click="validCheck()">計算</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'buyInput',
  data () {
    return {
      inputItem: this.$store.state.buyStore.buy
    }
  },
  methods: {
    ...mapActions('buyStore', [
      'validCheck'
    ])
  }
}
</script>

<style scoped lang="scss">
.data {
  margin-bottom: 30px;

  li {
    display: flex;
  }
}
.error {
  color: red;
}
</style>
