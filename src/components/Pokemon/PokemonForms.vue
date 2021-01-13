<template>
  <div class="formas-box" :class="color">
    <h1 class="branco">Forms</h1>

    <div v-if="variedades.length > 0" class="evolucoes-box-container">
      <div
        class="pokemons-lista-evol"
        v-for="(pokemon, index) in variedades"
        :key="index + 'f'"
      >
        <router-link :to="`/pokemon/${pokemon.pokemon.name}`">
          <img
            :src="state.foto[index]"
            :alt="pokemon"
            v-if="state.foto[index]"
          />
          <h5>{{ pokemon.pokemon.name }}</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, watch, onBeforeMount } from "vue";

export default defineComponent({
  name: "Forms",
  props: {
    variedades: {
      type: Array,
      required: true,
    },
    color: String,
  },
  setup(props) {
    interface Form {
      foto: Array<string>;
      carregado: boolean;
      id: string;
    }
    const state = reactive({
      foto: [],
      carregado: false,
      id: "",
    }) as Form;

    function carregaId1() {
      if (typeof props.variedades !== undefined) {
        // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const variedades: Array<any> = props.variedades;
        let numeroString = variedades[0].pokemon.url.replace(
          "https://pokeapi.co/api/v2/pokemon/",
          ""
        );
        numeroString = numeroString.replace("/", "");
        state.id = numeroString;
      }
    }

    function carregaFoto() {
      if (props.variedades !== undefined) {
        let numeropoke = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props.variedades.map((retorno: any, index: number) => {
          let numeroString = retorno.pokemon.url.replace(
            "https://pokeapi.co/api/v2/pokemon/",
            ""
          );
          numeroString = numeroString.replace("/", "");
          numeropoke = Number(numeroString);
          if (numeropoke < 10090) {
            state.foto[
              index
            ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`;
          } else if (retorno.pokemon.name.includes("alola")) {
            carregaId1();
            state.foto[
              index
            ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${state.id}-alola.png`;
          } else {
            state.foto[index] = "https://toyama.com.br/images/imagens.png";
          }
          state.carregado = true;
        });
      }
    }

    onBeforeMount(() => {
      // ...
      carregaFoto();
    });
    watch(
      () => props.variedades,
      () => {
        carregaFoto();
      }
    );
    return {
      state,
      carregaFoto,
    };
  },
});
</script>
