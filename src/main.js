import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
require('./plugins');


import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'http://localhost:3000';

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);
import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(Vuesax, {
  // options here
});

import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {

});

import Vuechart from 'vue-chartjs'

Vue.use(Vuechart);

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')