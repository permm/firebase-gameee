import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import UserView from '../views/UserView.vue'
import OrderView from '../views/OrderView.vue'
import GameDetail from '../views/GameDetail.vue'
import GameByGenre from '../views/GameByGenre.vue'
import GameByMultiplay from '../views/GameByisMultiplay.vue'
import GameByPlatform from '../views/GameByPlatform.vue'
import UserDetail from '../views/UserDetail.vue'
import UserByCountry from '../views/UserByCountry.vue'
import UserByCity from '../views/UserByCity.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameView
    },
    {
      path: '/games',
      name: 'games',
      component: GameView
    },
    {
      path: '/users',
      name: 'users',
      component: UserView
    },
    {
      path: '/orders/:id',
      name: 'orders',
      component: OrderView
    },
    {
      path: '/game/:id',
      name: 'gamedetail',
      component: GameDetail
    },
    {
      path: '/games/:id',
      name: 'gamesbyelse',
      component: GameByGenre
    },
    {
      path: '/games/multi/:id',
      name: 'gamesbymul',
      component: GameByMultiplay
    },
    {
      path: '/games/platform/:id',
      name: 'gamesbyplat',
      component: GameByPlatform
    },
    {
      path: '/users/:id',
      name: 'userdetail',
      component: UserDetail
    },
    {
      path: '/users/country/:id',
      name: 'userbycountry',
      component: UserByCountry
    },
    {
      path: '/users/city/:id',
      name: 'userbycity',
      component: UserByCity
    }
  ]
})

export default router
