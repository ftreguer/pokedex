<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <NuxtLink to="/" class="text-decoration-none text-white">
      <h1 style="font-size: 1.5em">Pokedex Comptalib</h1>
    </NuxtLink>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-button v-b-toggle.pokedex variant="transparent">
            <b-img src="/favicon.png" height="30"></b-img>
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
export default {
  name: "PokedexHeader",
};
</script>
