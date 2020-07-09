import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import categorias from "./modules/categorias";
import articulos from "./modules/articulos";
import proveedores from "./modules/proveedores";
import ingresos from "./modules/ingresos";
import clientes from "./modules/clientes";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["login", "categorias"]
});

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    }
  },
  actions: {},
  modules: {
    login,
    categorias,
    articulos,
    proveedores,
    ingresos,
    clientes
  },
  plugins: [vuexLocal.plugin]
});
