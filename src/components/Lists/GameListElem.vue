<template>
  <li class="list-group-item d-flex justify-content-between">
    <router-link style="text-decoration: none; color: #323232" :to="'/gamedetails/' + games[getIndex].name" @click="storeName(games[getIndex].name)">
      <div class="container">
        <h3 style="text-align: left">
          {{getIndex+1+": "}}{{ games[getIndex].name }}<br>
          Platforms: {{ games[getIndex].platforms }}<br>
          <span class="Stars" :style="`--rating: ${games[getIndex].score}`">{{games[getIndex].score}}
          </span>
        </h3>
      </div>
    </router-link>
    <img style="max-height: 100px" alt="" :src="'/img/'+games[getIndex].image">
  </li>
</template>

<script>
export default {
  name: 'GameListElem',
  props:{
    lIndex:{
      type: Number,
      required: true
    }
  },
  computed:{
    games(){
      return this.$store.getters.games
    },
    getIndex(){
      return this.lIndex;
    },
  },
  methods:{
    storeName(str) {
      this.$store.dispatch("querySingleGameAction", str)
    },
  }
};
</script>


<style scoped>

.list-group-item:hover{
  background-color: #f5f5f5;
}

.Stars {
  --star-size: 30px;
  --star-color: #d7d7d7;
  --star-background: #fc0;
  --percent: calc(var(--rating) / 5 * 100%);
  --user-gradient: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
  display: inline-block;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: var(--star-size);
  line-height: 1;
}
.Stars::before {
  content: "★★★★★";
  letter-spacing: 3px;
  background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

body {
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

* {
  position: relative;
  box-sizing: border-box;
}

.page-link{
  color:#394fffde;
}

</style>