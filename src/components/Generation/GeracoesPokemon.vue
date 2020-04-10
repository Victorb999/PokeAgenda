<template>
    <div class="tipopokemon-div">
        <div class="container">
        <h3>Pokemon species</h3>       
            <div v-if="retornoGeracao.length > 0" class="container-lista-pokemon">
                <div class="pokemons-lista" v-for='(pokemon,index) in sortArrays(pokemoncompleto)' :key='index+"f"'>           
                     <router-link :to="`/pokemon/${pokemon.numero}`">           
                        <img 
                        :src="pokemon.foto"
                        :alt="pokemon.nome"
                        v-if='pokemon.foto'
                        >
                        <h6># {{pokemon.numero}}</h6>
                        <h5>{{pokemon.nome}}</h5>
                                        
                    </router-link> 
                    <!-- {{pokemon}} -->
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
   props:{
        retornoGeracao: Array
    },
    data(){
        return{
            foto: [],
            apistatus : false,
            pokeresposta: [],
            numero: [],
            pokemoncompleto:[]
        }
    },
    beforeMount(){
        let numeropoke = 0
        let arraypoke = {}
        this.retornoGeracao.slice().reverse().map( (retorno,index) => {
           //console.log(retorno.url)
            numeropoke = retorno.url.replace('https://pokeapi.co/api/v2/pokemon-species/','')
            numeropoke = numeropoke.replace('/','')
            this.numero[index] = parseInt(numeropoke)            
            if(numeropoke < 10090){
                this.foto[index] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`
            }
            else{
                this.foto[index] = "https://toyama.com.br/images/imagens.png"
            }

            arraypoke.numero = parseInt(numeropoke)
            arraypoke.foto = this.foto[index]
            arraypoke.nome = retorno.name

            //console.log(arraypoke)          
            this.pokemoncompleto = [...this.pokemoncompleto,arraypoke]
            arraypoke = {}
        })
        //console.log(this.pokemoncompleto)
    },
    methods: {
       sortArrays(arrays) {
            return _.orderBy(arrays, 'numero', 'asc');
        }
    }   
}
</script>