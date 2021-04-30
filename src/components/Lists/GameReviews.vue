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
      //console.log("Is it ready?(reviews): "+r);
      if(r && !this.initialized) this.init();
      return r;
    },
    getList(){
      return this.$store.getters.reviews
    }
  },
  methods:{
    init(){
      console.log(this.$store.getters.reviews)
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
      console.log("page num: "+this.pageNum+", max pages: "+this.maxPages+", last page list length: "+this.finalListLength)
    },
    updatePage(mod){
      if(this.getList!=null){
        this.page = this.pageNum + 1*mod;
        if(this.pageNum < 1) this.page = 1;
        if(this.pageNum > this.maxPages) this.page = this.maxPages;

        if(this.pageNum == this.maxPages){
          this.listLength = this.finalListLength
        }else this.listLength = 5
        console.log("Page num: "+this.pageNum);
      }
    },
    calcIndex(index){
      let trueIndex = ((this.pageNum-1)*5)+index-1;
      console.log("True index: "+trueIndex)//range goes 1 over the max
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

</style>
