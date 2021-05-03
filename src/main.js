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
            reviewListReady: false,
            user: null,
            reviewList: null,
            searchResult: null,
            searchListReady: false,
            isLoggedIn: false
        }
    },
    mutations: {
        sortGames (state, payload) {
            state.gameList = payload;
            //console.log(this.getters.games);
        },
        sortReviews (state, payload){
            state.reviewList = payload;
            //console.log(this.getters.reviews);
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
        reviewListReady(state, payload){
            state.reviewListReady = payload;
        },
        authenticatedUser(state, payload) {
            state.user = payload;
            state.isLoggedIn = true;
        },
        searchMutation(state, payload) {
            state.searchResult = payload;
        },
        searchListReady(state, payload) {
            state.searchListReady = payload;
        }

    },
    actions: {
        async sortedGames (context, payload) {
            await axios.get('http://localhost:8081/games?sortby=' + payload).then(res => {
                context.commit('sortGames', res.data);
            })
        },
        async sortedReviews (context, payload){
            await axios.get('http://localhost:8081/gamereviews?sortby=' + payload).then(res => {
                context.commit('sortReviews', res.data);
            })
        },
        giveString(context, payload) {
            context.commit('giveString', payload);
        },
        async querySingleGameAction(context, payload) {
            await axios.get('http://localhost:8081/gamedetails?test=' + payload).then(res => {
                console.log("single query: "+res.data);
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
                context.dispatch('loginUser', {email: payload.email, password: payload.password});
                // context.commit('authenticatedUser', res.data)
            }).catch((error) => {
                console.log("error");
                console.log(error.res);
            }
            )
        },
        async searchAction(context, payload) {
            console.log("searchAction" + " " + payload);
            await instance.post('/search?search=' + payload).then(res => {
                console.log(res.data);
                context.commit('searchMutation', res.data)
            }).catch((error) => {
                console.log("error in action");
                console.log(error.res);
            }
            )
        },
        async addReview(context, payload) {
            console.log("addReviewAction " + payload)
            await instance.post('/addreview', {
                title: payload.title,
                review: payload.review,
                playability: payload.playability,
                story: payload.story,
                content: payload.content,
                graphics: payload.graphics,
                characters: payload.characters,
                userID: context.getters.getUser.userID,
                gameID: context.getters.getSingleGame[0].id

            }).then(res => {
                console.log("return from POST")
                console.log(res.data)
            }).catch((error) => {
                console.log('error??')
                console.log(error.res);
            })
        }
    },
    getters: {
        games (state) {
            return state.gameList;
        },
        reviews(state){
            return state.reviewList;
        },
        getString(state){
            return state.querString;
        },
        getSingleGame(state) {
            return state.game;
        },
        gamesReady (state){
            return state.gameListReady;
        },
        reviewsReady(state){
            return state.reviewListReady;
        },
        getUser(state) {
            return state.user;
        },
        getSearchResult(state) {
            return state.searchResult;
        },
        getSearchReady(state) {
            return state.searchListReady;
        },
        getIsLoggedIn(state) {
            return state.isLoggedIn;
        }
    }
});

import TheHeader from "./components/Layout/TheHeader.vue";
import BaseCard from './components/ui/BaseCard.vue';
// import TheFooter from './components/Layout/TheFooter.vue';

const app = createApp(App);
app.use(store);
app.component('the-header', TheHeader);
app.component('login-signup', LoginSignup);
app.component('base-card', BaseCard);
// app.component('the-footer', TheFooter);

app.use(router);
app.mount("#app");
