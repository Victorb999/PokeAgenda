<template>
  <div class="div-busca jumbotron">
    <label for="select-tipo">Select a generation: </label>
    <select
      v-model="state.generationSelected"
      @change="setaGeneration(state.generationSelected)"
      class="select-tipo"
      id="select-tipo"
    >
      <option
        v-for="(gen, index) in state.generation"
        :key="index + 1"
        :value="index + 1"
      >
        {{ gen.name }}
      </option>
    </select>
  </div>

  <div class="msg-box-container container">
    <h4>{{ state.msg }}</h4>
    <h1>{{ state.retornoGeneration.name }}</h1>
  </div>
  <div class="containerpokemon" v-if="state.carregado">
    <div class="generation-box-container" v-if="state.retornou">
      <generation-pokemons :retornoGeneration="state.retornoGeneration" />
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
import { reactive, defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ApiPokemon from "@/core/ApiPokemon.ts";
import { PokeGeneration } from "@/store/interfaces";
import GenerationPokemons from "@/components/Generation/GenerationPokemons.vue";
import router from "@/router";

export default defineComponent({
  components: { GenerationPokemons },
  name: "Generation",
  setup() {
    const route = useRoute();

    interface Generation {
      generation: Array<PokeGeneration>;
      generationSelected: string;
      retornoGeneration: PokeGeneration;
      retornou: boolean;
      msg: string;
      carregado: boolean;
    }
    const state = reactive({
      generation: [] as Array<PokeGeneration>,
      generationSelected: "",
      retornoGeneration: {} as PokeGeneration,
      retornou: false,
      msg: "Search a generation.",
      carregado: false,
    }) as Generation;

    async function retornaGenerations() {
      const request = new ApiPokemon();

      await request
        .getGenerations()
        .then(response => {
          state.generation = response; // remove shadow e unknown
          state.carregado = true;
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function retornaGeneration(id: string) {
      const request = new ApiPokemon();

      await request
        .getGeneration(id, "generation")
        .then(response => {
          state.retornoGeneration = response;
          state.msg = "";
          state.retornou = true;
          state.carregado = true;
        })
        .catch(err => {
          console.log(err);
        });
    }

    function reset() {
      state.generation = [] as Array<PokeGeneration>;
      state.generationSelected = "";
      state.retornoGeneration = {} as PokeGeneration;
      state.retornou = false;
      state.msg = "Search a generation.";
      state.carregado = false;
    }

    function setaGeneration(id: string) {
      router.push({ name: "PokemonGeneration", params: { id: id } });
    }

    onMounted(() => {
      // ...
      if (typeof route.params.id !== "undefined") {
        reset();
        state.generationSelected = route.params.id.toString();
        retornaGeneration(route.params.id.toString());
      } else {
        reset();
      }
      retornaGenerations();
    });

    // watch(
    //   () => state.generationSelected,
    //   () => {
    //     state.carregado = false;
    //     state.retornoGeneration = {} as PokeGeneration;
    //     state.retornou = false;
    //     state.msg = "Search for a generation.";
    //     retornaGeneration(state.generationSelected + 1);
    //   }
    // );
    watch(
      () => route.params,
      async () => {
        state.carregado = false;
        if (typeof route.params.id !== "undefined") {
          reset();
          state.generationSelected = route.params.id.toString();
          retornaGeneration(route.params.id.toString());
        } else {
          reset();
        }
        retornaGenerations();
      }
    );

    return {
      route,
      state,
      retornaGeneration,
      retornaGenerations,
      setaGeneration,
      reset,
    };
  },
});
</script>
