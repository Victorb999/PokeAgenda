<template>
    <div class="tipopokemon-div-relacao">
        <div class="container">
          <h3>Type relations</h3>
        
          <div v-if="retornoTipo.damage_relations.double_damage_from.length > 0">
            <h4>Double damage from:</h4>
            <span v-for='(damage,index) in retornoTipo.damage_relations.double_damage_from' :key='index+"a"'>           
            <b-badge :class='damage.name'>{{damage.name}}</b-badge>                                
            </span>
          </div>
          <div v-if="retornoTipo.damage_relations.double_damage_to.length > 0">
            <h4>Double damage to:</h4>
            <span v-for='(damage2,index) in retornoTipo.damage_relations.double_damage_to' :key='index+"b"'>            
            <b-badge :class='damage2.name'>{{damage2.name}}</b-badge>                                
            </span>
          </div>
          <div v-if="retornoTipo.damage_relations.no_damage_from.length > 0">
            <h4>No damage from:</h4>
            <span v-for='(damage2,index) in retornoTipo.damage_relations.no_damage_from' :key='index+"c"'>            
            <b-badge :class='damage2.name'>{{damage2.name}}</b-badge>                                
            </span>
          </div>
          <div v-if="retornoTipo.damage_relations.no_damage_to.length > 0">
            <h4>No damage to:</h4>
            <span v-for='(damage2,index) in retornoTipo.damage_relations.no_damage_to' :key='index+"d"'>            
            <b-badge :class='damage2.name'>{{damage2.name}}</b-badge>                                
            </span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
   props:{
        retornoTipo: Object
    },
}
</script>