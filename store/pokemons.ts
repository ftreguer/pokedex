import { ActionContext } from "vuex";
import { State } from "~/plugins/vuex-persist";
import { Pokemon } from "~/types/pokemon";

const API_LIMIT: number = 100;

export interface PokemonsState {
  pokemons: Pokemon[];
  fullList: Pokemon[][];
  count: number;
  loading: boolean;
  fetchingError: boolean;
  searching: boolean;
}

export const state = (): PokemonsState => ({
  pokemons: [],
  fullList: [],
  count: 0,
  loading: false,
  fetchingError: true,
  searching: false,
});

export const mutations = {
  setCurrentPokemonList(state: PokemonsState, pokemonsList: Pokemon[]) {
    state.pokemons = pokemonsList;
  },
  setPokemonListPage(
    state: PokemonsState,
    { pokemonsList, index }: { pokemonsList: Pokemon[]; index: number }
  ) {
    state.fullList[index] = pokemonsList;
  },
  initState(state: PokemonsState, count: number) {
    state.count = count;
    state.fullList = Array(Math.ceil(count / API_LIMIT)).fill([], 0);
  },
  setCount(state: PokemonsState, count: number) {
    state.count = count;
  },
  setLoading(state: PokemonsState, loading: boolean) {
    state.loading = loading;
  },
  setFetchingError(state: PokemonsState, fetchingError: boolean) {
    state.fetchingError = fetchingError;
  },
  setSearching(state: PokemonsState, searching: boolean) {
    state.searching = searching;
  },
};

export const actions = {
  async loadPokemonsForPage(
    context: ActionContext<PokemonsState, State>,
    pageNumber: number
  ) {
    context.commit("setLoading", true);
    context.commit("setFetchingError", false);
    await loadPage((this as any).$axios, context, pageNumber);
    context.commit("setLoading", false);
  },

  async searchPokemonByName(
    context: ActionContext<PokemonsState, State>,
    name: string
  ) {
    context.commit("setSearching", true);
    context.commit("setLoading", true);
    await loadAllPages((this as any).$axios, context);
    await searchPokemonsByName(context, name);
    context.commit("setLoading", false);
  },

  async resetSearch(context: ActionContext<PokemonsState, State>) {
    context.commit("setLoading", true);
    await loadPage((this as any).$axios, context, 1);
    context.commit("setCount", 1400);
    context.commit("setSearching", false);
    context.commit("setLoading", false);
  },
  resetError(context: ActionContext<PokemonsState, State>) {
    context.commit("setFetchingError", false);
  },
};

function loadPage(
  axios: any,
  context: ActionContext<PokemonsState, State>,
  pageNumber: number,
  setCurrent: boolean = true
) {
  if (context.state.fullList[pageNumber - 1]?.length) {
    if (setCurrent) {
      context.commit(
        "setCurrentPokemonList",
        context.state.fullList[pageNumber - 1]
      );
    }
  } else {
    return axios
      .$get(
        `https://pokeapi.co/api/v2/pokemon?limit=${API_LIMIT}&offset=${
          (pageNumber - 1) * API_LIMIT
        }`
      )
      .then(async (results: any) => {
        if (!context.state.count) {
          context.commit("initState", results.count);
        }
        const promises = results.results.map(async (result: any) => {
          // Ugly, TODO : fix axios not found
          const details = await axios.$get(result.url);
          const matchingResult = /^.*\/(\d+)\/?$/.exec(result.url);
          const id = matchingResult ? matchingResult[1] : undefined;
          return {
            name: result.name,
            id,
            sprite: details.sprites.other.dream_world.front_default,
          };
        });
        // TODO resolve promise per batch to prevent 429
        const pokemons = await Promise.all(promises);
        if (setCurrent) {
          context.commit("setCurrentPokemonList", pokemons);
        }
        context.commit("setPokemonListPage", {
          pokemonsList: pokemons,
          index: pageNumber - 1,
        });
      })
      .catch((e: any) => {
        context.commit("setFetchingError", e.message);
      });
  }
}

function loadAllPages(
  axios: any,
  context: ActionContext<PokemonsState, State>
) {
  const loadingPromises = context.state.fullList
    .map((list: Pokemon[] | undefined, index: number) => {
      if (!list?.length) {
        return loadPage(axios, context, index + 1, false);
      }
      return undefined;
    })
    .filter((p: { message: string }) => !!p);

  return Promise.all(loadingPromises);
}

function searchPokemonsByName(
  context: ActionContext<PokemonsState, State>,
  name: string
) {
  const results = context.state.fullList.reduce(
    (res: Pokemon[], list: Pokemon[]) => {
      return [...res, ...list.filter((pokemon) => pokemon.name.includes(name))];
    },
    []
  );

  context.commit("setCurrentPokemonList", results);
  context.commit("setCount", results.length);
}
