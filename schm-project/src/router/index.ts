import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PayloadCalc from '@/views/PayloadCalc.vue'

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
      name: 'Locations',
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
    {
      path: '/calculator',
      name: 'PayloadCalculator',
      component: PayloadCalc,
    },
  ],
})

export default router
