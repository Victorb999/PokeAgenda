<template>
    <div class="tipopokemon-div">
        <div class="container">
        <h3>Pokémons</h3>       
            <div v-if="retornoTipo.pokemon.length > 0" class="container-lista-pokemon">
                <div class="pokemons-lista" v-for='(pokemon,index) in retornoTipo.pokemon' :key='index+"f"'>           
                    <router-link :to="`/pokemon/${pokemon.pokemon.name}`">           
                        <img 
                        :src="foto[index]"
                        :alt="pokemon.pokemon.name"
                        v-if='foto[index]'
                        >
                        <h5>{{pokemon.pokemon.name}}</h5>
                                        
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   props:{
        retornoTipo: Object
    },
    data(){
        return{
            foto: [],
            apistatus : false,
            pokeresposta: [],
        }
    },
    beforeMount(){
        let numeropoke = 0
        this.retornoTipo.pokemon.map( (retorno,index) => {
            //this.BuscaPokemon(retorno.pokemon.url)
            //this.BuscaPokemon(retorno.pokemon.url)
        //    setTimeout(() => {                             
        //         this.foto = this.pokeresposta
        //    }, 1000);
            numeropoke = retorno.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/','')
            numeropoke = numeropoke.replace('/','')
            if(numeropoke < 10090){
                this.foto[index] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeropoke}.png`
            }
            else{
                this.foto[index] = "https://toyama.com.br/images/imagens.png"
            }
            
            
        })
        //console.log(this.foto)
    }
    ,
    methods:{        

        // async BuscaPokemon(url){
        //     let data = []
        //     let data2 = []
        //     await this.$http.get(url)                 
        //         .then(res => {
                   
        //             data = res.data.sprites.front_default  
        //             data2 = res.data.name  
        //             //console.log(data)
        //             setTimeout(() => {                             
        //                 this.foto = [...this.foto,data2]    
        //                 this.pokeresposta = [...this.pokeresposta,data]
        //             }, 1000);              
                                   
        //         })
        // }
        

    }

}
</script>