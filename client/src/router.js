import { createRouter, createWebHistory } from 'vue-router';
import signUp from './views/signUp.vue';
import login from './views/login.vue';
import RegistrationView from './views/registerEmail.vue'
import RegistrationPhoneView from './views/registerPhone.vue'
import ConfirmRegisterPhone from './views/confirmRegisPhone.vue';
import ConfirmRegisterEmail from './views/confirmRegisEmail.vue';
import loginForm from './views/loginForm.vue';
import ajustes from './views/ajustes.vue';
import customerService from './views/customerService.vue';
import comments from './views/comments.vue';
import workshops from './views/workshops.vue';
import workshopDetails from './views/workshopDetails.vue';
import redeemCoupon from './views/redeemCoupon.vue';
import workshopQR from './views/workshopQR.vue';
import chat from './views/chat.vue';

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
    path: '/workshops',
    name: 'workshops',
    component: workshops 
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
