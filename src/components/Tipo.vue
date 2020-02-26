<template>
    <div>
       
       
      <b-jumbotron class="div-busca">
        <label for="select-tipo">Selecione o tipo </label> 
       <b-form-select v-model="tiposelecionado" @change="retornaTipo(tiposelecionado+1)" class="select-tipo" id="select-tipo">
           <b-form-select-option v-for="(tipo,index) in tipos" :key="index" :value='index'>
               {{tipo.name}}
           </b-form-select-option>
       </b-form-select>
      </b-jumbotron>

      <div class="msg-box-container container">
        <h4>{{msg}}</h4>
        <h1>{{retornoTipo.name}}</h1>
      </div>
        <div class="tipos-box-container" v-if='retornou'>
         
          
            <TiposRelacao :retornoTipo="retornoTipo" />
            <TiposMoves :retornoTipo="retornoTipo" />
            <TiposPokemons :retornoTipo="retornoTipo" />
            
        </div>
    </div>
</template>

<script>
import TiposRelacao from '@/components/TiposRelacao.vue'
import TiposMoves from '@/components/TiposMoves.vue'
import TiposPokemons from '@/components/TiposPokemons.vue'
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
      msg:"Busque um tipo de pokémon."
    }
  },   
  mounted(){
    this.retornaTipos()
  },  
  watch:{
        tiposelecionado:{
            immediate: true,
            handler() {              
              this.retornoTipo=[],
              this.retornou= false,
              this.msg="Busque um tipo de pokémon."
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
    retornaTipo(tipo){
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
        })
        .catch((err)=>{
            this.retornou = false
            this.msg = "Não foi possível encontrar esse tipo."
        }) 
    },
  }
}
</script>