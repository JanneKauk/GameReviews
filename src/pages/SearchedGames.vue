<template >
  <div >
    <div class="container">
      <ul class="list-group" v-if="!loading">
        <searched-element v-for="(game, index) in getList" 
        :key="index"
        :id="game.id"
        :name="game.name"
        :platforms="game.platforms"
        :score="game.score"
        :image="game.image"
        >
        </searched-element>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchedElement from '@/components/Lists/SearchedElement.vue';
export default {
  name: "SearchedGames",
  components:{
    SearchedElement,
  },
  props: ['search'],
  data() {
    return{
      loading: false,
    }
  },
  computed:{
    checkIfReady(){
      return this.$store.getters.getSearchReady;
      
    },
    getList(){
      return this.$store.getters.getSearchResult;
    }
  },
  methods:{
      async load() {
          this.loading = true;
          await this.$store.dispatch('searchAction', this.search);
          this.loading = false;
      }
  },
  watch: {
      search() {
          console.log("search triggered")
          this.load();
      }
  },
  created() {
      this.load();
  },
}
</script>

<style scoped>
.container {
    margin-top: 2rem;
    margin-bottom: 2.5rem;
}
</style>