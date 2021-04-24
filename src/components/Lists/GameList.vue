<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="game in games" v-bind:key="game.id">
        <div class="container">
          <h3 style="text-align: left">Platforms: {{ game.platforms }}<br>{{ game.name }}<br>{{ game.score }}</h3>
        </div>
        <img style="max-height: 100px" alt="" :src="'/img/'+game.image">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GameList",
  components:{

  },
  data() {
    return {
      gameList: null,
    };
  },
  created: function() {
    this.gameList = this.$store.getters.games
  },
  computed:{
    games(){
      return this.gameList
    }
  }
}
</script>

<style scoped>
.list-group-item:hover{
  background-color: #f5f5f5;
}
</style>