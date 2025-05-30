import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Contracts',
      component: HomeView,
    },
    {
      path: '/history',
      name: 'History',
      component: HomeView,
    },
    {
      path: '/destinations',
      name: 'Destinations',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Destinations.vue'),
    },
    {
      path: '/cargohold',
      name: 'cargohold',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CargoHold.vue'),
    },
    {
      path: '/calculator',
      name: 'PayloadCalculator',
      component: () => import('../views/PayloadCalc.vue'),
    },
  ],
})

export default router
