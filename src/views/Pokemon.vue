<template>
  <div>
    Pokemon
    <span v-if="state.apiOk">
      {{ state.pokeresposta.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, onMounted } from "vue";
import ApiPokemon from "@/core/ApiPokemon.ts";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "pokemon",
  setup() {
    const {
      params: { id }
    } = useRoute();

    interface Pokemon {
      pokemon: string;
      pokeresposta: object;
      apiOk: boolean;
    }
    const state = reactive({
      pokemon: computed(() => id),
      pokeresposta: {},
      apiOk: false
    }) as Pokemon;

    async function BuscaPokemon() {
      const request = new ApiPokemon();

      await request
        .getPokemon(state.pokemon)
        .then(response => {
          state.pokeresposta = response;
          state.apiOk = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
    onMounted(() => {
      // ...
      BuscaPokemon();
    });
    return {
      state,
      BuscaPokemon
    };
  }
});
</script>
