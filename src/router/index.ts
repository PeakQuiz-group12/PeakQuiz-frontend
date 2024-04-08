import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/playQuiz/:quizId', // Modified path to include quizId as a route parameter
      name: 'playQuiz',
      component: () => import('../views/PlayQuizView.vue'),
      meta: { requiresAuth: true },
      props: true
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
  if (to.path === '/login') {
    // Clear sessionStorage items when navigating to login
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('username')
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      next({ path: '/login' });
    } else {
      try {
        await axios.get('/validate-token', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        next();
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('username')
          next({ path: '/login' });
        } else {
          console.error('Error validating token:', error);
          next(false);
        }
      }
    }
  } else {
    next();
  }
});

export default router
