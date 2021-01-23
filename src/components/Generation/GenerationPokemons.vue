<template>
  <div class="tipopokemon-div">
    <div class="container">
      <h3>Pokemon species</h3>
      <div
        v-if="typeof state.retornoGeneration !== 'unedefined'"
        class="container-lista-pokemon"
      >
        <div
          class="pokemons-lista"
          v-for="(pokemon, index) in sortArrays(state.pokemoncompleto)"
          :key="index + 'f'"
        >
          <router-link :to="`/pokemon/${pokemon.numero}`">
            <img :src="pokemon.foto" :alt="pokemon.nome" v-if="pokemon.foto" />
            <h6># {{ pokemon.numero }}</h6>
            <h5>{{ pokemon.nome }}</h5>
          </router-link>
          <!-- {{pokemon}} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PokeGeneration } from "@/store/interfaces";
import { reactive, defineComponent, PropType, onBeforeMount } from "vue";
export default defineComponent({
  name: "GenerationPokemons",
  props: {
    retornoGeneration: {
      type: Object as PropType<PokeGeneration>,
      required: true,
    },
  },
  setup(props) {
    interface ArrayPoke {
      numero: number;
      foto: string;
      nome: string;
    }

    interface Pokemon {
      foto: Array<string>;
      apistatus: boolean;
      numero: Array<number>;
      pokemoncompleto: Array<ArrayPoke>;
    }
    const state = reactive({
      foto: [],
      apistatus: false,
      numero: [],
      pokemoncompleto: [],
    }) as Pokemon;

    onBeforeMount(() => {
      let numeropoke = 0;
      let palavra = "";
      let arraypoke = {} as ArrayPoke;
      props.retornoGeneration.pokemon_species
        .slice()
        .reverse()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((retorno: any, index) => {
          palavra = retorno.url.replace(
            "https://pokeapi.co/api/v2/pokemon-species/",
            ""
          );
          palavra = palavra.replace("/", "");
          numeropoke = parseInt(palavra);
          state.numero[index] = numeropoke;
          if (numeropoke < 10090) {
            state.foto[
              index
            ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`;
          } else {
            state.foto[index] = "https://toyama.com.br/images/imagens.png";
          }
          arraypoke.numero = numeropoke;
          arraypoke.foto = state.foto[index];
          arraypoke.nome = retorno.name;
          //console.log(arraypoke)
          state.pokemoncompleto = [...state.pokemoncompleto, arraypoke];
          arraypoke = {} as ArrayPoke;
        });
    });

    function sortArrays(arrays: Array<ArrayPoke>) {
      return arrays.sort((a, b) => a.numero - b.numero);
      //return _.orderBy(arrays, "numero", "asc");
    }
    return {
      props,
      state,
      sortArrays,
    };
  },
});
</script>
