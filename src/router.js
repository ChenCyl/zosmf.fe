import Vue from "vue";
import Router from "vue-router";

import store from "./store";

// import layout
import DashBoardLayout from "@/layouts/dashboard.vue";
import AuthLayout from "@/layouts/auth.vue";

// import pages

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/dashboard",
      component: DashBoardLayout,
      children: [
        {
          path: "reports",
          component: () => import("@/pages/dashboard/reports")
        },
        {
          path: "racf/:lab",
          component: () => import("@/pages/dashboard/racf")
        },
        {
          path: "dfsms/:lab",
          redirect: "dfsms/:lab/master",
          name: "lab",
          component: () => import("@/pages/dashboard/dfsms/lab"),
          children: [
            {
              path: "master",
              component: () => import("@/components/Console/Panel/MaterPanel")
            },
            {
              path: "is",
              component: () => import("@/components/Console/Panel/IsmfPanel")
            },
            {
              path: "is/:option",
              name: "isoption",
              component: () => import("@/components/Console/Panel/ismf/Main")
            },
            {
              path: "is/0/0",
              component: () =>
                import("@/components/Console/Panel/ismf/Is00profile")
            },
            {
              path: "is/7/2",
              component: () =>
                import("@/components/Console/Panel/ismf/Is72auto")
            },
            {
              path: "p",
              component: () => import("@/components/Console/Panel/PdfPanel")
            },
            {
              path: "data-set-utility",
              name: "p32",
              component: () => import("@/components/Console/Panel/pdf/DsuPanel")
            },
            {
              path: "data-set-list-utility",
              name: "p34",
              component: () =>
                import("@/components/Console/Panel/pdf/DsluPanel")
            },
            {
              path: "allocate-dataset",
              component: () =>
                import("@/components/Console/Panel/pdf/AllocatePanel")
            },
            {
              path: "dslist",
              component: () =>
                import("@/components/Console/Panel/pdf/DslistPanel")
            },
            {
              path: "jcl",
              component: () => import("@/components/Console/Panel/pdf/JCLPanel")
            },
            {
              path: "pdslist",
              component: () =>
                import("@/components/Console/Panel/pdf/PdslistPanel")
            }
          ]
        }
      ]
    },
    {
      path: "/auth",
      component: AuthLayout,
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/pages/auth/login")
        }
      ]
    },
    {
      path: "*",
      component: () => import("@/pages/404")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.getters["user/isLogin"]) {
    if (to.name === "login") {
      next("/");
    }
  } else {
    if (to.name !== "login") {
      next("/auth/login");
    }
  }
  next();
});

export default router;
