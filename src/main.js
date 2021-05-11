import { createApp} from 'vue';
import App from './App.vue'
import router from './router.js';



import { createStore } from 'vuex';

import LoginSignup from './components/registration/LoginSignup.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;

const instance = axios.create({baseURL: 'http://localhost:8081'});
const store = createStore( {
    /**
     * @vuex-state {Object} gameList - Is set with get request and is used in GameList
     * @vuex-state {String} querString - Is set with get request
     * @vuex-state {Object} game - Is set with get request and is used in gameDetails
     * @vuex-state {Boolean} gameListReady - Is used to inform GameList
     * @vuex-state {Boolean} reviewListReady - Is used to inform GameReviews
     * @vuex-state {Object} user - set after login post request
     * @vuex-state {Object} reviewList - is set with get request and is used in GameReviews
     * @vuex-state {object} searchResult - is set with get request and is used in SearchedGames
     * @vuex-state {Boolean} searchListReady - 
     * @vuex-state {Boolean} isLoggedIn - gets set when user logs in
     */
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
            isLoggedIn: false,
            loginSuccess: false,
        }
    },
    mutations: {
        /**
         * 
         * @param {*} state 
         * @param {*} payload 
         */
        sortGames (state, payload) {
            state.gameList = payload;
        },
        /**
         * 
         * @param {*} state 
         * @param {*} payload 
         */
        sortReviews (state, payload){
            state.reviewList = payload;
        },
        /**
         *
         * @param {*} state
         * @param {*} payload
         */
        giveString(state, payload) {
            state.querString = payload;
        },
        /**
         *
         * @param {*} state
         * @param {*} payload
         */
        querySingleGame(state, payload) {
            state.game = payload;
        },
        /**
         *
         * @param {*} state
         * @param {*} payload
         */
        gameListReady(state, payload){
            state.gameListReady = payload;
        },
        /**
         *
         * @param {*} state
         * @param {*} payload
         */
        reviewListReady(state, payload){
            state.reviewListReady = payload;
        },
        /**
         * Sets the user to the payload to login the user. Also sets the isLoggedIn Boolean to true.
         * @param {*} state
         * @param {*} payload Has user info from a mutation that got it from action that got it from the database
         */
        authenticatedUser(state, payload) {
            if(payload !== 'Failed') {
                state.user = payload;
                state.isLoggedIn = true;
            } else {
                state.loginSuccess = false; 
            }
        },
        isAuth(state, payload) {
            if(payload.user) {
                state.user = payload.user[0];
                state.isLoggedIn = true;
            }
        },
        /**
         * Sets the searchResult state to the payload
         * @param {*} state
         * @param {Object} payload Object with all the results from the database
         */
        searchMutation(state, payload) {
            state.searchResult = payload;
        },
        /**
         * 
         * @param {*} state
         * @param {*} payload
         */
        searchListReady(state, payload) {
            state.searchListReady = payload;
        },
        /**
         * Sets the user to null to logout the user
         * @param {*} state
         */
        logoutUserMutation(state) {
            state.user = null;
            state.isLoggedIn = false;
        },


    },
    actions: {
        /** 
         * This action sends a get request to receive sorted games from the database
         * @param {*} context 
         * @param {string} payload Is a string from the url
         */
        async sortedGames (context, payload) {
            await axios.get('http://localhost:8081/games?sortby=' + payload).then(res => {
                context.commit('sortGames', res.data);
            })
        },
        /**
         * This action sends a get request to receive sorted reviews from the database
         * @param {*} context
         * @param {string} payload Is a string from the url
         */
        async sortedReviews (context, payload){
            await axios.get('http://localhost:8081/gamereviews?sortby=' + payload).then(res => {
                context.commit('sortReviews', res.data);
            })
        },
        /**
         * This action commits a mutation that sets querString
         * @param {*} context
         * @param {*} payload
         */
        giveString(context, payload) {
            context.commit('giveString', payload);
        },
        /**
         * This action sends a get request to the server to search for a single game from the database
         * @param {*} context
         * @param {*} payload
         */
        async querySingleGameAction(context, payload) {
            await axios.get('http://localhost:8081/gamedetails?test=' + payload).then(res => {
                context.commit('querySingleGame', res.data);
            })
            
        },
        /**
         * This action sends a post request to /login to login the user if successful
         * @param {*} context
         * @param {*} payload
         */
        async loginUser(context, payload) {

            await instance.post('/login', {email: payload.email, password: payload.password}).then(res => {
                context.commit('authenticatedUser', res.data)
            }).catch((error) => {
                    console.log(error.res);
                }
            )
        },
        async isLoggedInUser(context) {
            await axios.get('http://localhost:8081/login').then((res) => {
                console.log(res.data);
                if(res.loggedIn !== false) {
                    context.commit('isAuth', res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        /**
         * This action sends a post request to signup the user if successful
         * @param {*} context
         * @param {*} payload
         */
        async signupUser(context, payload) {
            await instance.post('/register', { email: payload.email, username: payload.username, password: payload.password }).then(res => {

                if(res.data !== 'Failed') {
                    context.dispatch('loginUser', {email: payload.email, password: payload.password});
                }
                // context.commit('authenticatedUser', res.data)
            }).catch((error) => {
                console.log(error.res);
            }
            )
        },
        /**
         * This action sends a post request to the server to search the database with the payload
         * @param {*} context
         * @param {*} payload
         */
        async searchAction(context, payload) {
            await instance.post('/search?search=' + payload).then(res => {
                context.commit('searchMutation', res.data)
            }).catch((error) => {
                console.log(error.res);
            }
            )
        },
        /**
         * This action sends a post request to the server
         * to add a review if succesful
         * @param {*} context
         * @param {*} payload
         */
        async addReview(context, payload) {
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
                console.log(res.data)
            }).catch((error) => {
                console.log(error.res);
            })
        },
        /**
         * This action logs out the user
         * @param {*} context 
         */
        async logoutUserAction(context) {
            await instance.delete('/logout').then(res =>  {
                console.log("logout successful");
                console.log(res);
            }).catch((error) => {
                throw error;
            })
            context.commit('logoutUserMutation');
        },
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
        },
        getLoginSuccess(state) {
            return state.loginSuccess;
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
