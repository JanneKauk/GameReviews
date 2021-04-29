<template>
  <div id="app">
    <the-header :login="loginSignUp" @open="showDialog"></the-header>
    <base-game></base-game>
    <router-view v-slot="slotProps"> 
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component" />
      </transition>
    </router-view>
    <login-signup @close="hideDialog" :open="dialogIsVisible">
      <!-- <button @click="hideDialog">Close dialog</button> -->
    </login-signup>
  </div>
</template>

<script>
import BaseGame from './components/Layout/BaseGame.vue'
//:key="$route"
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
.route-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.route-enter-active {
  transition: all 0.4s ease-out;
}

.route-leave-active {
  transition: all 0.4s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
