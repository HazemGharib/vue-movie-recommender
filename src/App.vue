<template>
  <v-app>
    <v-app-bar
      id="nav"
      app
      color="#14b1ab"
      dark
      height="75px"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Movie Recommender"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

        <v-btn
          text
          to="/"
        >
          <span class="mr-2">Home</span>
        </v-btn>
        <v-btn
          text
          to="/about"
        >
          <span class="mr-2">About</span>
        </v-btn>

      <v-btn
        href="#"
        text
      >
        <span class="mr-2">Sign in</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style lang="scss" scoped>
  #nav {

    a {
      font-weight: bold;
      text-decoration: none;
      color: #2c3e50;
      margin: 0 0.5em;

      span>span{
        margin: 0 0.5rem;
      }

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
