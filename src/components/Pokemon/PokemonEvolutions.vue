<template>
  <div class="evolucoes-box" :class="color">
    <h1 class="branco">Evolutions</h1>

    <div v-if="evolucoes.length > 0" class="evolucoes-box-container">
      <div
        class="pokemons-lista-evol"
        v-for="(pokemon, index) in evolucoes"
        :key="index + 'f'"
      >
        <router-link :to="`/pokemon/${pokemon}`">
          <img
            :src="state.foto[index]"
            :alt="pokemon"
            v-if="state.foto[index]"
          />
          <h5>{{ pokemon }}</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, watch, onBeforeMount } from "vue";

export default defineComponent({
  name: "Evolutions",
  props: {
    evolucoes: Array,
    evolucoesUrl: Array,
    color: String,
  },
  setup(props) {
    interface Evolution {
      foto: Array<string>;
      apistatus: boolean;
    }
    const state = reactive({
      foto: [],
      apistatus: false,
    }) as Evolution;

    function carregaFoto() {
      if (props.evolucoesUrl !== undefined) {
        let numeropoke = 0;
        props.evolucoesUrl.map((retorno: any, index: number) => {
          let numeroString = retorno.replace(
            "https://pokeapi.co/api/v2/pokemon-species/",
            ""
          );
          numeroString = numeroString.replace("/", "");
          numeropoke = Number(numeroString);
          if (numeropoke < 10090) {
            state.foto[
              index
            ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`;
          } else {
            state.foto[index] = "https://toyama.com.br/images/imagens.png";
          }
        });
      }
    }
    onBeforeMount(() => {
      // ...
      carregaFoto();
    });
    watch(
      () => props.evolucoes,
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
