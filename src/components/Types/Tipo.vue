<template>
    <div>        
        
      <b-jumbotron class="div-busca">
        <label for="select-tipo">Select a type </label> 
      <b-form-select v-model="tiposelecionado" @change="retornaTipo(tiposelecionado+1,true)" class="select-tipo" id="select-tipo">
          <b-form-select-option v-for="(tipo,index) in tipos" :key="index" :value='index'>
              {{tipo.name}}
          </b-form-select-option>
      </b-form-select>
      </b-jumbotron>

      
        <div class="msg-box-container container">
          <h4>{{msg}}</h4>
          <h1>{{retornoTipo.name}}</h1>
        </div>
        <div class="containerpokemon" v-if='carregado'> 
          <div class="tipos-box-container" v-if='retornou'>
          
            
              <TiposRelacao :retornoTipo="retornoTipo" />
              <TiposMoves :retornoTipo="retornoTipo" />
              <TiposPokemons :retornoTipo="retornoTipo" />
              
          </div>
        </div>
      <div v-else class='loading'><img :src='pikachuLoad' alt="Loading"></div>
    </div>
</template>

<script>
import TiposRelacao from '@/components/Types/TiposRelacao.vue'
import TiposMoves from '@/components/Types/TiposMoves.vue'
import TiposPokemons from '@/components/Types/TiposPokemons.vue'
export default {
  components: {
      TiposRelacao,TiposMoves,TiposPokemons       
    },
    data() {
    return {
      tipos: [],
      tiposelecionado: '',
      retornoTipo:[],
      retornou: false,
      msg:"Search a type pokemon.",
      carregado: false,
    }
  },   
  mounted(){
    this.retornaTipos()
    if(this.$route.params.id){
          this.tiposelecionado =this.$route.params.id          
          this.retornaTipo(this.tiposelecionado,false)          
    }
  },  
  watch:{
        tiposelecionado:{
            immediate: true,
            handler() {     
              this.carregado = false         
              this.retornoTipo=[],
              this.retornou= false,
              this.msg="Search a pokemon type."
            }
        },
        $route:{
          handler() {                
              //console.log(this.$route.params)
              this.carregado = false   
              this.tiposelecionado =this.$route.params.id
              this.retornaTipos(tiposelecionado,false)        
          }
      }
  },
  methods:{
    retornaTipos(){
        fetch('https://pokeapi.co/api/v2/type',{
        method: 'get'
        })
        .then((response) =>{
        return response.json()
        })
        .then((jsonData) =>{
        this.tipos = jsonData.results       
        }) 
    },
    retornaTipo(tipo,botao){
      if(botao){

        window.history.pushState('page', tipo, "/tipo/"+tipo);
      }

      if(tipo === 0){
        return false
      }
        fetch(`https://pokeapi.co/api/v2/type/${tipo}`,{
        method: 'get'
        })
        .then((response) =>{
        return response.json()
        })
        .then((jsonData) =>{
        this.retornoTipo = jsonData
        this.retornou = true 
        this.msg = '' 
        this.carregado = true      
        })
        .catch((err)=>{
            this.retornou = false
            this.msg = "This type isn't valid."
            this.carregado = true
        }) 
    },
  }
}
</script>