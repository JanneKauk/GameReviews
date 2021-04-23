import { createApp } from 'vue';
import App from './App.vue'
import router from './router.js';

import { createStore } from 'vuex';

import LoginSignup from './components/registration/LoginSignup.vue';

const store = createStore( {
    state(){
        return {

        }
    },
    mutations: {},
    actions: {},
    getters: {}
});

import TheHeader from "./components/Layout/TheHeader.vue";

const app = createApp(App);
app.use(store);
app.component('the-header', TheHeader);
app.component('login-signup', LoginSignup);

app.use(router);
app.mount("#app");