import { createRouter, createWebHistory } from 'vue-router';
import GameList from "@/components/Lists/GameList.vue";
import NotFound from "@/pages/NotFound.vue";
import GameDetails from './pages/GameDetails.vue';
import SearchedGames from './pages/SearchedGames.vue';




const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'is-active',
    routes: [
        { path: '/gameslist/:category', 
            component: GameList,
            props: { showExtra: true},
        },
        { 
            path: '/gamedetails/:id',
            component: GameDetails,
            props: true,
        }, 
        { path: '/search/:search', component: SearchedGames, props: true, name: 'search'},
        { path: '/', redirect: '/gameslist/best_rated' },
        { path: '/:notFound(.*)', component: NotFound},

    ],
});

export default router;