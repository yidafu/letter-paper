import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

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
      component: () => import(/* webpackChunkName: "about-me" */ './views/Aboutme')
    },
    {
      path: '/achieve',
      name: 'achieve',
      component: () => import(/* webpackChunkName: "archive" */ './views/Archive')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import(/* webpackChunkName: "post" */ './views/Post')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import(/* webpackChunkName: "tag" */ './views/Tag')
    },
    {
      path: '*',
      name: 'nomatch',
      component: () => import(/* webpackChunkName: "not-found" */ './views/404.vue')
    }
  ]
});
