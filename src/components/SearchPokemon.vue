<template>
  <input type="text" v-model="state.pokemon" />
  <button>
    <router-link :to="`/pokemon/${state.pokemon}`">Buscar</router-link>
  </button>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    interface Pokemon {
      pokemon: string;
    }
    const state = reactive({
      pokemon: ""
    }) as Pokemon;

    return {
      state
    };
  }
});
</script>
