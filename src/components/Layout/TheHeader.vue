<template>
  <header>
    <!--/.Navbar-->
    <nav class="desktopf">
      <div style="display: flex; align-items: center; width: 100%;">
        <base-game></base-game>
        <div class="logbutt">
          <button class="loginbutton" @click="$emit('open')">{{ login }}</button>
          <!-- <router-link to="/Login"><h1>{{ login }}</h1></router-link> -->
        </div>
      </div>
    </nav>
    <div class="container mobilef">
      <!-- This checkbox will give us the toggle behavior, it will be hidden, but functional -->
      <input id="toggle" type="checkbox">

      <!-- IMPORTANT: Any element that we want to modify when the checkbox state changes go here, being "sibling" of the checkbox element -->

      <!-- This label is tied to the checkbox, and it will contain the toggle "buttons" -->
      <label style="margin-bottom: 1rem" class="toggle-container" for="toggle">
        <!-- If menu is open, it will be the "X" icon, otherwise just a clickable area behind the hamburger menu icon -->
        <span class="button button-toggle"></span>
      </label>

      <!-- The nav menu -->
      <nav class="nav">
        <div class="logbutt">
          <button class="loginbutton nav-item" @click="$emit('open')">{{ login }}</button>
          <!-- <router-link to="/Login"><h1>{{ login }}</h1></router-link> -->
        </div>
        <router-link class="nav-item" to="/gameslist/best_rated" v-on:click="storeString('score')">Score</router-link>
        <router-link class="nav-item" to="/gameslist/graphics" v-on:click="storeString('graphics')">Graphics</router-link>
        <router-link class="nav-item" to="/gameslist/characters" v-on:click="storeString('characters')">Characters</router-link>
        <router-link class="nav-item" to="/gameslist/story" v-on:click="storeString('story')">Story</router-link>
        <router-link class="nav-item" to="/gameslist/content" v-on:click="storeString('content')">Content</router-link>
        <router-link class="nav-item" to="/gameslist/playability" v-on:click="storeString('playability')">Playability</router-link>
        <div class="sHol nav-item">
          <label class="searchbarholder">
            <input placeholder="search" v-model="searchValue" @keypress.enter="searchGames"/>
          </label>
        </div>
      </nav>
    </div>
  </header>

</template>

<script>
import BaseGame from './BaseGame.vue';
export default {
  components: {
    BaseGame
  },
  props: {
    login: {
      type: String,
      required: true
    },
  },
  methods:{
    storeString(str){
      this.category = str;
      this.$store.dispatch("sortedGames", str);
    },
  },
  emits: ['open'],
  data() {
    return {
    };
  },
  
}
</script>

<style scoped>
.logbutt{
  flex: 33%;
  display: flex;
  justify-content: flex-end;
  margin: auto 2rem auto auto
}
.loginbutton {
  display: flex;
  flex: initial;
  align-self: flex-end;
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  margin: 2rem;
  cursor: pointer;
  outline: none;
  min-width: max-content;
  
}
@media screen and (-ms-high-contrast: active) {
   .loginbutton { border: 2px solid currentcolor;}
  }

