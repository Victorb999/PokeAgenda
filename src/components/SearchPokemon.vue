<template>
  <div class="pokeagenda-box-container">
    <div class="div-busca jumbotron">
      <form @submit.prevent="BuscaPokemon()">
        <input
          id="inline-form-input-name"
          type="text"
          placeholder="Enter a Pokemon"
          class="form-control search-input"
          v-model="state.pokemon"
        />
        <div class="search-buttons">
          <button
            type="submit"
            class="btn btn-primary branco"
            @click="BuscaPokemon()"
          >
            Buscar
          </button>
          <button type="reset" class="btn btn-danger">Reset</button>
          <button
            title="Search for a random pokemon"
            placement="bottom"
            type="button"
            class="btn branco btn-warning"
            @click="BuscaRandom()"
          >
            Random
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "Home",
  setup() {
    interface Pokemon {
      pokemon: string;
    }
    const state = reactive({
      pokemon: ""
    }) as Pokemon;

    function BuscaRandom() {
      const min = Math.ceil(1);
      const max = Math.floor(807);
      const random: number = Math.floor(Math.random() * (max - min)) + min;
      const random2: string = random.toString();
      state.pokemon = random2;
      router.push({ name: "Pokemon", params: { id: state.pokemon } });
    }
    function BuscaPokemon() {
      router.push({ name: "Pokemon", params: { id: state.pokemon } });
    }

    return {
      state,
      BuscaRandom,
      BuscaPokemon
    };
  },
});
</script>
