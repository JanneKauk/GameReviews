<template>
 <base-card>
   <ul style="width: 95%">
     <h2>{{reviews[getIndex].username}}</h2>
     <li><span class="Categories">Graphics:</span><span class="Stars" :style="`--rating: ${reviews[getIndex].graphics}`">{{" "+reviews[getIndex].graphics}}</span></li>
     <li><span class="Categories">Characters:</span><span class="Stars" :style="`--rating: ${reviews[getIndex].characters}`">{{" "+reviews[getIndex].characters}}</span></li>
     <li><span class="Categories">Story:</span><span class="Stars" :style="`--rating: ${reviews[getIndex].story}`">{{" "+reviews[getIndex].story}}</span></li>
     <li><span class="Categories">Content:</span><span class="Stars" :style="`--rating: ${reviews[getIndex].content}`">{{" "+reviews[getIndex].content}}</span></li>
     <li><span class="Categories">Playability:</span><span class="Stars" :style="`--rating: ${reviews[getIndex].playability}`">{{" "+reviews[getIndex].playability}}</span></li>
     <br>
     <div class="form-group shadow-textarea">
       <label for="exampleFormControlTextarea6"><h4>{{ reviews[getIndex].title }}</h4></label>
       <textarea readonly class="form-control z-depth-1" v-text="reviews[getIndex].reviewtext" id="exampleFormControlTextarea6" rows="4" placeholder="Write something here..."></textarea>
     </div>
   </ul>
 </base-card>
</template>

<script>
/**
 * @vue-prop {Number} lIndex - List Index value
 * @vue-computed {Object} reviews - returns reviews json from vuex with getters
 * @vue-computed {Number} getIndex - returns lIndex, used to search for the review with that index from the review list
 */
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
.card {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.Categories{
  display: inline-block;
  min-width: 130px;
  font-size: 24px;
}
.shadow-textarea textarea.form-control::placeholder {
  font-weight: 300;
}
.shadow-textarea textarea:read-only{
  background: #fff;
}
.shadow-textarea textarea.form-control {
  padding-left: 0.8rem;
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