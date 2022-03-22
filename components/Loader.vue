<template>
  <div
    v-if="loading"
    class="spinnerContainer w-100 h-100 d-flex justify-content-center align-items-center bg-white"
  >
    <b-spinner variant="primary" label="Spinning"></b-spinner>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PageLoader",

  computed: {
    loading() {
      return this.$store.state.pokemons.loading;
    },
  },
});
</script>
<style lang="scss" scoped>
.spinnerContainer {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  z-index: 101;
}
</style>
