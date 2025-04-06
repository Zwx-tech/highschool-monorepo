import { createRouter, createWebHistory } from "vue-router";

//static load
//@ oznacza katalog /src

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PromotionView from "@/views/PromotionView.vue";

//@ts-ignore
const NotFoundView = () => import("@/views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundView",
      component: NotFoundView,
    },
    {
      path: "/promotion/:id",
      name: "PromotionView",
      component: PromotionView,
    },
  ],
});

export default router;
