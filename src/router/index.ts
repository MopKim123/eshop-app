import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router' 
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import Payment from '../views/Payment.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Login },  
  { path: '/home', component: Home },  
  { path: '/product', component: ProductView },  
  { path: '/cart', component: CartView },  
  { path: '/payment', component: Payment },  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
