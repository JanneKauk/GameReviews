<template>
    <section v-if="readystate">
        <base-card>
            <div class="textandbutton">
                <div class="text">
                    <h3>{{ gameName }}</h3>
                    <p><br><b>{{"Platforms: "+ gamePlatforms }}<br>{{"Genres: "+getGame.genre}}<br>{{"Release date: "+date}}<br>{{"Publisher: "+getGame.publisher}}<br>{{"Developer: "+getGame.developer}}</b></p>
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
                    <ul class="ratings__ul">
                        <li><span class="categories"><strong>Score:</strong> </span><span class="Stars" :style="`--rating: ${gameScore}`">{{" &nbsp;"+gameScore}}</span></li>
                        <li><span class="categories">Graphics: </span><span class="Stars" :style="`--rating: ${gameGraphics}`">{{" &nbsp;"+gameGraphics}}</span></li>
                        <li><span class="categories">Characters: </span><span class="Stars" :style="`--rating: ${gameCharacters}`"> {{" &nbsp;"+gameCharacters}}</span></li>
                        <li><span class="categories">Story: </span><span class="Stars" :style="`--rating: ${gameStory}`">{{" &nbsp;"+gameStory}}</span></li>
                        <li><span class="categories">Content: </span><span class="Stars" :style="`--rating: ${gameContent}`">{{" &nbsp;"+gameContent}}</span></li>
                        <li><span class="categories">Playability: </span><span class="Stars" :style="`--rating: ${gamePlayability}`">{{" &nbsp;"+gamePlayability}}</span></li>
                    </ul>
                </div>
            </div>
            <add-review @close="hideDialog" :open="dialogIsVisible">
                <!-- <button @click="hideDialog">Close dialog</button> -->
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
            readystate: false
        };
    },
    methods: {
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    async load(){
      await this.$store.dispatch("querySingleGameAction", this.id)
      console.log("load"+this.$store.getters.getSingleGame)
      this.game = this.$store.getters.getSingleGame;
      await this.$store.dispatch("sortedReviews", this.gameId);
      //await this.$store.dispatch
      console.log("Is it ready?(load): "+this.$store.getters.reviews);
      this.readystate = true;
      this.$store.commit("reviewListReady", true);
    },
  },
    computed: {
        //computed property for all game details that get put in template
        gameId(){
          return this.game[0].id;
        },
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
        },
        getGame(){
          return this.game[0];
        },
        date(){
          // let date = new Date();
          let date = this.game[0].releaseDate.toString().slice(0,10);
          return date
        }
    },
    created() {
        this.readystate = false;
        this.load();
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

li {
    list-style: none;
    /* display: flex;
    flex-direction: row; */
    /* align-content: center; */
    padding: 10px;
    display: inline-block;
    text-align: initial;
    min-width: 15rem;
}

.categories {
    display: flex;
    font-size: 1.4rem;
    width: 100%;
    min-width: 5rem;
}

text{
    flex: 2;
}

button {
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    background-color: #FF004A;
    color: #fff;
    border: 0.5px solid rgb(228, 225, 225);
    cursor: pointer;
    /* border-radius: 30px; */
    /* margin-right: 0.5rem; */
    margin: 5rem 1rem 3rem 4rem;
    display: inline-block;
    /* max-width: 6rem;
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    margin: 5rem 1rem 3rem 4rem;
    padding: 0.15rem;
    background-color: #DE004A;
    color: #F7F3F3;
    flex: 1; */
}

button:hover {
    background-color: #B0004A;
    border-color: black;
}


.right-side {
    display: flex;
    flex-direction: column;
    flex: 5;
}

.ratings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    /* margin: 2rem 0 0 8rem; */
}

.ratings__ul {
    width: 80%;
    text-align: center;
    padding: 0;
    margin-left: 6rem;
}
.video {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0 1rem 0;
}

@media only screen and (max-width: 1090px)  {
    .video iframe {
        width: 30rem;
        height: 23rem;
        margin: 0 0 1rem 0;
    }
    .right-side {
        align-items: center;
        padding: 0;
        margin: 0;
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
    .ratings {
        margin: 0;
    }
    .ratings__ul {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        margin-left: 3rem;
    }
}

@media only screen and (min-width: 1090px) {
    .ratings {
        align-items: center;
        margin: 1rem -4rem 0 0;
        
    }
    .video {
        margin: 1rem 1rem 1rem 0;
    }
}

@media only screen and (min-width: 400px) and (max-width: 690px) {
    .video iframe {
        width: 20rem;
        height: 18rem;
        margin: 0 0 0 0;
    }
}

@media only screen and (max-width: 400px) {
    .video iframe {
        width: 15rem;
        height: 14rem;
        margin: 0 0 0 0;
    }
}

.Stars {
  --star-size: 30px;
  --star-color: #d7d7d7;
  --star-background: #fc0;
  --percent: calc(var(--rating) / 5 * 100%);
  --user-gradient: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
  display: flex;
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
