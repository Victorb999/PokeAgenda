<template>
  <SearchPokemon />
  <div class="containerpokemon" v-if="state.apiOk">
    <div class="div-resultado jumbotron">
      <PokemonPerfil :pokeresposta="state.pokeresposta" />
      <PokemonEvolutions :pokeresposta="state.pokeresposta" />
    </div>
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
import ApiPokemon from "@/core/ApiPokemon.ts";
import SearchPokemon from "@/components/SearchPokemon.vue"; // @ is an alias to /src
import PokemonPerfil from "@/components/Pokemon/PokemonPerfil.vue";
import PokemonEvolutions from "@/components/Pokemon/PokemonEvolutions.vue";
import { reactive, defineComponent, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/store";

export default defineComponent({
  name: "pokemon",
  components: {
    SearchPokemon,
    PokemonPerfil,
    PokemonEvolutions
  },
  setup() {
    // const {
    //   params: { id },
    // } = useRoute();

    const route = useRoute();
    interface Pokemon {
      pokemon: string;
      pokeresposta: object;
      apiOk: boolean;
    }
    const state = reactive({
      pokemon: route.params.id,
      pokeresposta: computed(() => store().pokeresposta.value),
      apiOk: false
    }) as Pokemon;

    async function BuscaPokemon() {
      const request = new ApiPokemon();

      await request
        .getPokemon(state.pokemon, "pokemon")
        .then(response => {
           store().setPokeresposta(response);
          state.apiOk = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
    watch(
      () => route.params,
      async params => {
        state.pokemon = params.id.toString();
        BuscaPokemon();
      }
    );
    onMounted(() => {
      // ...
      BuscaPokemon();
    });
    return {
      state,
      BuscaPokemon
    };
  },
});
</script>
