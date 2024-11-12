import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);  // Usamos el router de Vue 3
app.mount('#app');  // Montamos la aplicación
