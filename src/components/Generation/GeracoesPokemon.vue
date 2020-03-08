<template>
    <div class="tipopokemon-div">
        <div class="container">
        <h3>Pokemon species</h3>       
            <div v-if="retornoGeracao.length > 0" class="container-lista-pokemon">
                <div class="pokemons-lista" v-for='(pokemon,index) in retornoGeracao.slice().reverse()' :key='index+"f"'>           
                     <router-link :to="`/pokemon/${pokemon.name}`">           
                        <img 
                        :src="foto[index]"
                        :alt="pokemon.name"
                        v-if='foto[index]'
                        >
                        <h6># {{numero[index]}}</h6>
                        <h5>{{pokemon.name}}</h5>
                                        
                    </router-link> 
                    <!-- {{pokemon}} -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   props:{
        retornoGeracao: Array
    },
    data(){
        return{
            foto: [],
            apistatus : false,
            pokeresposta: [],
            numero: []
        }
    },
    beforeMount(){
        let numeropoke = 0
        this.retornoGeracao.slice().reverse().map( (retorno,index) => {
           //console.log(retorno.url)
            numeropoke = retorno.url.replace('https://pokeapi.co/api/v2/pokemon-species/','')
            numeropoke = numeropoke.replace('/','')
            this.numero[index] = numeropoke
            if(numeropoke < 10090){
                this.foto[index] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`
            }
            else{
                this.foto[index] = "https://toyama.com.br/images/imagens.png"
            }
            
            
        })
        //console.log(this.foto)
    }   


}
</script>