<template>
  <div id="app">
    <Head />        
    <router-view />  
  </div>
</template>

<script>
import Head from './components/Head.vue'

export default {
  name: 'App',
  components: {
    Head
  }
}
</script>


