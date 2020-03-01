<template>
    <div>
       
       
      <b-jumbotron class="div-busca">
        <label for="select-tipo">Selecione a geração </label> 
       <b-form-select v-model="geracoeselecionado" @change="retornaGeracao(geracoeselecionado+1)" class="select-tipo" id="select-tipo">
           <b-form-select-option v-for="(tipo,index) in geracoes" :key="index" :value='index'>
               {{tipo.name}}
           </b-form-select-option>
       </b-form-select>
      </b-jumbotron>

      <div class="msg-box-container container">
        <h4>{{msg}}</h4>
        <h1 v-if='retornou'>{{retornoGeracao.name}}</h1>
        <h2 v-if='retornou'>{{retornoGeracao.main_region.name}}</h2>    
      </div>
        <div class="geracoes-box-container" v-if='retornou'>
                  
          
          <GeracoesPokemon :retornoGeracao="retornoGeracao.pokemon_species" />
           <!-- {{retornoGeracao.types}}
           {{retornoGeracao.pokemon_species}} -->
            
        </div>
    </div>
</template>

<script>
import GeracoesPokemon from '@/components/GeracoesPokemon.vue'
export default {
  components: {
        GeracoesPokemon
    },
    data() {
    return {
      geracoes: [],
      geracoeselecionado: '',
      retornoGeracao:[],
      retornou: false,
      msg:"Busque uma geração de pokémon."
    }
  },   
  mounted(){
    this.retornaGeracaos()
    if(this.$route.params.id){
          this.geracoeselecionado =this.$route.params.id          
          this.retornaGeracao(this.geracoeselecionado)          
    }
  },  
  watch:{
        geracoeselecionado:{
            immediate: true,
            handler() {              
              this.retornoGeracao=[],
              this.retornou= false,
              this.msg="Busque uma geração de pokémon."
            }
        }
  },
  methods:{
    retornaGeracaos(){
        fetch('https://pokeapi.co/api/v2/generation',{
        method: 'get'
        })
        .then((response) =>{
        return response.json()
        })
        .then((jsonData) =>{
        this.geracoes = jsonData.results
        }) 
    },
    retornaGeracao(tipo){
      if(tipo === 0){
        return false
      }
        fetch(`https://pokeapi.co/api/v2/generation/${tipo}`,{
        method: 'get'
        })
        .then((response) =>{
        return response.json()
        })
        .then((jsonData) =>{
        this.retornoGeracao = jsonData
        this.retornou = true 
        this.msg = ''       
        })
        .catch((err)=>{
            this.retornou = false
            this.msg = "Não foi possível encontrar esse tipo."
        }) 
    },
  }
}
</script>