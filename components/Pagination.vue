<template>
  <div class="d-flex justify-content-center justify-content-lg-left">
    <b-pagination
      v-if="!$store.state.pokemons.searching"
      v-model="currentPage"
      :total-rows="$store.state.pokemons.count"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @change="onPageChange"
    ></b-pagination>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PokemonsPagination",
  data() {
    return {
      page: 1,
      currentPage: 1,
      perPage: 100,
    };
  },

  fetch() {
    this.fetchPokemons();
  },

  computed: {
    offset() {
      return (this.$data.page - 1) * 100;
    },
  },

  methods: {
    onPageChange(pageNumber: number) {
      this.page = pageNumber;
      this.fetchPokemons();
    },
    fetchPokemons() {
      this.$store.dispatch("pokemons/loadPokemonsForPage", this.page);
    },
  },
});
</script>
