import { createApp } from 'vue';
import App from './App.vue'
import router from './router.js';

import TheHeader from "./components/Layout/TheHeader.vue";

const app = createApp(App);

app.component('the-header', TheHeader);

app.use(router);
app.mount("#app");