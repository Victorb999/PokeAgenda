<template>
  <div class="div-busca jumbotron">
    <label for="select-tipo">Select a type: </label>
    <select
      v-model="state.tiposelecionado"
      @change="retornaTipo(state.tiposelecionado + 1)"
      class="select-tipo"
      id="select-tipo"
    >
      <option v-for="(tipo, index) in state.tipos" :key="index" :value="index">
        {{ tipo.name }}
      </option>
    </select>
  </div>

  <div class="msg-box-container container">
    <h4>{{ state.msg }}</h4>
    <h1>{{ state.retornoTipo.name }}</h1>
  </div>
  <div class="containerpokemon" v-if="state.carregado">
    <div class="tipos-box-container" v-if="state.retornou">
      <type-relation :retornoTipo="state.retornoTipo" />
      <type-moves :retornoTipo="state.retornoTipo" />
      <type-pokemons :retornoTipo="state.retornoTipo" />
    </div>
  </div>
  <div v-else class="loading">
    <img
      :src="require('@/assets/gifs/pikachu-loading.gif')"
      alt="Loading"
      class="pokeloading"
    />
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ApiPokemon from "@/core/ApiPokemon.ts";
import { PokeType } from "@/store/interfaces";
import TypeRelation from "@/components/Type/TypeRelation.vue";
import TypeMoves from "@/components/Type/TypeMoves.vue";
import TypePokemons from "@/components/Type/TypePokemons.vue";

export default defineComponent({
  components: { TypeRelation, TypeMoves, TypePokemons },
  name: "Types",
  setup() {
    const route = useRoute();

    interface Tipos {
      tipos: Array<PokeType>;
      tiposelecionado: string;
      retornoTipo: PokeType;
      retornou: boolean;
      msg: string;
      carregado: boolean;
    }
    const state = reactive({
      tipos: [] as Array<PokeType>,
      tiposelecionado: "",
      retornoTipo: {} as PokeType,
      retornou: false,
      msg: "Search a type pokemon.",
      carregado: false,
    }) as Tipos;

    async function retornaTipos() {
      const request = new ApiPokemon();

      await request
        .getTypes()
        .then(response => {
          state.tipos = response.slice(0, response.length - 2); // remove shadow e unknown
          state.carregado = true;
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function retornaTipo(id: string) {
      const request = new ApiPokemon();

      await request
        .getType(id, "type")
        .then(response => {
          state.retornoTipo = response;
          state.msg = "";
          state.retornou = true;
          state.carregado = true;
        })
        .catch(err => {
          console.log(err);
        });
    }

    onMounted(() => {
      // ...
      if (typeof route.params.id !== "undefined") {
        state.tiposelecionado = route.params.id.toString();
        retornaTipo(route.params.id.toString());
      }
      retornaTipos();
    });

    watch(
      () => state.tiposelecionado,
      () => {
        state.carregado = false;
        state.retornoTipo = {} as PokeType;
        state.retornou = false;
        state.msg = "Search for a generation.";
        retornaTipo(state.tiposelecionado + 1);
      }
    );
    watch(
      () => route.params,
      async () => {
        state.carregado = false;
        state.tiposelecionado = route.params.id.toString();
        retornaTipo(route.params.id.toString());
      }
    );
    return {
      route,
      state,
      retornaTipos,
      retornaTipo,
    };
  },
});
</script>
