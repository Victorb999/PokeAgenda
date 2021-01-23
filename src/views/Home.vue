<template>
  <div class="home">
    <search-pokemon />
    <div class="card card-about">
      <div class="card-body">
        <img alt="Pikachu" src="../assets/gifs/pikachu-loading.gif" />
        <h1>This is a Pokedex</h1>
        <p>Made with vue3 and TS</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchPokemon from "@/components/SearchPokemon.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    SearchPokemon,
  },
});
</script>

<style>
#app {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: inherit; */
  color: inherit;
}
</style>
