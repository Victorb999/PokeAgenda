<template>
    <div class="tipopokemon-div-atak">
        <div class="container">
          <h3>Ataques do tipo</h3>
       
            <div v-if="retornoTipo.moves.length > 0">            
                <span v-for='(moves,index) in retornoTipo.moves' :key='index+"e"'>           
                <b-badge>{{moves.name}}</b-badge>                                
                </span>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
   props:{
        retornoTipo: Object
    },
}
</script>