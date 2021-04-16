<template>
  <div>
    <nav>
      <div>
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
      category: 'Graphics'
    };
  },
}
</script>

<style scoped>

nav {
  display: flex;
  align-items: center;
  background-color: white;
  height: 5rem;
  max-width: 80rem;
  margin: auto;
  gap: 23.5rem;

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
</style>