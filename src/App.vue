<template>
  <div id="app">
    <Head />
    <PokeAgenda />
  </div>
</template>

<script>
import Head from './components/Head.vue'
import PokeAgenda from './components/PokeAgenda.vue'

export default {
  name: 'App',
  components: {
    Head,
    PokeAgenda
  }
}
</script>


