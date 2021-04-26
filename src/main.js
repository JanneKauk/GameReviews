import { createApp} from 'vue';
import App from './App.vue'
import router from './router.js';



import { createStore } from 'vuex';

import LoginSignup from './components/registration/LoginSignup.vue';

import axios from 'axios';
const store = createStore( {
    state(){
        return {
            gameList: null,
            querString: '',
            game: null
        }
    },
    mutations: {
        sortGames (state, payload) {
            console.log(payload);
            axios.get('http://localhost:8081/games?sortby=' + payload).then(res => {
                state.gameList = res.data;
            })
        },
        giveString(state, payload) {
            state.querString = payload;
        },
        querySingleGame(state, payload) {
            console.log(state);
            console.log(payload);
            axios.get('http://localhost:8081/gamedetails?test=' + payload).then(res => {
                console.log(res);
                state.game = res.data;
            })
        }
    },
    actions: {
        sortedGames (context, payload) {
            context.commit('sortGames', payload);
        },
        giveString(context, payload) {
            context.commit('giveString', payload);
        },
        querySingleGameAction(context, payload) {
            context.commit('querySingleGame', payload);
        }
    },
    getters: {
        games (state) {
            return state.gameList;
        },
        getString(state){
            return state.querString;
        },
        getSingleGame(state) {
            return state.game;
        }
    }
});

import TheHeader from "./components/Layout/TheHeader.vue";
import BaseCard from './components/ui/BaseCard.vue';

const app = createApp(App);
app.use(store);
app.component('the-header', TheHeader);
app.component('login-signup', LoginSignup);
app.component('base-card', BaseCard);

app.use(router);
app.mount("#app");
