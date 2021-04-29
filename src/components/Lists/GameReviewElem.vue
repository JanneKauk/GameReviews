<template>
 <base-card>
   <ul>
     <h2>{{reviews[getIndex].username}}</h2>
     <li>Graphics: <span class="Stars" :style="`--rating: ${reviews[getIndex].graphics}`">{{" "+reviews[getIndex].graphics}}</span></li>
     <li>Graphics: <span class="Stars" :style="`--rating: ${reviews[getIndex].story}`">{{" "+reviews[getIndex].story}}</span></li>
     <li>Graphics: <span class="Stars" :style="`--rating: ${reviews[getIndex].characters}`">{{" "+reviews[getIndex].characters}}</span></li>
     <li>Graphics: <span class="Stars" :style="`--rating: ${reviews[getIndex].content}`">{{" "+reviews[getIndex].content}}</span></li>
     <li>Graphics: <span class="Stars" :style="`--rating: ${reviews[getIndex].playability}`">{{" "+reviews[getIndex].playability}}</span></li>
     <textarea v-text="reviews[getIndex].reviewtext" readonly></textarea>
   </ul>
 </base-card>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard';
export default {
  name: 'GameReviewElem',
  components: {BaseCard},
  props:{
    lIndex:{
      type: Number,
      required: true
    }
  },
  computed:{
    reviews(){
      return this.$store.getters.reviews;
    },
    getIndex(){
      return this.lIndex;
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
ul{
  list-style: none;
  text-align: left;
}

</style>