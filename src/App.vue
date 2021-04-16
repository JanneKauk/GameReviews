<template>
  <div id="app">
    <the-header :login="loginSignUp"></the-header>
    <img alt="Vue logo" src="./assets/logo.png">
    <GameList/>
  </div>
</template>

<script>
import GameList from './components/Lists/GameList.vue'

export default {
  name: 'App',
  components: {
    GameList

  },
  data() {
    return {
      loginSignUp: 'Login / Sign Up'
    };
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
