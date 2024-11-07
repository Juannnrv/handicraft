import { createRouter, createWebHistory } from 'vue-router';
import signUp from './views/signUp.vue';
import login from './views/login.vue';
import home from './views/home.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
