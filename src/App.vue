<template>
  <div id="app">
    <the-header :login="loginSignUp"></the-header>
    <img alt="Vue logo" src="./assets/logo.png">
    <GameList/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <base-game></base-game>
  </div>
</template>

<script>
import GameList from './components/Lists/GameList.vue'
import HelloWorld from './components/HelloWorld.vue'
import BaseGame from './components/Layout/BaseGame.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseGame,
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
