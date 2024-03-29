// src/router/index.js
import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import About from '../views/About.vue';
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/Home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
    },
    {
      path: '/About',
      component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})
