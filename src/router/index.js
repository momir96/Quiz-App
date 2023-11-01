import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login_register/LoginForm.vue'
import Sign from '../components/login_register/Signup.vue';
import Theme from '../components/learning-resources/Theme.vue'
import ShowQuestions from '../components/questions/ShowQuestions.vue'
import ShowQuestionsGeography from '../components/questions/ShowQuestionsGeography.vue'
import ShowQuestionsHistory from '../components/questions/ShowQuestionsHistory.vue'
import ShowQuesionsPsichology from '../components/questions/ShowQuesionsPsichology.vue'
import AllResults from '../components/questions/AllResults.vue'
import AdminVue from '../components/Admin/Admin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: Sign,
      props: true
    },
    {
      path: '/theme',
      name: 'theme',
      component: Theme,
      
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminVue,
    },
    {
      path: '/question',
      name: 'question',
      component: ShowQuestions,
      props: true
    }
    ,
    {
      path: '/geography',
      name: 'geography',
      component: ShowQuestionsGeography,
      props: true
    }
    ,
    {
      path: '/history',
      name: 'history',
      component: ShowQuestionsHistory,
      props: true
    }
    ,
    {
      path: '/psychology',
      name: 'psychology',
      component: ShowQuesionsPsichology,
      props: true
    },
    {
      path: '/all-results',
      name: 'all-results',
      component: AllResults,
      props: true
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('loggedInUser')) {
    next('/login');
  } else {
    next();
  }
});


export default router
