<template>
    <section>
        <base-card>
            <div class="textandbutton">
                <div class="text">
                    <h3>{{ gameName }}</h3>
                    <p>{{ gamePlatforms }}</p>
                    <p>{{ gameSummary }}</p>
                </div>
                <div class="review">
                    <button @click="showDialog">Add Review</button>
                </div>
            </div>
            <div class="right-side">
                <div class="video">
                    <iframe width="420" height="345" :src="'https://www.youtube.com/embed/' + gameUrl"></iframe>
                </div>
                <div class="ratings">
                    <label>Score: 
                        <div class="Stars" :style="`--rating: ${gameScore}`">{{" "+gameScore}}</div>
                    </label>
                    <label>Graphics: 
                        <div class="Stars" :style="`--rating: ${gameGraphics}`">{{" "+gameGraphics}}</div>
                    </label>
                    <label>Characters: 
                        <div class="Stars" :style="`--rating: ${gameCharacters}`">{{" "+gameCharacters}}</div>
                    </label>
                    <label>Story: 
                        <div class="Stars" :style="`--rating: ${gameStory}`">{{" "+gameStory}}</div>
                    </label>
                    <label>Content: 
                        <div class="Stars" :style="`--rating: ${gameContent}`">{{" "+gameContent}}</div>
                    </label>
                    <label>Playability: 
                        <div class="Stars" :style="`--rating: ${gamePlayability}`">{{" "+gamePlayability}}</div>
                    </label>
                    
                    
                    
                </div>
            </div>
            <add-review @close="hideDialog" :open="dialogIsVisible">
                <button @click="hideDialog">Close dialog</button>
            </add-review>
            
        </base-card>  
        <game-reviews></game-reviews>    
    </section>
</template>


<script>
import AddReview from '../components/review/AddReview.vue';
import GameReviews from '../components/Lists/GameReviews.vue';
export default {
    components: {
        AddReview,
        GameReviews
    },
    props: ['id'],
    data() {       
        return {
            dialogIsVisible: false,
            game: null,
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
        gameName() {
           return this.game[0].name;
        },
        gamePlatforms() {
            return this.game[0].platforms;
        },
        gameScore() {
            return this.game[0].score;
        },
        gameGraphics() {
            return this.game[0].graphics;
        },
        gameCharacters() {
            return this.game[0].characters;
        },
        gameStory() {
            return this.game[0].story;
        },
        gameContent() {
            return this.game[0].content;
        },
        gamePlayability() {
            return this.game[0].playability;
        },
        gameUrl() {
            return this.game[0].video;
        },
        gameSummary() {
            return this.game[0].summary;
        }
    },
    created() {
        this.game = this.$store.getters.getSingleGame;
    }
}
</script>

<style scoped>
.textandbutton {
    display: flex;
    flex-direction: column;
    flex: 4;
    text-align: left;
    margin: 2rem 0 0 2rem;
    justify-content: space-between;
}



text{
    flex: 2;
}

button {
    max-width: 6rem;
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    margin: 5rem 1rem 3rem 4rem;
    padding: 0.15rem;
    background-color: #DE004A;
    color: #F7F3F3;
    /* align-self: flex-end; */
    flex: 1;
}


.right-side {
    display: flex;
    flex-direction: column;
    flex: 5;
}

.ratings {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 2rem 5rem 0 5rem;
}

.video {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 1rem 0 0;
}

@media only screen and (max-width: 1090px) {
    .video iframe {
        width: 280px;
        height: 200px;
    }
    .right-side {
        align-items: center;
    }
    .text {
        font-size: 1rem;
    }
    .review {
    align-self: center;
    }

    button {
        margin: 5rem 2rem 3rem 0;
    }
    
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
