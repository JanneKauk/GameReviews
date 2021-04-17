import { createRouter, createWebHistory } from 'vue-router';
import GameList from "@/components/Lists/GameList.vue";
import NotFound from "@/pages/NotFound.vue";




const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: GameList},
        { path: '/', redirect: '/home' },
        { path: '/:notFound(.*)', component: NotFound},

    ],
});

export default router;