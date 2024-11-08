import { createRouter, createWebHistory } from 'vue-router';
import signUp from './views/signUp.vue';
import login from './views/login.vue';
import RegistrationView from './views/registerEmail.vue'
import RegistrationPhoneView from './views/registerPhone.vue'
import ConfirmRegisterPhone from './views/confirmRegisPhone.vue';
import ConfirmRegisterEmail from './views/confirmRegisEmail.vue';
import loginForm from './views/loginForm.vue';
import ajustes from './views/ajustes.vue';

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
    path: '/ajustes',
    name: 'ajustes',
    component: ajustes 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
