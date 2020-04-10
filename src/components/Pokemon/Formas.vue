<template>
<div class="formas-box" :class='color'>
    <h1 class='branco'>Forms</h1>    

    <div v-if="variedades.length > 0" class="evolucoes-box-container">
                <div class="pokemons-lista-evol" v-for='(pokemon,index) in variedades' :key='index+"f"'>           
                    <router-link :to="`/pokemon/${pokemon.pokemon.name}`">         
                        
                       <img 
                        :src="foto[index]"
                        :alt="pokemon"
                        v-if='foto[index]'
                        >
                        <h5>{{pokemon.pokemon.name}}</h5>
                                   
                    </router-link>
                </div>

                
    </div>
</div>
</template>
<script>
export default {
    props:{
        variedades: Array,
        color: String 
    },
        data(){
        return{
            foto: [],
            apistatus : false,
        }
    },
    watch:{
            variedades:{
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
            this.variedades.map((retorno,index) => {                
                numeropoke = retorno.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/','')
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