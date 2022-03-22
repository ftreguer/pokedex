import { ActionContext } from "vuex";
import { State } from "~/plugins/vuex-persist";

import { Pokemon } from "~/types/pokemon";

export interface PokedexState {
  team: Pokemon[];
}

export const state = (): PokedexState => ({
  team: [],
});

export const mutations = {
  add(state: PokedexState, pokemon: Pokemon) {
    state.team.push(pokemon);
  },
  remove(state: PokedexState, index: number) {
    state.team.splice(index, 1);
  },
};

export const actions = {
  addPokemon(context: ActionContext<PokedexState, State>, pokemon: Pokemon) {
    context.commit("add", pokemon);
  },
  removePokemonAtIndex(
    context: ActionContext<PokedexState, State>,
    index: number
  ) {
    context.commit("remove", index);
  },
};
