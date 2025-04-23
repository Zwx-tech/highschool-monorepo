import { createRouter, createWebHistory } from "vue-router";

// Static load
//@ oznacza katalog /src

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PromotionView from "@/views/PromotionView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import ProductView from "@/views/ProductView.vue";
import SingleProductView from "@/views/SingleProductView.vue"; // Import the SingleProductView

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
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
    },
    {
      path: "/product/:id", // Add route for single product view
      name: "SingleProductView",
      component: SingleProductView,
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
