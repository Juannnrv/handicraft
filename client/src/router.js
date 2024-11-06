import { createRouter, createWebHistory } from 'vue-router';
import signUp from './views/signUp.vue';

const routes = [
  {
    path: '/signup',
    name: 'signUp',
    component: signUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
