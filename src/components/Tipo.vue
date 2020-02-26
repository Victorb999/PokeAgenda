<template>
    <div>
       
       

       <b-form-select v-model="tiposelecionado" @change="retornaTipo(tiposelecionado)">
           <b-form-select-option v-for="(tipo,index) in tipos" :key="index" :value='index'>
               {{tipo.name}}
           </b-form-select-option>
       </b-form-select>

       {{retornoTipo}}
    </div>
</template>

<script>
export default {
    data() {
    return {
      tipos: [],
      tiposelecionado: '',
      retornoTipo:[]
    }
  },   
  mounted(){
    this.retornaTipos()
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
        fetch(`https://pokeapi.co/api/v2/type/${tipo}`,{
        method: 'get'
        })
        .then((response) =>{
        return response.json()
        })
        .then((jsonData) =>{
        this.retornoTipo = jsonData        
        }) 
    },
  }
}
</script>