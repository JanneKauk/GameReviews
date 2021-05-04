<template>
    <div>
        <div v-if="open" class="backdrop" @click="$emit('close')"></div>
        <transition name="modal">
            <dialog open v-if="open">
                <form @submit.prevent="addReview">
                    <div class="container">
                      <h2 style="margin: 2rem 0 2rem 0">Game Review</h2>
                      <star-rating @click="starValue" :category="'Graphics'" :rating="'rating'"></star-rating>
                      <star-rating @click="starValue" :category="'Characters'" :rating="'rating'"></star-rating>
                      <star-rating @click="starValue" :category="'Story'" :rating="'rating'"></star-rating>
                      <star-rating @click="starValue" :category="'Content'" :rating="'rating'"></star-rating>
                      <star-rating @click="starValue" :category="'Playability'" :rating="'rating'"></star-rating>
                      <br>
                    </div>
                  <section class="form-section">
                        <div class="form-div">
                            <input placeholder="The header for your review." :class="isInvalid" id="title" name="title" v-model.trim="title" />
                        </div>
                        <div class="form-div">
                            <textarea placeholder="Write your thoughts on the game here." :class="isInvalid" id="review" name="review" rows="5" v-model.trim="review">

                            </textarea>
                        </div>
                    </section>
                    <button type="submit">Submit Review</button>
                    <p v-if="!isValid" class="invalid">Make sure to not leave anything empty</p>
                    <p v-if="failed" class="invalid">Please log in to submit a review</p>
                    <slot></slot>
                </form>
            </dialog>
        </transition>
    </div>
</template>

<script>
import StarRating from '../rating/StarRating.vue';
export default {
    props: ['open'],
    emits: ['close'],
    components: {
        StarRating
    },
    data() {
        return {
            title: '',
            review: '',
            graphics: null,
            characters: null,
            story: null,
            content: null,
            playability: null,
            isValid: true,
            failed: false
        };
    },
    computed: {
        storyComputed() {
            return this.storyLabel;
        },
        isInvalid() {
             if(!this.isValid) {
                 return 'invalidinput';
             }else {
                 return '';
             }
        }
    },
    methods: {
        starValue(value, value2) {
            console.log("" + value + " " + value2);
            switch(value2.toLowerCase()) {
                case 'graphics':
                    this.graphics = value;
                    // console.log('graphics');
                    break;
                case 'characters':
                    this.characters = value;
                    // console.log('characters');
                    break;
                case 'story':
                    this.story = value;
                    // console.log('Story');
                    break;
                case 'content':
                    this.content = value;
                    // console.log('content');
                    break;
                case 'playability':
                    this.playability = value;
                    // console.log('playability');
                    break;
                default:
                    console.log('default case. Something went wrong');
                    break;
            }
        },
        async addReview() {
            this.failed = false;
            this.isValid = true;
            if(this.playability === null || this.story === null || this.content === null ||
                this.characters === null ||this.graphics === null || this.title === '' || this.review === '') {
                    this.isValid = false;
                    return;
                }
            console.log(this.playability + " " + this.story + " " + this.content + " " + this.graphics + " " + this.characters);
            console.log("title: " + this.title + "\nreview: " + this.review);

            try {
            await this.$store.dispatch('addReview', {
                title: this.title,
                review: this.review,
                playability: this.playability,
                story: this.story,
                content: this.content,
                graphics: this.graphics,
                characters: this.characters
            }); 
            this.failed = false;
            this.$emit('close');
            this.title = '';
            this.review = '';
            } catch (error) {
                this.failed = true;
                console.log(JSON.stringify(error));
            }
            
        }
    },
};

</script>


<style scoped>

.invalid{
    color: red;
}

.invalidinput {
    border-color: red;
}
/*.storyStar {
 visibility: hidden;
}

.storyStars .checked {
    color: orange;
}
.checked {
    color: orange;
}

.checked:hover {
    color: red;
}*/

 button {
  border: 2px solid #DE004A;
  background-color: #DE004A;
  color: white;
  border-radius: 15px;
  font-family: inherit;
  margin: 3rem 0 0 0;
  cursor: pointer;
  display: inline-block;

}
@media screen and (-ms-high-contrast: active) {
    button {
        border: 2px solid currentcolor;
    }
  }

dialog {
    box-sizing: border-box;
}

label {
    margin: 1rem 0 1rem 0;
}

.form-div input,
.form-div textarea {
    display: flex;
    width: 100%;
    font: inherit;
    /* border: 1px solid #ccc; */
    padding: 0.15rem;
} 
.form-div input:focus,
.form-div textarea:focus {
    border-color: 1px solid black;
    outline: none;
}

.form-div {
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  align-items: center;*/
  /*  margin: auto;*/
  margin-top: 0.5rem;
  width: 90%;
}

.form-section {
    max-width: 50rem;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

form {
    display:flex;
    flex-direction: column;
    align-items: center;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 15vh;
  width: 33rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
}

.modal-enter-active {
    animation: modal 0.35s ease-out;
}
.modal-leave-active {
    animation: modal 0.35s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-150px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

</style>