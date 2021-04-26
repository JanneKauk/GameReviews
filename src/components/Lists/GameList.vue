<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between" v-for="game in games" v-bind:key="game.id">
        <div class="container">
          <h3 style="text-align: left">
            Platforms: {{ game.platforms }}<br>
            {{ game.name }}<br>
            <div class="Stars" style="--rating: 5" aria-label="Rating of this product is 2.3 out of 5."></div>
          </h3>
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

    };
  },
  created: function() {
    this.gameList = this.$store.getters.games
  },
  computed:{
    games(){
      return this.$store.getters.games
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
  --star-size: 40px;
  --star-color: #fff;
  --star-background: #fc0;
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
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

</style>