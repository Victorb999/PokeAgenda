<template>
  <SearchPokemon />
  <div class="containerpokemon" v-if="state.apiOk">
    <div class="div-resultado jumbotron">
      <PokemonPerfil :pokeresposta="state.pokeresposta" />
    </div>
    <div class="div-habilidades">
      <PokemonAbility />
    </div>
    <div class="div-attacks">
      <PokemonMoves />
    </div>
  </div>
  <div v-else-if="state.error" class="poke-error">
    <h3>We couldn't find this Pokemon =(</h3>
    <p>Try to search another.</p>
    <img
      :src="require('@/assets/gifs/gastly-loading.gif')"
      alt="Loading"
      class="m-10"
    />
  </div>
  <div v-else class="loading">
    <img
      :src="require('@/assets/gifs/pikachu-loading.gif')"
      alt="Loading"
      class="m-10"
    />
  </div>
</template>

<script lang="ts">
import ApiPokemon from "@/core/ApiPokemon";
import SearchPokemon from "@/components/SearchPokemon.vue"; // @ is an alias to /src
import PokemonPerfil from "@/components/Pokemon/PokemonPerfil.vue";
import PokemonAbility from "@/components/Pokemon/PokemonAbility.vue";
import PokemonMoves from "@/components/Pokemon/PokemonMoves.vue";
import { reactive, defineComponent, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/store";
import { Pokedex } from "@/store/interfaces";

export default defineComponent({
  name: "pokemon",
  components: {
    SearchPokemon,
    PokemonPerfil,
    PokemonAbility,
    PokemonMoves,
  },
  setup() {
    // const {
    //   params: { id },
    // } = useRoute();
    const route = useRoute();
    interface Pokemon {
      pokemon: string;
      pokeresposta: Pokedex;
      apiOk: boolean;
      error: boolean;
    }
    const state = reactive({
      pokemon: route.params.id,
      pokeresposta: computed(() => store().pokeresposta.value),
      apiOk: false,
      error: false,
    }) as Pokemon;

    async function BuscaPokemon() {
      const request = new ApiPokemon();

      await request
        .getPokemon(state.pokemon, "pokemon")
        .then((response: Pokedex) => {
          if (Object.keys(response).length === 0) {
            state.apiOk = false;
            state.error = true;
          } else {
            store().setPokeresposta(response);
            state.apiOk = true;
          }
        })
        .catch(() => {
          state.error = true;
        });
    }
    watch(
      () => route.params,
      async params => {
        if (typeof route.params.id !== "undefined") {
          state.pokemon = params.id.toString();
          BuscaPokemon();
        }
      }
    );
    onMounted(() => {
      // ...
      BuscaPokemon();
    });
    return {
      state,
      BuscaPokemon,
    };
  },
});
</script>
