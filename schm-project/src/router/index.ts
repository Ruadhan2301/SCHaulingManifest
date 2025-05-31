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
      component: () => import('../views/Destinations.vue'),
    },
    {
      path: '/routing',
      name: 'Routing',
      component: () => import('../views/RoutePage.vue'),
    },
    {
      path: '/cargohold',
      name: 'cargohold',
      component: () => import('../views/CargoHold.vue'),
    },
  ],
})

export default router
