<template>
    <div class="status-box-container container">      
        <h3>Status base</h3>
        
                <b-row class="lista-atributos">
                    <b-col cols='4' v-for='(status,index) in pokeresposta' :key='index'>
                    <b-badge class="badge-status">{{status.stat.name}}</b-badge><b-icon-arrow-right-short></b-icon-arrow-right-short>
                    <span> {{status.base_stat}}</span>
                    <!-- <b-collapse v-if="(index+1)%3 === 0"></b-collapse>           -->
                    </b-col>
                </b-row>
    </div>
</template>

<script>
export default {
     props:{
        pokeresposta: Array
    }
    
}
</script>