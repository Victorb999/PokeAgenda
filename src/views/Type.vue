<template>
  <div class="div-busca jumbotron">
    <label for="select-tipo">Select a type: </label>
    <select
      v-model="state.tiposelecionado"
      @change="setaType(state.tiposelecionado)"
      class="select-tipo"
      id="select-tipo"
    >
      <option
        v-for="(tipo, index) in state.tipos"
        :key="index + 1"
        :value="index + 1"
      >
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
  <div v-else-if="state.error" class="poke-error">
    <h3>We couldn't find this type =(</h3>
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
      class="mt-10"
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
import router from "@/router";

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
      error: boolean;
    }
    const state = reactive({
      tipos: [] as Array<PokeType>,
      tiposelecionado: "",
      retornoTipo: {} as PokeType,
      retornou: false,
      msg: "Search a type pokemon.",
      carregado: false,
      error: false,
    }) as Tipos;

    async function retornaTipos() {
      const request = new ApiPokemon();

      await request
        .getTypes()
        .then(response => {
          state.tipos = response.slice(0, response.length - 2); // remove shadow e unknown
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
          if (Object.keys(response).length == 0) {
            state.carregado = false;
            state.msg = "";
            state.retornou = false;
            state.error = true;
          } else {
            state.retornoTipo = response;
            state.msg = "";
            state.retornou = true;
            state.carregado = true;
          }
        })
        .catch(() => {
          state.carregado = false;
          state.msg = "";
          state.retornou = false;
          state.error = true;
        });
    }

    function setaType(id: string) {
      router.push({ name: "PokemonType", params: { id: id } });
    }

    function reset() {
      state.tipos = [] as Array<PokeType>;
      state.tiposelecionado = "";
      state.retornoTipo = {} as PokeType;
      state.retornou = false;
      state.msg = "Search a type pokemon.";
      state.carregado = false;
    }
    onMounted(() => {
      // ...
      if (typeof route.params.id !== "undefined") {
        reset();
        state.tiposelecionado = route.params.id.toString();
        retornaTipo(route.params.id.toString());
      } else {
        reset();
      }
      retornaTipos();
    });

    // watch(
    //   () => state.tiposelecionado,
    //   () => {
    //     reset();
    //     retornaTipo(state.tiposelecionado);
    //   }
    // );
    watch(
      () => route.params,
      async () => {
        state.carregado = false;
        if (typeof route.params.id !== "undefined") {
          reset();
          state.tiposelecionado = route.params.id.toString();
          retornaTipo(route.params.id.toString());
        } else {
          reset();
        }
        retornaTipos();
      }
    );
    return {
      route,
      state,
      retornaTipos,
      retornaTipo,
      setaType,
      reset,
    };
  },
});
</script>
