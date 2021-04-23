<template>
  <div>
    <nav class="container">
      <div>
        <router-link to="/home" v-on:click="storeString('graphics')">Graphics</router-link>
        <router-link to="/notFound" v-on:click="storeString('score')"> Not Found link</router-link>
        <router-link to="/home">Graphics</router-link>
        <router-link to="/notFound"> Not Found link</router-link>
        <router-link to="/home">Graphics</router-link>
        <!-- <label for="category"></label>
        <select id="category" name="category" v-model="category">
        <option value="Graphics">Graphics</option>
        <option value="Gameplay">Gameplay</option>
      </select> -->
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
      category: 'Graphics',
      test: '✰✰✰✰✰'
    };
  },
  methods: {
    storeString(str){
      this.$store.dispatch("sortedGames", str);
    }
  }
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

a:hover,
a:active {
  background-color: blue;
  border-color: black;

}
</style>