<template>
  <div class="pokeagenda-box-container">
    <b-jumbotron class="div-busca">
      <b-form inline @submit.prevent="BuscaPokemon(true)">
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter a Pokemon"
          v-model.trim="pokemon"
        ></b-input>

        <b-button 
        @click='BuscaPokemon' 
        variant="success">Search</b-button>

        <b-button @click='reseta' 
        type="reset" variant="danger">Reset</b-button>        
      </b-form>
    </b-jumbotron>

    <div class="containerpokemon" v-if='carregado'>
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

        <div class="div-statusbase">
            <StatusBase  v-if='apistatus' :pokeresposta='pokeresposta.stats' :color='pokeresposta.types'/>
        </div>
        <div class="div-habilidades">
            <Habilidades  v-if='apistatus' :pokeresposta='pokeresposta.abilities'/>
        </div>
        <div class="div-attacks">
            <Attacks  v-if='apistatus' :pokeresposta='pokeresposta.moves'/>
        </div>
    </div>
    <div v-else class='loading'><img :src='pikachuLoad' alt="Loading" class='m-10'></div>
    
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon/Pokemon.vue'
import Attacks from '@/components/Pokemon/Attacks.vue'
import Habilidades from '@/components/Pokemon/Habilidades.vue'
import StatusBase from '@/components/Pokemon/StatusBase.vue'
export default {
    components: {
        Pokemon,
        Attacks,
        Habilidades,
        StatusBase
    },
    data(){
        return{
            pokemon: '',
            apistatus: false,
            msg: 'Search for a pokemon, enter the name or the number.',
            pokeresposta: {},
            carregado: false
        }
    },
    watch:{
        $route:{
            handler() {                
                //console.log(this.$route.params)  
                this.carregado = false
                this.pokemon =this.$route.params.id
                this.BuscaPokemon(false)          
            }
        }
    },
    mounted(){
        if(this.$route.params.id){
            this.pokemon =this.$route.params.id
            this.BuscaPokemon(false)
        }
    },
    methods:{
        BuscaPokemon(botao){
            if(botao){
                window.history.pushState('page', this.pokemon, "/pokemon/"+this.pokemon);
            }

            if(this.pokemon === ''){
                return false
            }            
            this.$http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`)          
            .then((response) =>{
                    this.pokemon=''
                    this.apistatus = true
                    this.pokeresposta = response.data
                    this.carregado = true
            //console.log(response)
            })
            .catch((err)=>{
                this.apistatus = false
                this.msg = "Enter a valid pokemon."
                this.carregado = true
            })
            
        },
        reseta(){
            this.pokemon=''
            this.apistatus= false
            this.pokeresposta= {}
            this.msg= 'Look for a pokemon that you want.'
        }
    }
}
</script>