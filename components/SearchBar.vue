<template>
  <div
    class="d-flex flex-column-reverse flex-lg-row justify-content-center justify-content-lg-right mb-3"
  >
    <div
      v-if="$store.state.pokemons.searching"
      class="d-flex align-items-center justify-content-center mr-2 mt-4 mt-lg-0"
    >
      <div>
        <span class="font-weight-bold"
          >{{ $store.state.pokemons.count }}&nbsp;</span
        >
        pokemon found!
      </div>
      <b-button
        v-if="$store.state.pokemons.searching"
        variant="outline-danger"
        class="ml-2"
        @click="resetSearch"
        >Reset</b-button
      >
    </div>
    <div>
      <b-form class="d-flex" @submit="searchPokemon">
        <b-form-input
          v-model="searchRequestInput"
          placeholder="Search"
        ></b-form-input>
        <b-button variant="outline-primary" class="ml-2" type="submit"
          >Search</b-button
        >
      </b-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      searchRequestInput: "",
    };
  },

  methods: {
    searchPokemon(event: Event) {
      event.preventDefault();
      this.$store.dispatch(
        "pokemons/searchPokemonByName",
        this.searchRequestInput
      );
    },
    resetSearch() {
      this.searchRequestInput = "";
      this.$store.dispatch("pokemons/resetSearch");
    },
  },
});
</script>
