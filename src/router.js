import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about-me',
      name: 'about',
      component: () => import('./views/Aboutme.vue')
    },
    {
      path: '/achieve',
      name: 'achieve',
      component: () => import('./views/Achieve.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('./views/Post.vue')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('./views/Tag.vue')
    },
    {
      path: '*',
      name: 'nomatch',
      component: () => import('./views/404.vue')
    }
  ]
});
