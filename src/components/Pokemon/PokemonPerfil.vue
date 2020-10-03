<template>
  <div class="container pokemon-main-div">
    <div v-if="state.carregado">
      <div class="titulo">
        <img
          :src="pokeresposta.sprites.front_default"
          :alt="pokeresposta.name"
          v-if="pokeresposta.sprites.front_default"
        />
        <h3 class="pokenome">#{{ pokeresposta.id }} {{ pokeresposta.name }}</h3>
      </div>
      <div class="row">
        <div class="col">
          <div class="pokemon-foto">
            <img
              :src="state.fotourl"
              :alt="pokeresposta.name"
              class="fotogrande"
            />
          </div>
        </div>

        <div class="col">
          <div class="infos" :class="state.tipo[0].type.name">
            <h3>{{ state.alcunha }}</h3>
            <div class="poke-descricao">
              <span v-if="state.descricao">
                <h4>Description</h4>
                {{ state.descricao }}
              </span>
            </div>

            <div class="poke-extrainfo">
              <h5 v-if="state.especie.habitat">
                Habitat: {{ state.especie.habitat.name }}
              </h5>
              <h5 v-if="state.especie.shape">
                Body: {{ state.especie.shape.name }}
              </h5>

              <h5>Height: {{ pokeresposta.height / 10 }} m</h5>
              <h5>Weight: {{ pokeresposta.weight / 10 }} kg</h5>
            </div>
            <div class="poke-tipos">
              <h4>Type</h4>
              <div class="tipos">
                <h4
                  v-for="(tipos, index) in state.tipo"
                  :key="index"
                  class="texto-tipo"
                >
                  <router-link :to="`/tipo/${state.tipo[index].type.name}`">
                    <span class="badge" :class="state.tipo[index].type.name"
                      >{{ state.tipo[index].type.name }}
                    </span>
                  </router-link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <img
        :src="require('@/assets/gifs/pokeball-loading-big.gif')"
        alt="Loading"
        class="pokeloading"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* TODO: 
Especies
types
forms
skills
habilities
graphics
FIXME:
paranaue de alola e forms em geral
*/

import ApiPokemon from "@/core/ApiPokemon.ts";
//import SearchPokemon from "@/components/SearchPokemon.vue"; // @ is an alias to /src
import { reactive, defineComponent, onMounted, watch } from "vue";

export default defineComponent({
  name: "pokemon-perfil",
  props: {
    pokeresposta: Object,
  },
  setup(props) {
    interface Pokemon {
      fotourl: string;
      tipo: Array<string>;
      carregado: boolean;
      especie: Array<string>;
      evolucao: Array<string>;
      evolucoes: Array<string>;
      evolucoesURL: Array<string>;
      descricao: string;
      alcunha: string;
      formas: Array<string>;
    }
    const state = reactive({
      tipo: [],
      fotourl: "",
      especie: [],
      evolucao: [],
      evolucoes: [],
      evolucoesURL: [],
      descricao: "",
      alcunha: "",
      formas: [],
      carregado: false,
    }) as Pokemon;

    function setaImg() {
      if (props.pokeresposta !== undefined) {
        const numero =
          props.pokeresposta.id < 999
            ? ("000" + props.pokeresposta.id).substr(-3)
            : props.pokeresposta.id;
        state.tipo = props.pokeresposta.types;
        if (numero < 1000) {
          state.fotourl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numero}.png`;
        } else {
          state.fotourl = "https://toyama.com.br/images/imagens.png";
        }
        //https://serebii.net/art/th/105-a.png
        //https://serebii.net/pokemon/art/52-g.png
        state.carregado = true;
      } else {
        console.error(" props undefined");
      }
    }

    async function BuscaEspecie() {
      const request = new ApiPokemon();
      if (props.pokeresposta !== undefined) {
        let idspecie = props.pokeresposta.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/","")
        idspecie = idspecie.replace("/", "");
        await request
          .getPokemon(idspecie, "pokemon-species")
          .then((response: any) => {
            state.especie = response;
            response.genera.map((alc: any) => {
              if (alc.language.name === "en") {
                //if (state.alcunha === "") {
                state.alcunha = alc.genus;
                //}
              }
            });

            response.flavor_text_entries.map((desc: any) => {
              if (desc.language.name === "en") {
                if (state.descricao === "") {
                  state.descricao = state.descricao + desc.flavor_text;
                }
              }
            });

            //console.log(response.data.evolution_chain.url)
            // if (response.evolution_chain.url) {
            //   state.buscaEvolucao(response.evolution_chain.url);
            // }
            state.carregado = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.error(" props undefined");
      }
    }

    function reset() {
      state.tipo = [];
      state.fotourl = "";
      state.especie = [];
      state.evolucao = [];
      state.evolucoes = [];
      state.evolucoesURL = [];
      state.descricao = "";
      state.alcunha = "";
      state.formas = [];
      state.carregado = false;
    }
    watch(
      () => props.pokeresposta,
      async params => {
        reset();
        setaImg();
        BuscaEspecie();
      }
    );
    onMounted(() => {
      // ...

      setaImg();
      BuscaEspecie();
    });
    return {
      state,
      setaImg,
      BuscaEspecie,
    };
  },
});
</script>
