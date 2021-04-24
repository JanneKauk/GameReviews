<template>
    <section>
        <base-card>
            <h2>Game Details</h2>
        </base-card>
    </section>
</template>


<script>
export default {
    props: ['id'],
    data(){
        return {
            selectedGame: null,
        };
    },
    computed: {
        //computed property for all game details that get put in template
    },
    created() {
        //Get games to this.selectedGame from vuex getter
    }
}
</script>