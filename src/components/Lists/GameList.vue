<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="(game, index) in games" v-bind:key="game.id">
        <router-link style="text-decoration: none; color: #323232" :to="'/gamedetails/' + game.name" @click="storeName(game.name)">
          <div class="container">
            <h3 style="text-align: left">
              {{ index+1+" " }}{{ game.name }}<br>
              Platforms: {{ game.platforms }}<br>
              <div class="Stars" :style="`--rating: ${game.score}`">{{game.score}}
              </div>
            </h3>
          </div>
        </router-link>
        <img style="max-height: 100px" alt="" :src="'/img/'+game.image">
      </li>
      <nav aria-label="Page navigation example" class="paginationholder">
        <ul class="pagination" id="pages">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </ul>
  </div>
</template>

<script>

export default {
  name: "GameList",
  components:{

  },
  data() {
    return{
      page: 1,

    }
  },
  computed:{
    games(){
      return this.$store.getters.games
    },
    pagenum(){
      return this.page
    }
  },
  methods:{
    storeName(str) {
      this.$store.dispatch("querySingleGameAction", str)
    },
    updateListPage(){

    }
  }
}
</script>

<style scoped>
.list-group-item:hover{
  background-color: #f5f5f5;
}


:root {

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
.paginationholder{
  margin: auto;
}
.page-link{
  color:#394fffde;
}

</style>