import { createRouter, createWebHistory } from 'vue-router';
import signUp from './views/signUp.vue';
import login from './views/login.vue';
import RegistrationView from './views/registerEmail.vue'

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
  { path: '/registerEmail',
    name: 'Register',
    component: RegistrationView },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
