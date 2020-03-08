<template>
  <div class="attacks-box-container container">
    Ataques:
    <span v-for="(moves,index) in pokeresposta" :key="index">
      <b-badge v-b-modal.modal-1 @click="setaMove(moves.move)">{{moves.move.name}}</b-badge>
    </span>

    <AttackDescription :move='moveselecionado' />
   
  </div>
</template>

<script>
import AttackDescription from '@/components/Pokemon/AttackDescription.vue'
export default {
    props: {
        pokeresposta: Array
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
};
</script>