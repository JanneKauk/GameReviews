<template>
  <div id="app">
    <the-header :login="loginSignUp"></the-header>
    <base-game></base-game>
    <router-view></router-view>
<!--    <GameList/>-->
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import GameList from './components/Lists/GameList.vue'
// import HelloWorld from './components/HelloWorld.vue'
import BaseGame from './components/Layout/BaseGame.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    BaseGame,
    // GameList

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
