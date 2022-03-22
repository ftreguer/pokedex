import { VuexPersistence } from "vuex-persist";
import { Store } from "vuex";
import { PokemonsState } from "~/store/pokemons";
import { PokedexState } from "~/store/pokedex";

export interface State {
  pokemons: PokemonsState;
  pokedex: PokedexState;
}

export default ({ store }: { store: Store<State> }) => {
  new VuexPersistence({
    modules: ["pokedex"], // only persist pokedex
  }).plugin(store);
};
