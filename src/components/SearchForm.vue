<template>
  <b-jumbotron class="div-busca">
    <b-form inline @submit.prevent="BuscaPokemon(true)">
      <b-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a Pokemon"
        v-model.trim="pokemon"
      ></b-input>

      <b-button @click="BuscaPokemon(true)" variant="success">Search</b-button>

      <b-button @click="reseta" type="reset" variant="danger">Reset</b-button>

      <b-button
        @click="BuscaRandom"
        variant="warning"
        class="branco"
        v-b-tooltip.hover.bottom
        title="Search for a random pokemon"
        placement="bottom"
      >
        Random
      </b-button>
    </b-form>
  </b-jumbotron>
</template>

<script>
import {mapActions} from 'vuex'
import ApiPokemon from "@/core/ApiPokemon.js"
export default{
    name: "SearchForm",
    data(){
        return {
            pokemon: "",
            apistatus: false,
            msg: "Search for a pokemon, enter the name or the number.",
            pokeresposta: {},
            carregado: false,
        };
    },
    methods: {
    ...mapActions([
      'addPokemon'
    ]),
    async BuscaPokemon(botao) {
    //   if (botao) {
    //     window.history.pushState(
    //       "page",
    //       this.pokemon,
    //       "/pokemon/" + this.pokemon
    //     );
    //   }

    //   if (this.pokemon === "") {
    //     return false;
    //   }

      const request = new ApiPokemon

      await request.getPokemon(this.pokemon)
      .then((response) => {
          console.log(response)
          this.pokemon = "";
          this.apistatus = true;
          this.pokeresposta = response;
          this.carregado = true;
          this.addPokemon(this.pokeresposta);
        })
        .catch((err) => {
          this.apistatus = false;
          this.msg = "Enter a valid pokemon.";
          this.carregado = true;
        });     
    },
    BuscaRandom() {
      const min = Math.ceil(1);
      const max = Math.floor(807);
      let random = Math.floor(Math.random() * (max - min)) + min;
      this.pokemon = random;
      this.BuscaPokemon(true);
    },
    reseta() {
      this.pokemon = "";
      this.apistatus = false;
      this.pokeresposta = {};
      this.msg = "Look for a pokemon that you want.";
    },
  },
};
</script>
