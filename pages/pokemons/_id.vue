<template>
  <div v-if="pokemon" class="mt-4">
    <h2 class="text-capitalize mb-5 text-center text-lg-left">
      {{ pokemon.name }}
    </h2>

    <div class="row">
      <div
        v-if="pokemon.sprites"
        class="col-12 col-lg-4 d-flex justify-content-center align-items-center"
      >
        <b-img
          v-if="pokemon.sprites.other.dream_world.front_default"
          width="300"
          height="auto"
          :src="`${pokemon.sprites.other.dream_world.front_default}`"
        />

        <div
          v-else
          class="d-flex justify-content-center align-items-center bg-secondary img-fallback"
        >
          <b-img width="75px" src="/favicon.png"></b-img>
        </div>
      </div>
      <div class="col-12 col-lg-8 px-lg-4 mt-5 mt-lg-0">
        <h3 class="text-center text-lg-left">Details</h3>
        <pre v-if="pokemon" class="pokemonDetails w-100">{{
          pokemon | pretty
        }}</pre>
        <b-skeleton v-else class="w-100" height="400"></b-skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PokemonDetails",
  filters: {
    pretty(value: string) {
      return JSON.stringify(value, null, 2);
    },
  },
  layout: "DefaultLayout",
  validate({ params }) {
    return !!params.id;
  },
  asyncData({ params }) {
    const id = params.id;
    return { id };
  },

  data() {
    return {
      pokemon: {},
      id: 0,
    };
  },

  fetch() {
    this.$axios
      .$get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then((pokemon) => {
        this.pokemon = pokemon;
      });
  },
});
</script>
<style lang="scss" scoped>
.pokemonDetails {
  height: 400px;
  overflow-y: scroll;
}
.img-fallback {
  width: 300px;
  height: 300px;
  opacity: 0.3;
}
</style>
