import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/login-page.vue'
import Product from '../views/core/product-page.vue'
import Cart from '../views/core/cart-page.vue'
import Logs from '../views/core/logs-page.vue'

import DefaultLayout from '../layout/default-layout'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/',
    redirect:'/product',
    name:'Home',
    component:DefaultLayout,
    meta:{requiresAuth: true},
    children:[
      {
        path: '/product',
        name: 'Product',
        component: Product,
      },
      {
        path: '/Cart',
        name: 'Cart',   
        component: Cart,
      },
      {
        path:'/logs',
        name: 'Logs',
        component: Logs,
        meta: {
          isAdmin: true
        }
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

import axios from '@/axios'
import { JwtService } from '@/services/JwtService'

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.isAdmin)
  const token = localStorage.getItem('bearer')

  if (requiresAuth || requiresAdmin) {
    // Check if token exists
    if (!token) {
      return next('/')
    }

    try {
      // Check if token is still valid by sending a request to verify-token API
      const response = await axios.get('/verify-token')
      if (response.status === 200) {
        const isAdmin = response.data.is_admin
        JwtService.setAdmin(response.data.is_admin)
        if (requiresAdmin && !isAdmin) {
          // User is not an admin, redirect to the previous page
          return next('product')
        } else {
          // Token is valid, allow access to the protected route
          return next()
        }
      }
    } catch (error) {
      // Token is invalid or expired, redirect to login page
      if (error.response && error.response.status === 401 && error.response.data.message === 'Unauthenticated.') {
        JwtService.destroyToken()
        return next('/')
      }
    }
  } else {
    next()
  }
})




export default router
