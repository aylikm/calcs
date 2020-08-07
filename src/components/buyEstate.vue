<template>
  <div>
    <buyInput></buyInput>
    <buyResult></buyResult>
  </div>
</template>

<script>
import buyInput from '@/components/modules/buyInput'
import buyResult from '@/components/modules/buyResult'

export default {
  components: {
    buyInput,
    buyResult
  },
  name: 'buy-Estate'
}
</script>
