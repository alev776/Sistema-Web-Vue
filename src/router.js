import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Lock from "./views/Lock.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import Categorias from "./views/Categorias";
import Articulos from "./views/Articulos";
import Proveedores from "./views/Proveedores";
import Ingresos from "./views/Ingresos";
import User from "./views/User";
import Clientes from "./views/Clientes";
import Ventas from "./views/Ventas";
import ConsultaIngresos from "./views/ConsultaIngresos"
import ConsultaVentas from "./views/ConsultaVentas"

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "index",
    components: { default: Index, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/lock",
    name: "lock",
    components: { default: Lock, footer: MainFooter },
    meta: { requiresAuth: true }
  },
  {
    path: "/landing",
    name: "landing",
    components: { default: Landing, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    components: { default: Login, header: "", footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/profile",
    name: "profile",
    components: { default: Profile, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/categorias",
    name: "categoria",
    components: { default: Categorias, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/articulos",
    name: "articulos",
    components: { default: Articulos, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/proveedores",
    name: "proveedores",
    components: {
      default: Proveedores,
      header: MainNavbar,
      footer: MainFooter
    },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/ingresos",
    name: "ingresos",
    components: { default: Ingresos, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/user",
    name: "user",
    components: { default: User, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/clientes",
    name: "clientes",
    components: { default: Clientes, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/ventas",
    name: "ventas",
    components: { default: Ventas, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/consulta-ingresos",
    name: "consultaIngresos",
    components: { default: ConsultaIngresos, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/consulta-ventas",
    name: "consultaVentas",
    components: { default: ConsultaVentas, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    },
    meta: { requiresAuth: true }
  }
];

const router = new Router({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(x => x.meta.requiresAuth);

  if (
    protectedRoute &&
    !localStorage.getItem("token") &&
    !localStorage.getItem("vuex")
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
