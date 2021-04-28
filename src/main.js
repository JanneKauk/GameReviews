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
            game: null,
            gameListReady: false
        }
    },
    mutations: {
        sortGames (state, payload) {
            state.gameList = payload;
            console.log(this.getters.games);
        },
        giveString(state, payload) {
            state.querString = payload;
        },
        querySingleGame(state, payload) {
            //console.log(state);
            //console.log(payload);
            axios.get('http://localhost:8081/gamedetails?test=' + payload).then(res => {
                //console.log(res.data);
                state.game = res.data;
            })
        },
        gameListReady(state, payload){
            state.gameListReady = payload;
        }
    },
    actions: {
        async sortedGames (context, payload) {
            await axios.get('http://localhost:8081/games?sortby=' + payload).then(res => {
                context.commit('sortGames', res.data);
            })
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
        },
        ready (state){
            return state.gameListReady;
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
