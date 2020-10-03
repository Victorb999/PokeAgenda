<template>
  <div id="nav">
    <Head />
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Head from "@/components/Head.vue";

export default defineComponent({
  name: "Home",
  components: {
    Head
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: inherit;
  color: #2c3e50;
}
</style>
