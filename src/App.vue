<template>
  <div id="app">
    <button><router-link to="/buyEstate">Buy</router-link></button>
    <button><router-link to="/rentalEstate">Rental</router-link></button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  font-family: "Yu Gothic", YuGothic, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Verdana, Meiryo, sans-serif;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
