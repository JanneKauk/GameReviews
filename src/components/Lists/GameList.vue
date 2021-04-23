<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="user in gameList" v-bind:key="user.id">
        <div class="container">
          <h3 style="text-align: left">Platforms: PC, PS4<br>Game Name<br>☆☆☆☆☆</h3>
        </div>
        <img style="max-height: 100px" alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F2%2F2b%2FBallistics_(video_game).jpg&f=1&nofb=1">
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
    axios.get('http://localhost:8081/games').then(res => {
      this.gameList = res.data;
    })
  }
}
</script>

<style scoped>

</style>