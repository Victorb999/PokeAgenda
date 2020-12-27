<template>
  <div class="habilidades-box-container container">
    <h3>Ability</h3>
    <div
      v-for="(habilidade, index) in state.pokeresposta.abilities"
      :key="index"
      class="habilidade-box"
    >
      <h4 class="habilidades">{{ habilidade.ability.name }}</h4>

      <div v-if="state.retornoHabilidade[index]">
        <span
          class="descricao-habilidade"
          v-for="(retorno, index2) in state.retornoHabilidade[index]
            .effect_entries"
          :key="index2"
        >
          <span v-if="retorno.language.name === 'en'">
            {{ retorno.effect }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, watch, onMounted, computed } from "vue";
import store from "@/store/store";
import ApiPokemon from "@/core/ApiPokemon";

export default defineComponent({
  name: "Ability",
  setup() {
    interface Ability {
      habilidadeApi: Array<object>;
      retornoHabilidade: Array<object>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pokeresposta: any;
    }
    const state = reactive({
      habilidadeApi: [],
      retornoHabilidade: [],
      pokeresposta: computed(() => store().pokeresposta.value)
    }) as Ability;

    async function carregaHabilidade(url: string) {
      // let data = {}
      // await this.$http.get(url)
      //     .then(res => {
      //         //console.log(res.data);
      //         data = res.data
      //         //setInterval(() => {}, 1000)
      //         state.retornoHabilidade = [...state.retornoHabilidade,data];
      //     })
      const request = new ApiPokemon();
      await request
        .getPokemon(url, "ability")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          state.retornoHabilidade = [...state.retornoHabilidade, response];
        })
        .catch(err => {
          console.log(err);
        });
    }

    function buscaApi() {
      if (typeof state.pokeresposta !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.pokeresposta.abilities.map((val: any) => {
          state.habilidadeApi = [...state.habilidadeApi, val.ability.url];
          let numeroString = val.ability.url.replace(
            "https://pokeapi.co/api/v2/ability/",
            ""
          );
          numeroString = numeroString.replace("/", "");
          carregaHabilidade(numeroString);
        });
      }
    }
    //  function  carregaHabilidade2(url:any){
    //       let data = {}
    //        this.$http.get(url)
    //       .then(response => response.json())
    //       .then((jsonData) =>{
    //           data = jsonData.data
    //           return data
    //           //console.log(response.data)
    //        })
    //        .catch((err)=>{
    //            return false
    //        })
    //   }

    onMounted(() => {
      // ...
      buscaApi();
    });
    watch(
      () => state.pokeresposta,
      () => {
        buscaApi();
      }
    );
    return {
      state
    };
  }
});
</script>
