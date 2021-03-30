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
    Head,
  },
});
</script>
