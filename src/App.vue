<template>
  <div id="app">
    <the-header :login="loginSignupText" @open="showDialog"></the-header>
    <router-view v-slot="slotProps"> 
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component" />
      </transition>
    </router-view>
    <login-signup @close="hideDialog" :open="dialogIsVisible">
      <!-- <button @click="hideDialog">Close dialog</button> -->
    </login-signup>
    <footer></footer>
  </div>
</template>

<script>

export default {
  name: 'App',
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
    },
    async auth() {
     await this.$store.dispatch('isLoggedInUser');
    }
  },
  computed: {
    loginSignupText() {
      let loggedIn = this.$store.getters.getUser;
      if(loggedIn) {
        return '' + loggedIn.username;
      } else {
        return 'Login / Sign up';
      }
    }
  },
  created: function() {
    this.auth();
  },

}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

footer {
   /* display: flex; */
  /*min-height: calc(100% - 1);
  height: 55px; */
  background-color: #ED5565;
  position: relative; 
  padding: 3em;
  margin-top: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  /* flex-direction: column; */
  min-height: 100vh;
  margin: 0;
  /* width: 100%;*/
  /* display: flex; */
  flex-direction: column;

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
