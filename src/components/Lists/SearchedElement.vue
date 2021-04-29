<template>
  <li class="list-group-item d-flex justify-content-between">
    <router-link style="text-decoration: none; color: #323232; width: 100%" :to="'/gamedetails/' + name" @click="storeName(name)">
      <div style="display: flex">
        <div class="container">
          <h3 style="text-align: left">
            {{ name }}<br>
            Platforms: {{ platforms }}<br>
            <span class="Stars" :style="`--rating: ${score}`">{{" "+score}}
            </span>
          </h3>
        </div>
        <img style="max-height: 100px" alt="" :src="'/img/'+image">
      </div>
    </router-link>

  </li>
</template>

<script>
export default {
  name: 'SearchedElement',
  props: ['id', 'name', 'platforms', 'score', 'image'],
  computed:{
    games(){
      return this.$store.getters.getSearchResult;
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