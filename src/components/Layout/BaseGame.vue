<template>
  <div>
    <nav class="container">
      <div>
        {{test}}
        <button id="1" @click="starChange(1)">★</button>
        <button id="2" @click="starChange(2)">★</button>
        <button id="3" @click="starChange(3)">★</button>
        <button id="4" @click="starChange(4)">★</button>
        <button id="5" @click="starChange(5)">★</button>
        <router-link to="/home">Graphics</router-link>
        <router-link to="/notFound"> Not Found link</router-link>
        <label for="category"></label><select id="category" name="category" v-model="category">
        <option value="Graphics">Graphics</option>
        <option value="Gameplay">Gameplay</option>
      </select>
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
    starChange(id) {
      if (id === 1) {
        this.test = '★✰✰✰✰';
      } else if (id === 2){
        this.test = '★★✰✰✰';
      } else if (id === 3) {
        this.test = '★★★✰✰'
      } else if (id === 4){
        this.test = '★★★★✰';
      } else if (id === 5) {
        this.test = '★★★★★'
      }
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
  background: transparent;
  color: black;
}
</style>