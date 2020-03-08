<template>
    <div class="tipopokemon-div-atak">
        <div class="container">
          <h3>Moves</h3>
       
            <div v-if="retornoTipo.moves.length > 0">            
                <span v-for='(moves,index) in retornoTipo.moves' :key='index+"e"'>           
                <b-badge v-b-modal.modal-1 @click="setaMove(moves)" class="tipo-badge">{{moves.name}}</b-badge>                                
                </span>
            </div>
            <AttackDescription :move='moveselecionado' />
        </div> 
    </div>
</template>

<script>
import AttackDescription from '@/components/Pokemon/AttackDescription.vue'
export default {
   props:{
        retornoTipo: Object
    },
    components: {
        AttackDescription
    },
    data(){
        return{
            moveselecionado : {}
        }
    },
    methods:{
        setaMove(move){
            this.moveselecionado = move
        }
    }
}
</script>