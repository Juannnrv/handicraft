import { createRouter, createWebHistory } from 'vue-router';

import signUp from './views/signUp.vue';
import login from './views/login.vue';
import home from './views/home.vue';
import workshops from './views/workshops.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
