<template>
   
    <b-modal v-if='moveObj' id='modal-1' :title='moveObj.name' hide-footer >
        <h4 v-if='moveObj.type' :class='moveObj.type.name'>Type : {{moveObj.type.name}}</h4>
        
        <div class="descricaomove" v-if='moveObj'>
            <h3>Description</h3>
            <h5>{{shortdescricao}}</h5>
            <span class='my-4'>
                {{descricao}}
            </span>
        </div>

        <div v-if='moveObj.type' :class='moveObj.type.name' class="statsmove" > 
            <h3>Stats</h3>
            <h5 v-if='moveObj.damage_class'>Class : {{moveObj.damage_class.name}}</h5>
            <h5 v-if='moveObj.power'>Power : {{moveObj.power}}</h5>
            <h5 v-if='moveObj.pp'>PP : {{moveObj.pp}}</h5>
            <h5 v-if='moveObj.accuracy'>Accuracy : {{moveObj.accuracy}}</h5>
            <h5 v-if='moveObj.priority'>Priority : {{moveObj.priority}}</h5>
        </div>
        
    </b-modal>
    
</template>
<script>
export default {
    props:{
        move: Object
    },
    data(){
        return{
            descricao : '',
            shortdescricao: '',
            moveObj: {}
        }
    },
    watch:{
        move:{
            handler() {               
                this.BuscaTipo()          
            }
        }
    },
    methods:{
        BuscaTipo(){
            this.$http.get(this.move.url)          
            .then((response) =>{ 
                this.descricao= response.data.effect_entries[0].effect.replace(/\$effect_chance/g,response.data.effect_chance)
                this.shortdescricao = response.data.effect_entries[0].short_effect.replace(/\$effect_chance/g,response.data.effect_chance)

                this.moveObj = response.data
               // console.log(response.data.effect_chance)
            })
            .catch((err)=>{
               this.descricao=err
            })
        }
    }
}
</script>