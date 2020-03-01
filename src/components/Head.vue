<template>
    <div>
       <div>
        <b-nav class="header">
            <b-nav-item>
                 <router-link to="/">
                    <img src="https://assets.pokemon.com/static2/_ui/img/favicon.ico" alt="pokeagenda">
                </router-link> 
            </b-nav-item>
            <b-nav-item>                              
                <router-link to="/" class="logo">                
                <b>Poke Agenda</b>
                </router-link> 
            </b-nav-item>           
            <b-nav-item>               
                <router-link to="/tipo"><b>Busca por tipo</b></router-link> 
            </b-nav-item>           
            <b-nav-item>               
                <router-link to="/geracao"><b>Busca por geração</b></router-link> 
            </b-nav-item>           
        </b-nav>

        
    </div>
    </div>
</template>

<script>
export default {
    
}
</script>