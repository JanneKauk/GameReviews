<template>
    <section>
        <base-card>
            <h2>Game Details</h2>
            <!-- <div>
                {{ selectedGame.id }}
            </div> -->
        </base-card>
        <add-review @close="hideDialog" :open="dialogIsVisible">
                <button @click="hideDialog">Close dialog</button>
        </add-review>
        <button @click="showDialog">Add Review</button>
        
    </section>
</template>


<script>
import AddReview from '../components/review/AddReview.vue';
export default {
    components: {
        AddReview
    },
    props: ['id'],
    data() {       
        return {
            selectedGame: null,
            dialogIsVisible: false,
        };
    },
    methods: {
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    }
  },
    computed: {
        //computed property for all game details that get put in template
    },
    created() {
        //Get games to this.selectedGame from vuex getter
        // this.selectedGame = this.$store.getters['games'].find((game) => game.id === this.id);
    }
}
</script>

<style scoped>


@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
