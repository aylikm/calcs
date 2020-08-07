<template>
  <div>
    <rentalInput></rentalInput>
    <rentalResult></rentalResult>
  </div>
</template>

<script>
import rentalInput from '@/components/modules/rentalInput'
import rentalResult from '@/components/modules/rentalResult'

export default {
  components: {
    rentalInput,
    rentalResult
  },
  name: 'rental-Estate'
}
</script>
