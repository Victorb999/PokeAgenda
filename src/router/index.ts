import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokemon/:id",
    name: "Pokemon",
    component: () => import("@/views/Pokemon.vue"),
  },
  {
    path: "/type",
    name: "Type",
    component: () => import("@/views/Type.vue"),
  },
  {
    path: "/type/:id",
    name: "pokemon type",
    component: () => import("@/views/Type.vue"),
  },
  {
    path: "/generation",
    name: "Generation",
    component: () => import("@/views/Generation.vue"),
  },
  {
    path: "/generation/:id",
    name: "pokemon Generation",
    component: () => import("@/views/Generation.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