header {
  width: 100%;
  display: flex;
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



@media only screen and (max-width: 1260px){
  /* Basic styles */
  * {
    box-sizing: border-box;
  }
  .logbutt{
    justify-content: normal;
  }
  .sHol{
    flex: 33%;
    display: flex;
    align-items: center;
  }
  .searchbarholder{
    height: 2rem;
  }
  .searchbarholder input{
    height: 100%;
  }
  .loginbutton {
    margin: 0;
  }
  .mobilef{
    visibility: initial;
  }
  .desktopf{
    visibility: hidden;
    height: 0;
    width: 0;
  }
  html, body {
    margin: 0;
  }
  body {
    font-family: sans-serif;
    background-color: #F6C390;
  }
  a {
    text-decoration: none;
  }
  .container {
    display: flex;
    margin: auto;
  }

  /* Toggle functionality */
  #toggle {
    position: absolute;
    left: -100%;
    top: -100%;
  }

  #toggle:focus ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }

  #toggle:checked ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 550px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }
  #toggle:checked ~ .toggle-container .button-toggle:hover {
    box-shadow: 0 0 0 550px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }
  #toggle:checked ~ .toggle-container .button-toggle:before {
    transform: translateY(-50%) rotate(45deg) scale(1);
  }
  #toggle:checked ~ .toggle-container .button-toggle:after {
    transform: translateY(-50%) rotate(-45deg) scale(1);
  }
  #toggle:checked:focus ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 550px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }
  #toggle:checked ~ .nav {
    pointer-events: auto;
    transform: translate(50px);
  }
  #toggle:checked ~ .nav .nav-item {
    color: #EC7263;
    letter-spacing: 0;
    height: 40px;
    line-height: 40px;
    margin-top: 0;
    opacity: 1;
    transform: scaleY(1);
    transition: 0.5s, opacity 0.1s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(1) {
    transition-delay: 0.15s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(1):before {
    transition-delay: 0.15s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(2) {
    transition-delay: 0.1s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(2):before {
    transition-delay: 0.1s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(3) {
    transition-delay: 0.05s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(3):before {
    transition-delay: 0.05s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(4) {
    transition-delay: 0s;
  }
  #toggle:checked ~ .nav .nav-item:nth-child(4):before {
    transition-delay: 0s;
  }
  #toggle:checked ~ .nav .nav-item:before {
    opacity: 0;
  }
  #toggle:checked ~ .dummy-content {
    padding-top: 30px;
  }
  #toggle:checked ~ .dummy-content:before {
    background-color: rgba(0, 0, 0, 0.3);
  }

  /* Toggle button */
  .button-toggle {
    position: absolute;
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 25px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 100%;
    transition: 0.6s;
  }
  .button-toggle:hover {
    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }
  .button-toggle:before, .button-toggle:after {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #EC7263;
    border-radius: 5px;
    transition: 0.5s;
  }
  .button-toggle:before {
    transform: translateY(-50%) rotate(45deg) scale(0);
  }
  .button-toggle:after {
    transform: translateY(-50%) rotate(-45deg) scale(0);
  }

  /* Menu */
  .nav {
    display: inline-block;
    margin: 25px 25px 20px;
    pointer-events: none;
    transition: 0.5s;
  }

  .nav-item {
    position: relative;
    display: inline-block;
    float: left;
    clear: both;
    color: transparent;
    font-size: 14px;
    letter-spacing: -6.2px;
    height: 7px;
    line-height: 7px;
    text-transform: uppercase;
    white-space: nowrap;
    transform: scaleY(0.2);
    transition: 0.5s, opacity 1s;
  }
  .nav-item:nth-child(1) {
    transition-delay: 0s;
  }
  .nav-item:nth-child(1):before {
    transition-delay: 0s;
  }
  .nav-item:nth-child(2) {
    transition-delay: 0.05s;
  }
  .nav-item:nth-child(2):before {
    transition-delay: 0.05s;
  }
  .nav-item:nth-child(3) {
    transition-delay: 0.1s;
  }
  .nav-item:nth-child(3):before {
    transition-delay: 0.1s;
  }
  .nav-item:nth-child(4) {
    transition-delay: 0.15s;
  }
  .nav-item:nth-child(4):before {
    transition-delay: 0.15s;
  }
  .nav-item:nth-child(1) {
    letter-spacing: -8px;
  }
  .nav-item:nth-child(2) {
    letter-spacing: -7px;
  }
  .nav-item:nth-child(n+4) {
    letter-spacing: -8px;
    margin-top: -7px;
    opacity: 0;
  }
  .nav-item:before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #EC7263;
    transform: translateY(-50%) scaleY(5);
    transition: 0.5s;
  }

  /* Dummy content */
  .dummy-content {
    position: relative;
    text-align: center;
    transition: 0.5s;
  }
  .dummy-content:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 2;
    transition: 0.5s;
  }

  .circle {
    display: inline-block;
    width: 75px;
    height: 75px;
    background-color: #EC7263;
    border-radius: 100%;
  }

  .text {
    margin: 15px 0 30px;
  }
  .text span {
    display: inline-block;
    height: 10px;
    margin: 0 5px;
    background-color: #C06162;
    border-radius: 5px;
  }
  .text span:first-child {
    width: 50px;
  }
  .text span:last-child {
    width: 80px;
  }

  .square-top {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 300px;
    background-color: #FEBE7E;
    z-index: 1;
  }

  .square-behind {
    display: inline-block;
    position: relative;
    top: -256px;
    width: 250px;
    height: 210px;
    background-color: #C28683;
  }
  .square-behind:before, .square-behind:after {
    position: absolute;
    content: "";
    top: 0;
    width: 40%;
    height: 100%;
  }
  .square-behind:before {
    left: 0;
    background-color: #9D567C;
  }
  .square-behind:after {
    right: 0;
    background-color: #958C6B;
  }
}
@media only screen and (min-width: 1260px) {
  .mobilef{
    visibility: hidden;
    height: 0;
    width: 0;
  }
  .desktopf{
    visibility: initial;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>