<template>
    <div>
        <div v-if="open" class="backdrop" @click="$emit('close')"></div>
        <transition name="modal">
            <dialog open v-if="open">
                <form @submit.prevent="submitForm">
                    <div>
                        <star-rating :category="'test'" :rating="'rating'"></star-rating>
                    </div>
                    <div class="storyStars">
                        <input type="radio" class="storyStar" name="story" id="'story1'" value="1"/><label @click="allStars(1)" :class="'fa fa-star ' + storyComputed.first" for="'story1'"></label>
        
                        <input type="radio" class="storyStar" name="story" id="'story2'" value="2"/><label @click="allStars(2)" :class="'fa fa-star ' + storyComputed.second" for="'story2'"></label>
        
                        <input type="radio" class="storyStar" name="story" id="'story3'" value="3"/><label @click="allStars(3)" :class="'fa fa-star ' + storyComputed.third" for="'story3'"></label>
                        
                        <input type="radio" class="storyStar" name="story" id="'story4'" value="4" /><label @click="allStars(4)" :class="'fa fa-star ' + storyComputed.fourth" for="'story4'"></label>

                        <input type="radio" class="storyStar" name="story" id="'story5'" value="5" /><label @click="allStars(5)" :class="'fa fa-star ' + storyComputed.fifth" for="'story5'"></label>
                    </div>
                    <div class="contentStars">
                        <input type="radio" class="contentStar" name="content" id="'content1'" value="1"/><label @click="changeClass(1)" :class="'fa fa-star ' + allStars(1)" for="'content1'"></label>
        
                        <input type="radio" class="contentStar" name="content" id="'content2'" value="2"/><label @click="changeClass(2)" :class="'fa fa-star ' + allStars(2)" for="'content2'"></label>
        
                        <input type="radio" class="contentStar" name="content" id="'content3'" value="3"/><label @click="changeClass(3)" :class="'fa fa-star ' + allStars(3)" for="'content3'"></label>
                        
                        <input type="radio" class="contentStar" name="content" id="'content4'" value="4" /><label @click="changeClass(4)" :class="'fa fa-star ' + allStars(4)" for="'content4'"></label>

                        <input type="radio" class="contentStar" name="content" id="'content5'" value="5" /><label @click="changeClass(5)" :class="'fa fa-star ' + allStars(5)" for="'content5'"></label>
                    </div>
                    <section class="form-section">
                        <div class="form-div">
                            <label for="title">title</label>
                            <input id="title" name="title" v.model.trim="title" />
                        </div>
                        <div class="form-div">
                            <label for="review">review</label>
                            <textarea id="review" name="review" rows="5" v.model.trim="review">

                            </textarea>
                        </div>
                    </section>
                    <button>Submit Review</button>
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
            storyRating: 0,
            storyArray: [1, 2, 3, 4, 5],
            storyLabel: {first: '', second: '', third: '', fourth: '', fifth: ''}
        };
    },
    computed: {
        storyComputed() {
            return this.storyLabel;
        }
    },
    methods: {
        changeClass(num) {
            console.log("checkbox clicked through label " + num + " " + this.storyLabel.first);
            
        },
        allStars(num) {
            if(num === 1) {
                this.storyLabel.first === 'checked';
                this.storyLabel.second === '';
                this.storyLabel.third === '';
                this.storyLabel.fourth === '';
                this.storyLabel.fifth === '';
                return 'checked';
            } else if (num === 2) {
                this.storyLabel.first === 'checked';
                this.storyLabel.second === 'checked';
                this.storyLabel.third === '';
                this.storyLabel.fourth === '';
                this.storyLabel.fifth === '';
            }else if (num === 3) {
                this.storyLabel.first === 'checked';
                this.storyLabel.second === 'checked';
                this.storyLabel.third === 'checked';
                this.storyLabel.fourth === '';
                this.storyLabel.fifth === '';
            } else if (num === 4) {
                this.storyLabel.first === 'checked';
                this.storyLabel.second === 'checked';
                this.storyLabel.third === 'checked';
                this.storyLabel.fourth === 'checked';
                this.storyLabel.fifth === '';
            } else if (num === 5) {
                this.storyLabel.first === 'checked';
                this.storyLabel.second === 'checked';
                this.storyLabel.third === 'checked';
                this.storyLabel.fourth === 'checked';
                this.storyLabel.fifth === 'checked';
            }
        }
    },
};

</script>


<style scoped>
.storyStar {
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
}

 button {
  border: 2px solid #DE004A;
  background-color: #DE004A;
  color: white;
  border-radius: 15px;
  font-family: inherit;
  margin: 3rem 0 0 0;
  cursor: pointer;
  display: inline-block;


  @media screen and (-ms-high-contrast: active) {
    border: 2px solid currentcolor;
  }
}


dialog {
    box-sizing: border-box;
}

label {
    margin: 1rem 0 1rem 0;
}

.form-div input {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
} 

.form-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;


}

.form-section {
    max-width: 30rem;
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
  top: 30vh;
  width: 30rem;
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