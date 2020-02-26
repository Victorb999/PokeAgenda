<template>
    <b-container class="pokemon-main-div">
        <div class='titulo'>
                <b-img :src='pokeresposta.sprites.front_default' :alt='pokeresposta.name' v-if="pokeresposta.sprites.front_default"/>
                <h3 class="pokenome"> #{{pokeresposta.id}} {{pokeresposta.name}}
                </h3>
        </div>
        <b-row>
            <b-col cols="6">

                <b-img :src='fotourl'
                :alt="pokeresposta.name" class="fotogrande" />                
                <div class="tipos">
                    <h4 v-for='(tipos,index) in tipo' :key='index'  class="texto-tipo">
                        <b-badge :class='tipo[index].type.name'>{{tipo[index].type.name}}  </b-badge> 
                                  
                    </h4>
                </div>
            </b-col>
        
            <b-col>
                <div class="infos">
                    <h4>Status </h4>
                    <p v-for='(status,index) in pokeresposta.stats' :key='index'>
                    <b>{{status.stat.name}}</b> >>
                    valor base: {{status.base_stat}}              
                    </p>
                    <h5>Altura: {{pokeresposta.height/10}}m</h5>
                    <h5>Peso: {{pokeresposta.weight/10}}kg</h5>
                    
                </div>
                
            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
export default {
    props:{
        pokeresposta:Object
    },
    data(){
        return{
            tipo : [],
            fotourl : ''
        }
    },
    watch:{
        pokeresposta:{
            immediate: true,
            handler() {
              this.setaImg()
            }
        }
    },
    mounted(){
        this.setaImg()
    },
    methods:{
        setaImg(){
            let numero 
            numero = this.pokeresposta.id < 999 ? ('000' + this.pokeresposta.id).substr(-3) : this.pokeresposta.id
            this.tipo = this.pokeresposta.types 
            if(numero < 1000){
                this.fotourl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numero}.png`
            }
            else{
                this.fotourl = "https://toyama.com.br/images/imagens.png"                
            }
        }
    }
}
</script>