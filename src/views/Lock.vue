<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStl">
      <div class="md-layout" id="box">
        <vs-row vs-justify="center">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="20">
            <vs-card>
              <div slot="header" class="avatar">
                <vs-avatar
                  class="avt"
                  size="90px"
                  vs-align="center"
                  :src="img"
                />
                <h3>{{ nombre }}</h3>
              </div>
              <div>
                <md-field>
                  <label>Password toggle</label>
                  <md-input v-model="password" type="password"></md-input>
                </md-field>
                <vs-button
                  class="btn"
                  color="success"
                  type="gradient"
                  @click="unlock"
                  >Unlock</vs-button
                >
              </div>
            </vs-card>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      password: ""
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/login.jpg")
    }
  },
  computed: {
    nombre() {
      return this.$store.state.login.user.data.user.name;
    },
    img() {
      return this.$store.state.login.user.data.user.avatar;
    },
    headerStl() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    ...mapActions({
      login: "login/login"
    }),
    unlock() {}
  }
};
</script>

<style lang="css">
.avatar {
  margin-left: 60px;
}

.avt {
  margin-top: -30%;
}

.btn {
  margin-top: 25px;
  margin-left: 27%;
  margin-bottom: 5%;
  width: 45%;
}

#box {
  width: 16%;
}
</style>
