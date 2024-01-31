<template>
  <div id="nav">
    <HeaderMenu />
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderMenu from "@/components/HeaderMenu.vue";

export default defineComponent({
  name: "Home",
  components: {
    HeaderMenu,
  },
});
</script>
