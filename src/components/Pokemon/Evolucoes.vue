<template>
<div class="evolucoes-box">
    <h1>Evolutions</h1>    

    <div v-if="evolucoes.length > 0" class="evolucoes-box-container">
                <div class="pokemons-lista-evol" v-for='(pokemon,index) in evolucoes' :key='index+"f"'>           
                    <router-link :to="`/pokemon/${pokemon}`">         
                        
                       <img 
                        :src="foto[index]"
                        :alt="pokemon"
                        v-if='foto[index]'
                        >
                        <h5>{{pokemon}}</h5>
                                   
                    </router-link>
                </div>

                
    </div>

</div>
</template>

<script>
export default {
    props:{
        evolucoes: Array,
        evolucoesUrl: Array        
    },
    data(){
        return{
            foto: [],
            apistatus : false,
        }
    },
    watch:{
            evolucoes:{
                immediate: true,
                handler() {                
                    this.carregafoto()            
                }
            },
            // $route:{
            //     handler() {                
            //         console.log(this.$route.params)            
            //     }
            // }
    },
    beforeMount(){
        //this.carregafoto()       
        //console.log(this.evolucoes)
    },
    methods:{
        carregafoto(){
            let numeropoke = 0
            this.evolucoesUrl.map((retorno,index) => {                
                numeropoke = retorno.replace('https://pokeapi.co/api/v2/pokemon-species/','')
                numeropoke = numeropoke.replace('/','')
                if(numeropoke < 10090){
                    this.foto[index] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`
                }
                else{
                    this.foto[index] = "https://toyama.com.br/images/imagens.png"
                }                   
            })
        }
    }
}
</script>