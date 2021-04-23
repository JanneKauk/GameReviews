<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="game in gameList" v-bind:key="game.id">
        <div class="container">
          <h3 style="text-align: left">Platforms: {{ game.platforms }}<br>{{ game.name }}<br>{{ game.score }}</h3>
        </div>
        <img style="max-height: 100px" alt="" :src="'/img/'+game.image">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

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
    axios.get('http://localhost:8081/games?sortby=graphics').then(res => {
      this.gameList = res.data;
    })
  },
  methods:{
    sortGames: function(str){
      axios.get('http://localhost:8081/games?sortby='+str).then(res => {
        this.gameList = res.data;
      })
    }
  }
}
</script>

<style scoped>

</style>