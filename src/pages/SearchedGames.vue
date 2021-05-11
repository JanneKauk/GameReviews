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
/**
 * @vue-data {Boolean} loading - on load is true to wait for async action.
 * @vue-prop {String} search - string prop to get the searchbar string value. 
 * @vue-emits {Event} close - emits a click event that closes dialog.
 * @vue-computed {Object} getList - gets the list from vuex store with getter.
 * @vue-watch {} search - watches for url change when search activated
 * @vue-event {} load - async method that sets loading to true and dispatches an action
 * @vue-event {} created - calls the load method when created.
 */
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