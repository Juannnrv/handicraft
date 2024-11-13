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
import RegistrationView from './views/registerEmail.vue'
import RegistrationPhoneView from './views/registerPhone.vue'
import ConfirmRegisterPhone from './views/confirmRegisPhone.vue';
import ConfirmRegisterEmail from './views/confirmRegisEmail.vue';
import loginForm from './views/loginForm.vue';
import ajustes from './views/ajustes.vue';
import customerService from './views/customerService.vue';
import comments from './views/comments.vue';
import workshopDetails from './views/workshopDetails.vue';
import redeemCoupon from './views/redeemCoupon.vue';
import workshopQR from './views/workshopQR.vue';
import chat from './views/chat.vue';
import workshops2 from './views/workshops2.vue';
import profile from './views/profile.vue';

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
  },
  {
    path: '/productDetails',
    name: 'ProductDetails',
    component: productDetails
  },
  { 
    path: '/registerEmail',
    name: 'Register',
    component: RegistrationView 
  },
  { 
    path: '/registerPhone',
    name: 'RegisterPhone',
    component: RegistrationPhoneView 
  },
  {
    path: '/confirmRegisterPhone',
    name: 'confirmRegisterPhone',
    component: ConfirmRegisterPhone,
  },
  { 
    path: '/confirmRegisterEmail',
    name: 'confirmRegisterEmail',
    component: ConfirmRegisterEmail 
  },
  { 
    path: '/loginForm',
    name: 'loginForm',
    component: loginForm 
  },
  { 
    path: '/settings',
    name: 'settings',
    component: ajustes 
  },
  { 
    path: '/customerService',
    name: 'customerService',
    component: customerService 
  },
  { 
    path: '/comments',
    name: 'comments',
    component: comments 
  },
  { 
    path: '/workshopDetails',
    name: 'workshopDetails',
    component: workshopDetails 
  },
  { 
    path: '/redeemCoupon',
    name: 'redeemCoupon',
    component: redeemCoupon 
  },
  { 
    path: '/workshopQR',
    name: 'workshopQR',
    component: workshopQR 
  },
  { 
    path: '/chat',
    name: 'chat',
    component: chat 
  },
  { 
    path: '/workshopsgallery',
    name: 'Workshopsgallery',
    component: workshops2 
  },
  { 
    path: '/profile',
    name: 'Profile',
    component: profile 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
