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
import productDetails from './views/productDetails.vue';
import RegistrationView from './views/registerEmail.vue';
import RegistrationPhoneView from './views/registerPhone.vue';
import ConfirmRegisterPhone from './views/confirmRegisPhone.vue';
import ConfirmRegisterEmail from './views/confirmRegisEmail.vue';
import loginForm from './views/loginForm.vue';
import settings from './views/settings.vue';
import customerService from './views/customerService.vue';
import comments from './views/comments.vue';
import workshopDetails from './views/workshopDetails.vue';
import redeemCoupon from './views/redeemCoupon.vue';
import workshopQR from './views/workshopQR.vue';
import chat from './views/chat.vue';
import workshops2 from './views/workshops2.vue';
import profile from './views/profile.vue';
import shops from './views/shops.vue';

const routes = [
  {
    path: '/signup',
    name: 'signUp',
    component: signUp,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    meta: { requiresAuth: true },
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: workshops,
    meta: { requiresAuth: true },
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: discounts,
    meta: { requiresAuth: true },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: categories,
    meta: { requiresAuth: true },
  },
  {
    path: '/car',
    name: 'Car',
    component: car,
    meta: { requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: favorites,
    meta: { requiresAuth: true },
  },
  {
    path: '/workshop',
    name: 'Workshop',
    component: workshop,
    meta: { requiresAuth: true },
  },
  {
    path: '/productDetails',
    name: 'ProductDetails',
    component: productDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/registerEmail',
    name: 'Register',
    component: RegistrationView,
  },
  {
    path: '/registerPhone',
    name: 'RegisterPhone',
    component: RegistrationPhoneView,
  },
  {
    path: '/confirmRegisterPhone',
    name: 'confirmRegisterPhone',
    component: ConfirmRegisterPhone,
  },
  {
    path: '/confirmRegisterEmail',
    name: 'confirmRegisterEmail',
    component: ConfirmRegisterEmail,
  },
  {
    path: '/loginForm',
    name: 'loginForm',
    component: loginForm,
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/customerService',
    name: 'customerService',
    component: customerService,
    meta: { requiresAuth: true },
  },
  {
    path: '/comments',
    name: 'comments',
    component: comments,
    meta: { requiresAuth: true },
  },
  {
    path: '/workshopDetails',
    name: 'workshopDetails',
    component: workshopDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/redeemCoupon',
    name: 'redeemCoupon',
    component: redeemCoupon,
    meta: { requiresAuth: true },
  },
  {
    path: '/workshopQR',
    name: 'workshopQR',
    component: workshopQR,
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat,
    meta: { requiresAuth: true },
  },
  {
    path: '/workshopsgallery',
    name: 'Workshopsgallery',
    component: workshops2,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/shops',
    name: 'Shops',
    component: shops,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/signup',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await fetch('http://localhost:5000/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials: 'include',
      });

      if (response.ok) {
        next();
      } else if (response.status === 401) {
        console.warn('Usuario no autenticado. Redirigiendo a login...');
        next('/login');
      } else {
        console.error('Error inesperado:', response.status);
        next('/error');
      }
    } catch (error) {
      console.error('Error de red:', error);
      next('/error');
    }
  } else {
    next();
  }
});

export default router;