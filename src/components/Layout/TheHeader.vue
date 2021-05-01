<template>
  <header>
    <!-- <base-game></base-game> -->
    <div>
      <button class="loginbutton" @click="$emit('open')">{{ login }}</button>
      <!-- <router-link to="/Login"><h1>{{ login }}</h1></router-link> -->
    </div>
    

  </header>
</template>

<script>
// import BaseGame from './BaseGame.vue';
export default {
  components: {
    // BaseGame
  },
  props: {
    login: {
      type: String,
      required: true
    },
  },
  emits: ['open'],
  data() {
    return {
    };
  }
}
</script>

<style scoped>


.loginbutton {
  display: flex;
  align-self: flex-end;
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  margin: 2rem;
  cursor: pointer;
  outline: none;

  
}
@media screen and (-ms-high-contrast: active) {
   .loginbutton { border: 2px solid currentcolor;}
  }

header {
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0;
  padding: 0;
}

header h1 {
  color: black;
  padding-right: 2rem;

}
</style>