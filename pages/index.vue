<template>
  <div class="mt-4">
    <div class="d-flex flex-column flex-lg-row justify-content-between">
      <Pagination />
      <SearchBar />
    </div>
    <div class="row d-flex">
      <b-card
        v-for="pokemon in $store.state.pokemons.pokemons"
        :key="pokemon.name"
        :header="pokemon.name"
        header-class="text-capitalize"
        class="text-center mb-2 py-2 px-2 col-12 col-sm-4 col-lg-3 col-xl-2"
      >
        <div class="mb-4">
          <b-img
            v-if="pokemon.sprite"
            height="80px"
            width="auto"
            :src="pokemon.sprite"
            style="max-width: 100%"
          ></b-img>
          <b-img v-else height="80px" src="/favicon.png"></b-img>
        </div>
        <div class="d-flex justify-content-around">
          <NuxtLink
            :id="`popover-details-${pokemon.id}`"
            class="btn btn-outline-primary rounded-pill"
            :to="`/pokemons/${pokemon.id}`"
            title="Details"
          >
            <b-icon icon="three-dots" aria-hidden="true"></b-icon>
          </NuxtLink>
          <b-popover
            :target="`popover-details-${pokemon.id}`"
            placement="left"
            :title="`Learn more about ${pokemon.name}`"
            triggers="hover"
            content="Click to see details"
          ></b-popover>

          <b-button
            :id="`popover-add-${pokemon.id}`"
            pill
            variant="outline-primary"
            @click="addToPokedex(pokemon)"
          >
            <b-icon icon="plus" aria-hidden="true"></b-icon>
          </b-button>
          <b-popover
            :target="`popover-add-${pokemon.id}`"
            placement="right"
            :title="`Add ${pokemon.name} to your team`"
            triggers="hover"
            content="Click to add it"
          ></b-popover>
        </div>
      </b-card>
    </div>
    <div
      v-if="$store.state.pokemons.fetchingError"
      class="fetchingError d-flex flex-column justify-content-center align-items-center bg-white"
    >
      <h2 clas="mb-4">Error fetching datas :(</h2>
      <b-button variant="outline-danger" @click="closeError"
        >Close &amp; Retry!</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Pokemon } from "~/types/pokemon";

export default Vue.extend({
  name: "PokemonsPage",
  layout: "DefaultLayout",
  methods: {
    addToPokedex(pokemon: Pokemon) {
      this.$store.dispatch("pokedex/addPokemon", pokemon).then(() => {
        (this as any).$bvToast.toast(
          `You just added ${pokemon.name.toUpperCase()} to your team!`,
          {
            title: "Congratulations!",
            autoHideDelay: 4000,
            variant: "success",
          }
        );
      });
    },
    closeError() {
      this.$store.dispatch("pokemons/resetError");
    },
  },
});
</script>
<style lang="scss" scoped>
.fetchingError {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 102;
}
</style>
