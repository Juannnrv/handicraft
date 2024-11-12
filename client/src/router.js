import { createRouter, createWebHistory } from 'vue-router';

import signUp from './views/signUp.vue';
import login from './views/login.vue';
import home from './views/home.vue';
import workshops from './views/workshops.vue';
import discounts from './views/discounts.vue';
import categories from './views/categories.vue';
import car from './views/car.vue';
import favorites from './views/favorites.vue';
import workshop from './views/workshop.vue';

const routes = [
  {
    path: '/signup',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: workshops
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: discounts
  },
  {
    path: '/categories',
    name: 'Categories',
    component: categories
  },
  {
    path: '/car',
    name: 'Car',
    component: car
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: favorites
  },
  {
    path: '/workshop',
    name: 'Workshop',
    component: workshop
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
