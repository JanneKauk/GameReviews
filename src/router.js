import { createRouter, createWebHistory } from 'vue-router';
import GameList from "@/components/Lists/GameList.vue";
import NotFound from "@/pages/NotFound.vue";
// import GameDetails from './pages/GameDetails.vue';




const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/gameslist', component: GameList},
        // { 
        //     path: '/gameslist/:category',
        //     component: GameDetails,
        //     props: true,
        // },
        { path: '/', redirect: '/gameslist' },
        { path: '/:notFound(.*)', component: NotFound},

    ],
});

export default router;