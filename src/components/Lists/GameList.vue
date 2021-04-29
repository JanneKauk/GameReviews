<template >
  <div v-if="checkIfReady">
    <div class="container">
      <ul class="list-group">
        <GameListElem v-for="index in listLength" :key="index" :l-index="calcIndex(index)"></GameListElem>
        <nav aria-label="Page navigation example" class="paginationholder">
          <ul class="pagination" id="pages">
            <li class="page-item"><a class="page-link" v-on:click="updatePage(-1)">Previous</a></li>
            <li class="page-item"><a class="page-link" v-on:click="updatePage(+1)">Next</a></li>
          </ul>
        </nav>
      </ul>
    </div>
  </div>
</template>

<script>
import GameListElem from '@/components/Lists/GameListElem';
export default {
  name: "GameList",
  components:{
    GameListElem,
  },
  data() {
    return{
      page: 1,
      maxPages: 1,
      listLength: 5,
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
      let r = this.$store.getters.gamesReady;
      console.log("Is it ready?: "+r);
      if(r && !this.initialized) this.init();
      return r;
    },
    getList(){
      return this.$store.getters.games
    }
  },
  methods:{
    init(){
      console.log(this.$store.getters.games)
      let i = this.getList.length;
      this.finalListLength = i % 5
      if(i % 5 != 0){
        this.maxPages = Math.floor(i / 5)+1
      }
      else{
        this.maxPages = Math.floor(i / 5)
      }
      console.log("page num: "+this.pageNum+", max pages: "+this.maxPages+", last page list length: "+this.finalListLength)
      this.initialized = true;
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
.paginationholder{
  margin: auto;
}
.page-item{
  color: #DE004A;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>