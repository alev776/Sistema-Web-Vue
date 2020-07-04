<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute md-dark"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div id="parentx">

      <vs-button @click="active=!active" color="secundary" type="filled"><span class="material-icons">view_list</span></vs-button>
      <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

        <div class="header-sidebar" slot="header">
          <vs-avatar  size="70px" :src="img" />

          <h4>
            {{ nombre }}
          </h4>

        </div>
        <vs-sidebar-group title="Aplication">
          <vs-sidebar-item index="1" icon="question_answer" to="/">
            Dashboard
          </vs-sidebar-item>
          <vs-sidebar-group title="Almacen">
            <vs-sidebar-item index="2.1" icon="store" to="categorias">
              Categorias
            </vs-sidebar-item>
            <vs-sidebar-item index="2.2" icon="nature_people" to="articulos">
              Articulos
            </vs-sidebar-item>
          </vs-sidebar-group>
          <vs-sidebar-group title="Compras">
            <vs-sidebar-item index="2.1" icon="store" to="ingresos">
              Ingresos
            </vs-sidebar-item>
            <vs-sidebar-item index="2.2" icon="nature_people" to="proveedores">
              Proveedores
            </vs-sidebar-item>
          </vs-sidebar-group>
          <vs-sidebar-group title="Ventas">
            <vs-sidebar-item index="2.1" icon="store">
              Ventas
            </vs-sidebar-item>
            <vs-sidebar-item index="2.2" icon="supervisor_account" to="clientes">
              Clientes
            </vs-sidebar-item>
          </vs-sidebar-group>
          <vs-sidebar-group title="Consultas">
            <vs-sidebar-item index="2.1" icon="search">
              Consulta de ventas
            </vs-sidebar-item>
            <vs-sidebar-item index="2.2" icon="search">
              Consulta de compras
            </vs-sidebar-item>
          </vs-sidebar-group>
        </vs-sidebar-group>


        <vs-divider icon="person" position="left">
          User
        </vs-divider>

        <vs-sidebar-item index="5" icon="verified_user" to="user">
          Configurations
        </vs-sidebar-item>
        <vs-sidebar-item index="6" icon="account_box" to="user">
          Profile
        </vs-sidebar-item>

        <div class="footer-sidebar" slot="footer">
          <vs-button icon="reply" color="danger" type="flat" @click="logOut">log out</vs-button>
          <vs-button icon="settings" color="primary" type="border"></vs-button>
        </div>

      </vs-sidebar>
    </div>
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">Sistema de Ventas</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <li class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <vs-avatar :src="img"/>
                        <p>My Account</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/landing">
                            <vs-avatar :src="img"/>
                            <p>Profile</p>
                          </a>
                        </li>
                        <li>
                          <md-divider></md-divider>
                          <a href="#/lock" @click="lock">
                            <i class="material-icons">lock</i>
                            <p>Lock</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/login" @click="signOut">
                            <i class="material-icons">login</i>
                            <p>Log Out</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import { mapActions, mapMutations } from 'vuex';
import router from '../router';
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      active:false,
      search: ""
    };
  },
  computed: {
    nombre() {
      return localStorage.getItem('user');
    },
    img() {
      return localStorage.getItem('img');
    },
  },
  methods: {
    ...mapActions({
      signOut: 'login/signOut'
    }),
    async logOut() {
      location.reload();
      this.active = false;
      await this.signOut();
    },
    lock() {
      localStorage.removeItem('token');
      }
  }
};
</script>

<style lang="css">
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

}
</style>
