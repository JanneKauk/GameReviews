import { createApp} from 'vue';
import App from './App.vue'
import router from './router.js';



import { createStore } from 'vuex';

import LoginSignup from './components/registration/LoginSignup.vue';

import axios from 'axios';
const instance = axios.create({baseURL: 'http://localhost:8081'});
const store = createStore( {
    state(){
        return {
            gameList: null,
            querString: '',
            game: null,
            gameListReady: false,
            user: null,

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
            // console.log("here");
            // let temp = payload.replace(/\s+/g, '-');
            state.game = payload;
            // axios.get('http://localhost:8081/gamedetails?test=' + temp).then(res => {
            //     //console.log(res.data);
            //     state.game = res.data;
            // })
        },
        gameListReady(state, payload){
            state.gameListReady = payload;
        },
        authenticatedUser(state, payload) {
            state.user = payload;
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
        async querySingleGameAction(context, payload) {
            axios.get('http://localhost:8081/gamedetails?test=' + payload).then(res => {
                //console.log(res.data);
                context.commit('querySingleGame', res.data);
            })
            
        },
        async loginUser(context, payload) {
            console.log(payload.email);
            console.log(payload.password);
            console.log("here");
            

            await instance.post('/login', {email: payload.email, password: payload.password}).then(res => {

                console.log(res.data);
                context.commit('authenticatedUser', res.data)
            }).catch((error) => {
                    console.log("error in action");
                    console.log(error.res);
                }
            )
        },
        async signupUser(context, payload) {
            console.log("SIGNUPUSER");
            await instance.post('/register', { email: payload.email, username: payload.username, password: payload.password }).then(res => {

                console.log(res.data);
                context.commit('authenticatedUser', res.data)
            }).catch((error) => {
                console.log("error");
                console.log(error.res);
            }
            )
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
        },
        getUser(state) {
            return state.user;
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
