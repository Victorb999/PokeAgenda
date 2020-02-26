<template>
    <div class="habilidades-box-container container">
        Habilidades:<br />
        <span v-for='(habilidade,index) in pokeresposta' :key='index'>
         <b-badge class="habilidades">{{habilidade.ability.name}}</b-badge>
         <!-- <button @load="carregaHabilidade(habilidade.ability.url)">?</button> -->
            
         <div v-if='retornoHabilidade[index]'>             
            <span class="descricao-habilidade" v-for='(retorno,index2) in retornoHabilidade[index].effect_entries' :key='index2'>
                {{retorno.effect}}
            </span> 
        </div>                                
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
            retornoHabilidade: []                   
        }
    },
    mounted(){       
        this.buscaApi()      
    },     
    watch:{
        pokeresposta:{           
            handler() {      
                this.habilidadeApi = [],
                this.retornoHabilidade= [],
                this.buscaApi()                 
            }
        }
    },   
    methods:{
        buscaApi(){
            this.pokeresposta.map((val)=>{
            this.habilidadeApi=[...this.habilidadeApi,val.ability.url]
            //console.log(this.habilidadeApi)
            this.carregaHabilidade(val.ability.url)
            }) 
        },

        async carregaHabilidade(url){
            let data = {}
            await this.$http.get(url)                 
                .then(res => {
                    //console.log(res.data);
                    data = res.data
                    setInterval(() => {}, 1000)
                    this.retornoHabilidade = [...this.retornoHabilidade,data];                   
                })
        },
        carregaHabilidade2(url){  
            let data = {}
             this.$http.get(url)
            .then(response => response.json())         
            .then((jsonData) =>{  
                data = jsonData.data            
                return data
                //console.log(response.data)
             })
             .catch((err)=>{
                 return false
             })                      
        }
    }
}
</script>