<template>
  <div class="pokeagenda-box-container">
    <b-jumbotron class="div-busca">
      <b-form inline @submit.prevent="BuscaPokemon">
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Digite o Pokémon"
          v-model.trim="pokemon"
        ></b-input>

        <b-button 
        @click='BuscaPokemon' 
        variant="success">Buscar</b-button>

        <b-button @click='reseta' 
        type="reset" variant="danger">Reset</b-button>        
      </b-form>
    </b-jumbotron>

    <b-jumbotron class="div-resultado">
       <Pokemon 
       v-if='apistatus'
       :pokeresposta='pokeresposta'
       />
       <span 
       v-else-if='!apistatus'>
        {{msg}}
       </span>
    </b-jumbotron>

    <div class="div-habilidades">
        <Habilidades  v-if='apistatus' :pokeresposta='pokeresposta.abilities'/>
    </div>
    <div class="div-attacks">
        <Attacks  v-if='apistatus' :pokeresposta='pokeresposta.moves'/>
    </div>

    
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon.vue'
import Attacks from '@/components/Attacks.vue'
import Habilidades from '@/components/Habilidades.vue'
export default {
    components: {
        Pokemon,
        Attacks,
        Habilidades
    },
    data(){
        return{
            pokemon: '',
            apistatus: false,
            msg: 'Busque o pokémon que deseja, digitando o nome ou seu número.',
            pokeresposta: {}
        }
    },
    mounted(){
        if(this.$route){
            this.pokemon =this.$route.params.id
            this.BuscaPokemon()
        }
    },
    methods:{
        BuscaPokemon(){
            
            if(this.pokemon === ''){
                return false
            }
            
            this.$http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`)          
            .then((response) =>{
                    this.pokemon=''
                    this.apistatus = true
                    this.pokeresposta = response.data
                   
            //console.log(response)
            })
            .catch((err)=>{
                this.apistatus = false
                this.msg = "Não foi possível encontrar esse pokémon. Busque um pokémon existente."
            })
            
        },
        reseta(){
            this.pokemon=''
            this.apistatus= false
            this.pokeresposta= {}
            this.msg= 'Busque o pokémon que deseja, digitando o nome ou seu número.'
        }
    }
}
</script>