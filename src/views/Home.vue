<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/gifs/pikachu-loading.gif" />
    <h1>Rebuilding with TS + vue3</h1>
    <search-pokemon />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchPokemon from "@/components/SearchPokemon.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    SearchPokemon
  }
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
