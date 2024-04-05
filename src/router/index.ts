import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/playQuiz',
      name: 'playQuiz',
      component: () => import('../views/PlayQuizView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/createQuiz',
      name: 'createQuiz',
      component: () => import('../views/createQuizView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: () => import('../views/EditProfileView.vue'),
      meta: { requiresAuth: true }
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
