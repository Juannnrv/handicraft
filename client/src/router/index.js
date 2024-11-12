import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import UserPage from '../components/UserPage.vue';

// Configura la base URL directamente (ejemplo sin variables de entorno)
const baseUrl = '/';  // Puedes cambiar a otra base URL si es necesario (por ejemplo: '/app/')

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage,
    // meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(baseUrl),  // Usamos la base URL
  routes
});

export default router;
