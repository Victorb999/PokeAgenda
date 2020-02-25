<template>
    <div class="habilidades-box-container">
        Habilidades:
        <span v-for='(habilidade,index) in pokeresposta' :key='index'>
         <b-badge class="habilidades">{{habilidade.ability.name}}</b-badge>
         <span @show="carregaHabilidade(habilidade.ability.url)"> </span>                                
        </span>
       
    </div>
</template>

<script>
export default {
    props:{
        pokeresposta: Array
    },
    data(){
        return{
            habilidadeApi : [],
            retornoHabilidade: {}         
        }
    },
    mounted(){
       
        // this.pokeresposta.map((val)=>{
        //     this.habilidadeApi=[...this.habilidadeApi,val.ability.url]
        //     this.carregaHabilidade(val.ability.url)
        // })
        //console.log(this.habilidadeApi)
      
    },
    methods:{
        carregaHabilidade(url){  
                      
             this.$http.get(url)          
             .then((response) =>{                
                this.retornoHabilidade = response.data
                 console.log(response.data)
             })
             .catch((err)=>{
                 this.retornoHabilidade = {}
             })
             console.log(this.retornoHabilidade)
        }
    }
}
</script>