import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const accessToken = sessionStorage.getItem("accessToken");

    // Redirect to login if no access token is present
    if (!accessToken) {
      next({ path: '/login' }); // Corrected path here
    } else {
      // Verify token validity with the backend
      try {
        await axios.get('/validate-token', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        // If the token is valid, proceed
        next();
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // If the token is invalid or expired, redirect to login
          next({ path: '/login' }); // Redirect to login page
        } else {
          // Handle other errors, such as network issues
          console.error('Error validating token:', error);
          next(false); // Halt navigation, might need a different approach based on UX needs
        }
      }
    }
  } else {
    // If the route does not require authentication, proceed
    next();
  }
});


export default router
