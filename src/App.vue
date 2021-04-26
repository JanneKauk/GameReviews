<template>
  <div id="app">
    <the-header :login="loginSignUp" @open="showDialog"></the-header>
    <base-game></base-game>
    <router-view></router-view>
    <login-signup @close="hideDialog" :open="dialogIsVisible">
      <button @click="hideDialog">Close dialog</button>
    </login-signup>
  </div>
</template>

<script>
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
      loginSignUp: 'Login / Sign Up',
      dialogIsVisible: false,

    };
  },
  methods: {
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    }
  }

}
</script>

<style scoped>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
