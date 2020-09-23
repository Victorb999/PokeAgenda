<template>
  <div>
    <b-navbar navbar-expand>
      <b-navbar-brand>
        <router-link to="/">
          <img
            src="https://assets.pokemon.com/static2/_ui/img/favicon.ico"
            alt="pokeagenda"
          />
        </router-link>
      </b-navbar-brand>

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

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="header">
          <b-nav-item>
            <router-link to="/" class="logo">
              <b>Poke Agenda</b>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/tipo"><b>Search for type</b></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/geracao"
              ><b>Search for generation</b></router-link
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>
