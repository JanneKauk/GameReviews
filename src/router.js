import { createRouter, createWebHistory } from 'vue-router';
import GameList from "@/components/Lists/GameList.vue";
import NotFound from "@/pages/NotFound.vue";
import LoginSignup from "@/components/Layout/LoginSignup";




const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: GameList},
        { path: '/login', component: LoginSignup},
        { path: '/', redirect: '/home' },
        { path: '/:notFound(.*)', component: NotFound},

    ],
});

export default router;