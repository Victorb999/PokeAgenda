<template>
    <b-container class="pokemon-main-div">       
    <div v-if='carregado'>   
        <div class='titulo'>
                <b-img :src='pokeresposta.sprites.front_default' :alt='pokeresposta.name' v-if="pokeresposta.sprites.front_default"/>
                <h3 class="pokenome"> #{{pokeresposta.id}} {{pokeresposta.name}}
                </h3>
        </div>
        <b-row>
            <b-col >
                <div class="pokemon-foto">
                    <b-img :src='fotourl'
                    :alt="pokeresposta.name" class="fotogrande" />                
                </div>
            </b-col>
        
            <b-col>
                <div class="infos" :class='tipo[0].type.name'>
                   <h3>{{alcunha}}</h3>  
                   <div class="poke-descricao" >
                        <span v-if="descricao">
                            <h4>Description</h4>
                            {{descricao}}
                        </span>
                    </div> 

                    <div class="poke-extrainfo">
                        <h5 v-if="especie.habitat">Habitat: {{especie.habitat.name}}</h5>
                        <h5 v-if="especie.shape">Body: {{especie.shape.name}}</h5>
                    
                        <h5>Height: {{pokeresposta.height/10}} m</h5>
                        <h5>Weight: {{pokeresposta.weight/10}} kg</h5>
                        
                    </div>

                    <div class="poke-tipos">
                        <h4>Type</h4>
                        <div class="tipos">
                            <h4 v-for='(tipos,index) in tipo' :key='index'  class="texto-tipo">
                                <router-link :to="`/tipo/${tipo[index].type.name}`">  
                                    <b-badge :class='tipo[index].type.name'>{{tipo[index].type.name}}  </b-badge> 
                                </router-link>       
                            </h4>
                        </div>
                    </div>                
                </div>
                
            </b-col>            
        </b-row>

        <b-row>
            <b-col>
                <Evolucoes :evolucoes="evolucoes" :evolucoesUrl="evolucoesURL" v-if="evolucoes.length > 1"/>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <Formas :variedades='especie.varieties' v-if="variedadevalido()" :color='tipo[0].type.name'/>
            </b-col>
        </b-row>
    </div> 
    <div v-else class="loading">
        <img :src="pokebolaLoad" alt="Loading" class='pokeloading'>
    </div>    
    </b-container>
</template>

<script>
import Evolucoes from '@/components/Pokemon/Evolucoes.vue'
import Formas from '@/components/Pokemon/Formas.vue'
export default {
    components: {
        Evolucoes,
        Formas
    },
    props:{
        pokeresposta:Object
    },
    data(){
        return{
            tipo : [],
            fotourl : '',
            especie: [],
            evolucao: [],
            evolucoes: [],
            evolucoesURL : [],
            descricao: '',
            alcunha:'',
            formas:[],
            carregado: false            
        }
    },
    watch:{
        pokeresposta:{
            immediate: true,
            handler() {                
                this.setaImg()
                this.evolucoes = []
                this.evolucoesURL = []
                this.descricao = ''
                this.alcunha = ''
                this.carregado = false
                this.buscaespecie(this.pokeresposta.species.url)               
            }
        },
        evolucao:{
            handler(){
                this.setaEvolucao()
            }
        }
    },
    mounted(){
        this.setaImg()
        //this.buscaespecie(this.pokeresposta.species.url)       
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
        },
        async  buscaespecie(url){
            await this.$http.get(url)          
            .then((response) =>{                    
                this.especie = response.data 

                 response.data.genera.map((alc,index)=>{
                    
                    if(alc.language.name === 'en'){
                        if(this.alcunha === ''){
                            this.alcunha =  alc.genus
                        }
                    }
                })

                response.data.flavor_text_entries.map((desc,index)=>{
                    
                    if(desc.language.name === 'en'){
                        if(this.descricao === ''){
                            this.descricao = this.descricao + desc.flavor_text
                        }
                    }
                })

                //this.descricao = response.data.flavor_text_entries[6].flavor_text
                //console.log(response.data.evolution_chain.url)
                if(response.data.evolution_chain.url){
                    this.buscaEvolucao(response.data.evolution_chain.url)
                }
                this.carregado = true
            //console.log(response)
            })
            .catch((err)=>{
                this.especie = {'erro' : err}
            })
        },
       async buscaEvolucao(url){
            await this.$http.get(url)          
            .then((response) =>{                    
                this.evolucao = response.data
            //console.log(response)
            })
            .catch((err)=>{
                this.evolucao = {'erro' : err}
            })
        },
        setaEvolucao(){
           
            if(this.evolucao){
           //return true
                 this.evolucoes = [...this.evolucoes,this.evolucao.chain.species.name]
                 this.evolucoesURL = [...this.evolucoesURL,this.evolucao.chain.species.url]
                 //console.log(this.evolucao.chain.evolves_to)
                 this.evolucao.chain.evolves_to.map((ev,index) =>{
                    
                     this.evolucoes = [...this.evolucoes,ev.species.name]
                     this.evolucoesURL = [...this.evolucoesURL,ev.species.url]
                     // ev.evolves_to[index].evolves_to.map((ev2,index2) =>{                         
                    //     this.evolucoes = [...this.evolucoes,ev2.evolves_to[index2].species.name]
                    // })
                    if(ev.evolves_to.length > 0){
                        this.evolucoes = [...this.evolucoes,ev.evolves_to[index].species.name]
                        this.evolucoesURL = [...this.evolucoesURL,ev.evolves_to[index].species.url]
                    }
                 })
            }
        },
        variedadevalido(){
            if(typeof this.especie.varieties  === 'undefined'){
                return false
            }
            else if(this.especie.varieties.length === 1){
                return false
            } 
            else{
                return true
            }
        }

    }
}
</script>