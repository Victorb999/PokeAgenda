<template>
  <div class="tipopokemon-div">
    <div class="container">
      <h3>Pokemons</h3>
      <div
        v-if="props.retornoTipo.pokemon.length > 0"
        class="container-lista-pokemon"
      >
        <div
          class="pokemons-lista"
          v-for="(pokemon, index) in props.retornoTipo.pokemon"
          :key="index + 'f'"
        >
          <router-link :to="`/pokemon/${pokemon.pokemon.name}`">
            <img
              :src="state.foto[index]"
              :alt="pokemon.pokemon.name"
              v-if="state.foto[index]"
            />
            <h5>{{ pokemon.pokemon.name }}</h5>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PokeType } from "@/store/interfaces";
import { reactive, defineComponent, PropType, onBeforeMount } from "vue";

export default defineComponent({
  name: "TypePokemon",
  props: {
    retornoTipo: {
      type: Object as PropType<PokeType>,
      required: true,
    },
  },
  setup(props) {
    interface Pokemon {
      foto: Array<string>;
      apistatus: boolean;
    }
    const state = reactive({
      foto: [],
      apistatus: false,
    }) as Pokemon;

    onBeforeMount(() => {
      let numeropoke = 0;
      let palavra = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.retornoTipo.pokemon.map((retorno: any, index) => {
        palavra = retorno.pokemon.url.replace(
          "https://pokeapi.co/api/v2/pokemon/",
          ""
        );
        palavra = palavra.replace("/", "");
        numeropoke = parseInt(palavra);
        if (numeropoke < 10000) {
          state.foto[index] =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`;
        } else {
          state.foto[index] = "https://toyama.com.br/images/imagens.png";
        }
      });
    });

    return {
      props,
      state,
    };
  },
});
</script>
