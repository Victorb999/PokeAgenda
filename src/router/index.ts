import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
