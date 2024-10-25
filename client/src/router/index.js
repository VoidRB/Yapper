import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/chats/:username",
      name: "Chats",
      component: () => import("@/views/ChatView.vue"),
      meta: {
        title: "Chats",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        title: "Profile",
      },
    },
    {
      path: "/colors",
      name: "colors",
      meta: {
        title: "colors",
      },
      component: () => import("@/views/ColorsView.vue"),
    },
    {
      path: "/:catchall(.*)",
      name: "notFound",
      meta: {
        title: "404 Not Found",
      },
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Yapper`;
  next();
});
