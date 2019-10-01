<template>
  <div>
    <button @click="showModal = true">詳細</button>
    <transition name="modal">
      <div class="modal" v-if="showModal">
        <div class="modal-overlay" @click="showModal = false"></div>
        <div class="modal-wrap">
          <div class="modal-container">
            <table>
              <thead>
                <tr>
                  <th>回数</th>
                  <th>支払額/月<br><span>（管理費、修繕費含む）</span></th>
                  <th>元金分</th>
                  <th>金利分</th>
                  <th>残金</th>
                </tr>
              </thead>
              <tr v-for="(val, valIndex) in detailVal.detail.val.everyMonth" :key="valIndex">
                <td>{{ valIndex + 1 }}</td>
                <td v-for="(items, itemsIndex) in detailVal.detail.val" :key="itemsIndex">{{ (items[valIndex]).toLocaleString() }}</td>
              </tr>
            </table>
            <div class="modal-close-wrap">
              <button class="modal-close" @click="showModal = false"></button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['detailVal'],
  name: 'modal',
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  background: rgba(0, 0, 0, .3);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.modal-wrap {
  position: fixed;
  height: 50%;
  z-index: 101;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-container {
  height: 100%;
  background: #fff;
  overflow-y: auto;
}
.modal-close-wrap {
  position: absolute;
  top: -30px;
  right: 5px;
}
.modal-close {
  width: 20px;
  height: 20px;
  position: relative;
  appearance: none;
  border: none;
  background: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 1px;
    background-color: #333;
  }
  &:before {
    transform: rotateZ(-45deg);
  }
  &:after {
    transform: rotateZ(45deg);
  }
}
// オーバーレイのトランジション
.modal-enter-active,
.modal-leave-active {
  transition: opacity .5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
table {
  text-align: center;

  thead {
    background: #ddd;
    line-height: 1;
  }
  th {
    padding: 10px;

    span {
      font-size: 12px;
    }
  }
  tr:nth-child(even) {
    background: #eee;
  }
  td {
    padding: 10px;
  }
}
</style>
