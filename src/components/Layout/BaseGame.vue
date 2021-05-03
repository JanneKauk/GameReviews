<template>
  <div class="sHol">
    <label style="" class="searchbarholder">
      <input placeholder="search" v-model="searchValue" @keypress.enter="searchGames"/>
    </label>
  </div>
  <div class="buttHol" v-if="!phoneMode">
    <router-link to="/gameslist/best_rated" v-on:click="storeString('score')">Score</router-link>
    <router-link to="/gameslist/graphics" v-on:click="storeString('graphics')">Graphics</router-link>
    <router-link to="/gameslist/story" v-on:click="storeString('story')">Story</router-link>
    <router-link to="/gameslist/playability" v-on:click="storeString('playability')">Playability</router-link>
    <router-link to="/gameslist/content" v-on:click="storeString('content')">Content</router-link>
    <router-link to="/gameslist/characters" v-on:click="storeString('characters')">Characters</router-link>
  </div>
  <div v-else :class="hamburger" @click="phoneModeSwitch"><button>Links</button></div>

</template>

<script>

export default {
  data() {
    return {
      category: 'score',
      test: '✰✰✰✰✰',
      searchValue: '',
      phoneMode: false,
      hamburgerClass: 'button'
    };
  },
  created: function() {
    this.load();
  },
  computed: {
    hamburger() {
      return this.hamburgerClass;
    }
  },
  methods: {
    storeString(str){
      this.category = str;
      this.$store.dispatch("sortedGames", str);
    },
    async load(){
      await this.$store.dispatch("sortedGames", "score");
      //console.log("Is it ready?(load): "+this.$store.getters.games);
      this.$store.commit("gameListReady", true);
    },
    async searchGames() {
      // await this.$store.dispatch("searchAction", this.searchValue);
      //  :key="$route"
      // this.$router.push({ path: '/search/' + this.searchValue});
      this.$router.push({ name: 'search', params: { search: this.searchValue}});
      this.$store.commit('searchListReady', true);
      
    },
    phoneModeSwitch() {
      this.phoneMode = !this.phoneMode;
    }
  },
}
</script>

<style scoped>
.sHol{
  flex: 33%;
}
.searchbarholder{
  margin: 15% 2rem 15% 3rem;
  float: left;
}
.buttHol{
  flex: 33%;
}
nav {
  right: 118px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  height: 5rem;
  /*max-width: 69.5rem;*/
  margin: auto;
  /*gap: 23.5rem;*/
  /* box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.26); */
}

select {
  margin-left: 1rem;
}

input {
  display:flex;
  text-align: center;
  justify-self: center;
  width: 20rem;
  margin-left: auto;
  border-radius: 10px;
}

button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background-color: #FF004A;
  color: #fff;
  border: 0.5px solid rgb(228, 225, 225);
  cursor: pointer;
  /* border-radius: 30px; */
  margin-right: 0.5rem;
  display: inline-block;
}

a {

  border-radius: 20px;
  width: 8rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background-color: #FF004A;
  color: #fff;
  /*border: 1px solid black;*/
  box-shadow: 0px 0px 3px 1px #818181;
  cursor: pointer;
  /* border-radius: 30px; */
  margin-right: 0.5rem;
  display: inline-block;
  text-align: center;
}

a:hover {
  background-color: #B0004A;
  border-color: black;
}

.is-active {
  background-color: #B0004A;
  border-color: black;
  border-width: 1.5px;
}
</style>