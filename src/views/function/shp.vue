<template>
  <basicmap ref="map"></basicmap>
</template>
<script>
  import basicmap from '../map/basicMap'
  export default {
    data() {
      return {
        map: null,
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.map = this.$store.state.map
      },
    },
    components: {
      basicmap: basicmap,
    },
  }

</script>
