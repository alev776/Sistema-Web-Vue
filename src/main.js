import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import 'core-js'
require('./plugins');


import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

import VeeValidate, { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

Validator.localize('es', es);


const validator = {
  getMessage(field, args) {
    return `Esta cédula no es válida`
  },
  validate(ced, args) {
	  if (ced) {
		var c = ced.replace(/-/g,'');
			var cedula = c.substr(0, c.length - 1);
			var verificador = c.substr(c.length - 1, 1);
		var suma = 0;
		let uno, dos, el_numero;
			var cedulaValida = 0;
			if(ced.length < 11) { return false; }
			for (let i=0; i < cedula.length; i++) {
				let mod = "";
				if((i % 2) == 0){mod = 1} else {mod = 2}
			let res = cedula.substr(i,1) * mod;
				if (res > 9) {
					res = res.toString();
					uno = res.substr(0,1);
					dos = res.substr(1,1);
					res = eval(uno) + eval(dos);
				}
				suma += eval(res);
			}
			el_numero = (10 - (suma % 10)) % 10;
			if (el_numero == verificador && cedula.substr(0,3) != "000") {
			cedulaValida = 1;
			}
			else   {
			return false;
			}
			return true;
		}
	}
};

Validator.extend('cedula', validator);

Vue.use(VeeValidate);

Vue.use(VueAxios, axios);
// axios.defaults.baseURL = 'https://web-ventas-app.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:3080';

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);
import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(Vuesax, {
  // options here
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