<template>
    <div :class="rating">
        <input type="radio" @click="getValue" :name="category" :id="'star5'+cat" value="5" /><label :for="'star5'+cat">5</label>
        
        <input type="radio" @click="getValue" :name="category" :id="'star4'+cat" value="4"  /><label :for="'star4'+cat">4</label>
        
        <input type="radio" @click="getValue" :name="category" :id="'star3'+cat" value="3"  /><label :for="'star3'+cat">3</label>
        
        <input type="radio" @click="getValue" :name="category" :id="'star2'+cat" value="2"  /><label :for="'star2'+cat">2</label>

        <input type="radio" @click="getValue" :name="category" :id="'star1'+cat" value="1"  /><label :for="'star1'+cat">1</label><span>{{ cat+": " }}</span>
    </div>
    <div class="emitDiv">
        <button @click="getValue" class="emitButton"></button> <!--Don't remove div or button. Needed for second event. -->
    </div>
</template>


<script>
export default {
    props: ['category', 'rating', 'id'],
    
    data() {
        return {

        };
    },
    methods: {
        getValue(event) {
            this.$emit('click', event.target.value, this.category);
        },
    },
    computed: {
      cat() {
        return this.category;
      },
    }
}
</script>

<style scoped>

.emitButton,
.emitDiv {
    visibility: hidden;
    height: 0;
}

.rating {
    /*float:left;*/
  /*text-align: center;*/

}
div span{
  font-size: 22px;
  text-align: left;
  display: inline-block;
  min-width: 28%;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.7;
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
 /*:not(:checked) is a filter, so that browsers that don’t support :checked don’t
   follow these rules. Every browser that supports :checked also supports :not(), so
   it doesn’t make the test unnecessarily selective*/
 .rating:not(:checked) > input {
    clip:rect(0,0,0,0);
}
.rating input{
  position:absolute;
  top:-9999px;
}

.rating:not(:checked) > label {
    /*float:right;*/
    width:1em;
    padding:0 .1em;
    overflow:hidden;
    white-space: nowrap;
    cursor:pointer;
    font-size:170%;
    line-height:1;
    color:#ddd;
    text-shadow:1px 1px #bbb, 2px 2px #666, .1em .1em .2em rgba(0,0,0,.5);
}

.rating:not(:checked) > label:before {
    content: '★ ';
}

.rating > input:checked ~ label {
    color: #f70;
    text-shadow:1px 1px #c60, 2px 2px #940, .1em .1em .2em rgba(0,0,0,.5);
}
.rating{
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
  line-height: 0;
}

.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
    color: gold;
    text-shadow:1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5);
}

.rating > input:checked + label:hover,
.rating > input:checked + label:hover ~ label,
.rating > input:checked ~ label:hover,
.rating > input:checked ~ label:hover ~ label,
.rating > label:hover ~ input:checked ~ label {
    color: #ea0;
    text-shadow:1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5);
}

.rating > label:active {
    position:relative;
    top:2px;
    left:2px;
}
</style>