<template>
    <section class="container" v-if="checkIfReady">
      <base-card style="margin: auto" v-if="getList.length < 1">
        <h1 style="margin: auto">No reviews</h1>
      </base-card>
      <ul v-else class="list-group">
        <GameReviewElem v-for="index in listLength" :key="index" :l-index="calcIndex(index)"></GameReviewElem>
        <nav aria-label="Page navigation example" class="paginationholder" v-if="getList.length > 5">
          <ul class="pagination" id="pages">
            <li class="page-item"><a class="page-link" v-on:click="updatePage(-1)">Previous</a></li>
            <li class="page-item"><a class="page-link" v-on:click="updatePage(+1)">Next</a></li>
          </ul>
        </nav>
      </ul>
    </section>
</template>

<script>
/**
 * @vue-data {Number} page - Current page
 * @vue-data {Number} maxPages - How many pages there are
 * @vue-data {Number} listLength - How many items the list displays on each page
 * @vue-data {Number} finalListLength - How many items the last page contains
 * @vue-data {Boolean} initialized - Has the initialization been completed
 * @vue-computed {Number} pageNum - returns what page we are on
 * @vue-computed {Number} getIndex - returns the index of the current iteration from the GameReviewElem loop
 * @vue-computed {Boolean} checkIfReady - returns ready and runs initialization if review list has been received from the server
 * @vue-computed {Object} getList - returns review list from a vuex variable in main.js with getters
 * @vue-method init - calculates maxPages, finalListLength and sets initialized to true
 * @vue-method updatePage(mod) - changes page based on next and previous buttons and changes listLenght to finalListLength if on last page
 * @vue-method calcIndex(index) - takes iteration and changes to real index of the game list, used to pass the true index to GameReviewElem
 */
import GameReviewElem from '@/components/Lists/GameReviewElem';
import BaseCard from '@/components/ui/BaseCard';
export default {
  name: "GameReviews",
  components:{
    BaseCard,
    GameReviewElem,
  },
  data() {
    return{
      page: 1,
      maxPages: 1,
      listLength: 0,
      finalListLength: 0,
      initialized: false
    }
  },
  computed:{
    pageNum(){
      return this.page
    },
    getIndex(){
      return this.index
    },
    checkIfReady(){
      let r = this.$store.getters.reviewsReady;
      if(r && !this.initialized) this.init();
      return r;
    },
    getList(){
      return this.$store.getters.reviews
    }
  },
  methods:{
    init(){
      let i = this.getList.length;
      this.finalListLength = i % 5
      if(i % 5 != 0){
        this.maxPages = Math.floor(i / 5)+1
      }
      else{
        this.maxPages = Math.floor(i / 5)
      }
      this.initialized = true;
      this.updatePage(0)
    },
    updatePage(mod){
      if(this.getList!=null){
        this.page = this.pageNum + 1*mod;
        if(this.pageNum < 1) this.page = 1;
        if(this.pageNum > this.maxPages) this.page = this.maxPages;

        if(this.pageNum == this.maxPages){
          this.listLength = this.finalListLength
        }else this.listLength = 5
      }
    },
    calcIndex(index){
      let trueIndex = ((this.pageNum-1)*5)+index-1;
      return trueIndex;
    }
  }
}
</script>

<style scoped>
ul {
    list-style: none;
}
.paginationholder{
  margin: auto;
}
.page-item{
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #DE004A;
}

.container {
margin-bottom: 2.5rem;
}

</style>
