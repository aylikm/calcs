<template>
  <div>
    <h2>賃貸</h2>
    <div class="data">
      <ul>
        <li v-for="(items, key, index) in inputItem" :key="index">
          <template v-if="key !== 'addRenewelFee'">
            <p>{{ items.name }}</p>
            <template v-if="key === 'name'">
              <input
                type="text"
                v-model="items.val"
                :placeholder="items.placeholder">
              <p class="error" v-if="items.error">{{ items.error }}を入力してください</p>
            </template>
            <template v-else-if="key === 'price'">
              <input
                type="number"
                v-model.number="items.val"
                min="1"
                :placeholder="items.placeholder">
              <p>{{ items.unit }}</p>
              <p class="error" v-if="items.error">{{ items.error }}を入力してください</p>
            </template>
            <template v-else-if="key === 'admin'">
              <input
                type="number"
                v-model.number="items.val"
                min="0"
                :placeholder="items.placeholder">
              <p>{{ items.unit }}</p>
              <p class="error" v-if="items.error">{{ items.error }}を入力してください</p>
            </template>
            <template v-else-if="key === 'year'">
              <select v-model="items.val">
                <option v-for="(n, index) in 50" :value="n" :key="index">{{ n }}</option>
              </select>
              <p>{{ items.unit }}</p>
              <p class="error" v-if="items.error">{{ items.error }}を選択してください</p>
            </template>
            <template v-else-if="key === 'month'">
              <select v-model="items.val">
                <option v-for="(n, index) in 12" :value="n - 1" :key="index">{{ n - 1 }}</option>
              </select>
              <p>{{ items.unit }}</p>
              <p class="error" v-if="items.error">{{ items.error }}を選択してください</p>
            </template>
            <template v-else>
              <select v-model="items.val">
                <option v-for="(n, index) in 13" :value="n - 1" :key="index">{{ n - 1 }}</option>
              </select>
              <p>{{ items.unit }}</p>
              <p class="error" v-if="items.error">{{ items.error }}を選択してください</p>
            </template>
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
  name: 'rentalInput',
  data () {
    return {
      inputItem: this.$store.state.rentalStore.rental
    }
  },
  methods: {
    ...mapActions('rentalStore', [
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
