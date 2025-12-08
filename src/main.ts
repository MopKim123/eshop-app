import { createApp } from 'vue'
import './style.css' 
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App);

app.use(router);
app.use(Vue3Toastify, { 
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    hideProgressBar: false,
    newestOnTop: true,
    theme: "dark",
    clearOnUrlChange: false
}); 
app.use(createPinia());
app.mount("#app");

