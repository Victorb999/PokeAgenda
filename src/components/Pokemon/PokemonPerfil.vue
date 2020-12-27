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
                <!-- eslint-disable-next-line no-irregular-whitespace-->
                {{ state.descricao.replace("", "") }}
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
      <div class="row">
        <div class="col">
          <PokemonStatus
            v-if="pokeresposta.stats.length > 1"
            :pokeresposta="pokeresposta.stats"
            :color="pokeresposta.types"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <PokemonEvolutions
            v-if="state.evolucoes.length > 1"
            :evolucoes="state.evolucoes"
            :evolucoesUrl="state.evolucoesURL"
            :color="state.tipo[0].type.name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <PokemonForms
            :variedades="state.especie.varieties"
            v-if="variedadevalido()"
            :color="state.tipo[0].type.name"
          />
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
import PokemonEvolutions from "@/components/Pokemon/PokemonEvolutions.vue";
import PokemonForms from "@/components/Pokemon/PokemonForms.vue";
import PokemonStatus from "@/components/Pokemon/PokemonStatusList.vue";
//import SearchPokemon from "@/components/SearchPokemon.vue"; // @ is an alias to /src
import { reactive, defineComponent, onMounted, watch } from "vue";

export default defineComponent({
  name: "pokemon-perfil",
  components: {
    PokemonEvolutions,
    PokemonForms,
    PokemonStatus
  },
  props: {
    pokeresposta: Object
  },
  setup(props) {
    interface Pokemon {
      fotourl: string;
      tipo: Array<string>;
      carregado: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      especie: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      evolucao: any;
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
      carregado: false
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
        } else if (props.pokeresposta.name.includes("alola")) {
          //console.log(props.pokeresposta.species.url);
          let numeroPoke = props.pokeresposta.species.url.replace(
            "https://pokeapi.co/api/v2/pokemon-species/",
            ""
          );
          numeroPoke = numeroPoke.replace("/", "");
          state.fotourl = `https://serebii.net/art/th/${numeroPoke}-a.png`;
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
    function setaEvolucao() {
      if (state.evolucao) {
        try {
          state.evolucoes = [
            ...state.evolucoes,
            state.evolucao.chain.species.name
          ];
          state.evolucoesURL = [
            ...state.evolucoesURL,
            state.evolucao.chain.species.url
          ];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.evolucao.chain.evolves_to.map((ev: any, index: number) => {
            state.evolucoes = [...state.evolucoes, ev.species.name];
            state.evolucoesURL = [...state.evolucoesURL, ev.species.url];

            if (ev.evolves_to.length > 0) {
              state.evolucoes = [
                ...state.evolucoes,
                ev.evolves_to[index].species.name
              ];
              state.evolucoesURL = [
                ...state.evolucoesURL,
                ev.evolves_to[index].species.url
              ];
            }
          });
        } catch (err) {
          state.evolucoes = [];
        }
      }
    }

    async function buscaEvolucao(id: string) {
      const request = new ApiPokemon();
      await request
        .getPokemon(id, "evolution-chain")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          state.evolucao = response;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          state.evolucao = [{ erro: err }];
        });
    }

    async function BuscaEspecie() {
      const request = new ApiPokemon();
      if (props.pokeresposta !== undefined) {
        let idspecie = props.pokeresposta.species.url.replace(
          "https://pokeapi.co/api/v2/pokemon-species/",
          ""
        );
        idspecie = idspecie.replace("/", "");
        await request
          .getPokemon(idspecie, "pokemon-species")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((response: any) => {
            state.especie = response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.genera.map((alc: any) => {
              if (alc.language.name === "en") {
                //if (state.alcunha === "") {
                state.alcunha = alc.genus;
                //}
              }
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.flavor_text_entries.map((desc: any) => {
              if (desc.language.name === "en") {
                if (state.descricao === "") {
                  state.descricao = state.descricao + desc.flavor_text;
                }
              }
            });

            //console.log(response.evolution_chain.url)
            if (response.evolution_chain.url) {
              let idChain: string = response.evolution_chain.url.replace(
                "https://pokeapi.co/api/v2/evolution-chain/",
                ""
              );
              idChain = idChain.replace("/", "");
              buscaEvolucao(idChain);
            }
            state.carregado = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.error(" props undefined");
      }
    }

    function variedadevalido() {
      if (typeof state.especie.varieties === "undefined") {
        return false;
      } else if (state.especie.varieties.length === 1) {
        return false;
      } else {
        return true;
      }
    }
    watch(
      () => props.pokeresposta,
      async () => {
        reset();
        setaImg();
        BuscaEspecie();
      }
    );
    watch(
      () => state.evolucao,
      async () => {
        setaEvolucao();
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
      buscaEvolucao,
      BuscaEspecie,
      reset,
      setaEvolucao,
      variedadevalido
    };
  }
});
</script>
