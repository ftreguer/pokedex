<template>
  <div class="row">
    <b-sidebar
      id="pokedex"
      title="My Team"
      shadow
      class="d-flex flex-column"
      lazy
    >
      <div
        v-for="(pokemon, index) in $store.state.pokedex.team"
        :key="index"
        class="d-flex flex-row justify-content-between px-3 py-3 team-item"
      >
        <div class="w-70 d-flex align-items-center">
          <b-img v-if="pokemon.sprite" :src="pokemon.sprite" width="50"></b-img>
          <b-img v-else height="50px" src="/favicon.png"></b-img>
          <span class="text-capitalize font-weight-bold ml-3">{{
            pokemon.name
          }}</span>
        </div>
        <div class="w-30 d-flex align-items-center">
          <NuxtLink class="btn" :to="`/pokemons/${pokemon.id}`" title="Details">
            <b-icon class="text-primary" icon="three-dots"></b-icon>
          </NuxtLink>
          <b-button variant="transparent" @click="remove(pokemon, index)">
            <b-icon class="text-danger" icon="trash"></b-icon>
          </b-button>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Pokemon } from "~/types/pokemon";

export default Vue.extend({
  name: "PokedexMyTeam",
  methods: {
    remove(pokemon: Pokemon, index: number) {
      this.$store.dispatch("pokedex/removePokemonAtIndex", index).then(() => {
        (this as any).$bvToast.toast(
          `You just removed ${pokemon.name.toUpperCase()} from your team!`,
          {
            title: `Bye bye ${pokemon.name}!`,
            autoHideDelay: 4000,
            variant: "info",
          }
        );
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.team-item:not(:last-child) {
  border-bottom: solid 1px grey;
}
</style>
