<template>
  <basicmap></basicmap>
</template>
<script>
  import basicmap from '../map/basicMap'
  export default {
    data() {
      return {

      }
    },
    components: {
      basicmap: basicmap,
    },
  }

</script>
<style scoped>
  #infoCss {
    height: 100%;
    width: 100%;
  }
