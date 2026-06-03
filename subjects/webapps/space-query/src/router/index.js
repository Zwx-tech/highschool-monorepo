import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import AboutView from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
