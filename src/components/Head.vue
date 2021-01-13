<template>
  <div>
    <nav class="navbar navbar-expand">
      <div class="navbar-brand">
        <router-link to="/">
          <img
            src="https://assets.pokemon.com/static2/_ui/img/favicon.ico"
            alt="pokeagenda"
          />
        </router-link>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-toggle-collapse"
        aria-controls="navbar-toggle-collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar-toggle-collapse">
        <ul class="navbar-nav header">
          <li class="nav-item">
            <router-link to="/" class="logo">
              <b>Poke Agenda</b>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/type"><b>Search for type</b></router-link>
          </li>
          <!--<li class="nav-item">
            <router-link to="/geracao"
              ><b>Search for generation</b></router-link
            >
          </li>-->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>
