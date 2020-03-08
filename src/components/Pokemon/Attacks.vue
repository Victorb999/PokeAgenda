<template>
    <div class="attacks-box-container container">
        <h4>Moves</h4>
        <span v-for='(moves,index) in pokeresposta' :key='index'>
         <b-badge>{{moves.move.name}}</b-badge>                                
        </span>
    </div>
</template>

<script>
export default {
     props:{
        pokeresposta: Array
    }
    
}
</script>