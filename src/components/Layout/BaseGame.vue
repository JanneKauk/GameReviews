<template>
  <div>
    <nav class="container">
      <div>
        <router-link to="/gameslist/best_rated" v-on:click="storeString('score')">Score</router-link>
        <router-link to="/gameslist/graphics" v-on:click="storeString('graphics')">Graphics</router-link>
        <router-link to="/gameslist/story" v-on:click="storeString('story')">Story</router-link>
        <router-link to="/gameslist/playability" v-on:click="storeString('playability')">Playability</router-link>
        <router-link to="/gameslist/content" v-on:click="storeString('content')">Content</router-link>
        <router-link to="/gameslist/characters" v-on:click="storeString('characters')">Characters</router-link>
      </div>
      <div>
        <label>
          <input id="searchbar" placeholder="search" />
        </label>
      </div>
    </nav>
  </div>

</template>

<script>

export default {
  data() {
    return {
      category: 'score',
      test: '✰✰✰✰✰'
    };
  },
  created: function() {
    this.$store.dispatch("sortedGames", "score");
  },
  methods: {
    storeString(str){
      this.category = str;
      this.$store.dispatch("sortedGames", str);
    },
  },
}
</script>

<style scoped>

nav {
  display: flex;
  align-items: center;
  background-color: white;
  height: 5rem;
  /*max-width: 69.5rem;*/
  margin: auto;
  /*gap: 23.5rem;*/
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.26);
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
  background-color: transparent;
  border: none;
}

a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: black;
  border: 0.5px solid rgb(228, 225, 225);
  cursor: pointer;
  /* border-radius: 30px; */
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover {
  background-color: #f5f5f5;
  border-color: black;
}

.is-active {
  background-color: #f5f5f5;
  border-color: black;
}
</style>