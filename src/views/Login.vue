<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
                @click="facebook"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
                @click="github"
              >
                <i class="fab fa-github"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
                @click="google"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">Or Be Classical</p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>

              <p slot="b-footer" class="description">
                Don't have an account yet?
                <a href="/" @click.prevent="activePrompt2 = true">Sign up</a>
                here
              </p>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="loginUser"
              >
                Get Started
              </md-button>
            </login-card>
          </div>
          <div class="con-exemple-prompt">
            <vs-prompt
              color="danger"
              title="Sign Up"
              @cancel="(valMultipe.value1 = ''), (valMultipe.value2 = '')"
              @accept="loginClasic"
              :is-valid="validName"
              :active.sync="activePrompt2"
            >
              <div class="con-exemple-promptt">
                <!-- Name
                  <vs-input placeholder="Name" v-model="input.firstname"/> -->
                <md-field class="has-green">
                  <md-icon>person</md-icon>
                  <label>Name</label>
                  <md-input v-model="input.firstname"></md-input>
                </md-field>
                <md-field class="has-green">
                  <md-icon>email</md-icon>
                  <label>Email</label>
                  <md-input v-model="input.email"></md-input>
                </md-field>
                <md-field class="has-green">
                  <md-icon>lock_outline</md-icon>
                  <label>Password</label>
                  <md-input v-model="input.password" type="password"></md-input>
                </md-field>
                <vs-alert
                  :active="!validName"
                  color="danger"
                  icon="new_releases"
                >
                  Fields can not be empty please enter the data
                </vs-alert>
              </div>
            </vs-prompt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { mapActions } from "vuex";
import { firebase, auth } from "../plugins/firebase";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      firstname: "",
      email: "",
      password: "",
      input: {
        firstname: "",
        email: "",
        password: ""
      },
      img: "",
      select1: 2,
      options1: [
        { text: "IT", value: 0 },
        { text: "Blade Runner", value: 2 },
        { text: "Thor Ragnarok", value: 3 }
      ],
      activePrompt: false,
      activePrompt2: false,
      val: "",
      valMultipe: {
        value1: "",
        value2: ""
      }
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/login.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    nombre() {
      return this.$store.state.login.user.data.user.name;
    },
    validName() {
      return (
        this.input.email.length > 0 &&
        this.input.password.length > 0 &&
        this.input.firstname !== ""
      );
    }
  },
  methods: {
    ...mapActions({
      postUser: "login/postUser",
      loginUsuario: "login/login"
    }),
    randomCenter() {
      this.$vs.notify({
        title: "Position top-center",
        text: this.nombre,
        color: "primary",
        position: "top-center"
      });
    },
    login() {
      this.postUser({
        name: this.firstname,
        email: this.email,
        password: this.password
      });
    },
    loginUser() {
      this.loginUsuario({
        email: this.email,
        password: this.password
      });
    },
    loginClasic() {
      this.postUser({
        name: this.input.firstname,
        email: this.input.email,
        password: this.input.password
      });
    },
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider);
    },
    facebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.ingresar(provider);
    },
    github() {
      const provider = new firebase.auth.GithubAuthProvider();
      this.ingresar(provider)
      console.log(provider)
    },
    async ingresar(provider) {
      firebase.auth().languageCode = "es";

      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(result.additionalUserInfo.profile)
        this.postUser({
          name: result.additionalUserInfo.profile.name,
          email: result.additionalUserInfo.profile.email,
          provider: result.additionalUserInfo.profile.providerId,
          password: "123456",
          avatar: result.additionalUserInfo.profile.avatar,
          picture: result.additionalUserInfo.profile.picture,

        });
      } catch (error) {}
    },
    acceptAlert(color) {
      this.$vs.notify({
        color: "success",
        title: "Accept Selected",
        text: "Lorem ipsum dolor sit amet, consectetur"
      });
    },
  }
};
</script>

<style lang="css">
.con-exemple-prompt {
  padding: 10px;
  padding-bottom: 0px;
}

.vs-input {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
