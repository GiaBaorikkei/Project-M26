import { createWebHistory, createRouter } from 'vue-router'

import Admin from '@/views/Admin.vue'
import ManagerUser from '@/views/ManagerUser.vue'
import Home from '@/views/Home.vue'
import ManagerProduct from '@/views/ManagerProduct.vue'

const routes = [
  { path: '/', component: Home },
  { 
    path: '/admin', 
    component:Admin, 
    children:[
      {
        path:"manager-user",
        component: ManagerUser
      },
      {
        path:"manager-product",
        component: ManagerProduct
      }
    ] 
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
