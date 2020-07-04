<template>
<div class="section">
  <div class="main main-raised" id="section">
    <div class="">
      <div class="md-layout">
        <div
          class="md-layout-item md-size-90 md-xsmall-size-100 mx-auto"
        >
          <div class="section section-contacts">
            <div id="nav-tabs">
                <h3>User Profile</h3>
                <div class="md-layout">
                    <div class="md-layout-item md-size-100 md-small-size-100 mx-auto">
                        <nav-tabs-card no-label color="green">
                            <template slot="content">
                                <md-tabs class="md-primary" md-alignment="fixed">
                                    <md-tab id="tab-pages" md-label="Profile" md-icon="face">
                                    <vs-row vs-w="12">
                                      <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="12" vs-xs="12">
                                        <md-field class="has-green">
                                            <md-icon>person</md-icon>
                                            <label>Nombre</label>
                                            <md-input v-model="profile.name"></md-input>
                                        </md-field>
                                    </vs-col>

                                      <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="12" vs-xs="12">
                                        <md-field class="has-green">
                                            <md-icon>domain</md-icon>
                                            <label>Compañía</label>
                                            <md-input v-model="profile.nombre_empresa"></md-input>
                                        </md-field>
                                    </vs-col>

                                    <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="11" vs-sm="12" vs-xs="12">
                                        <md-field class="has-green">
                                            <md-icon>place</md-icon>
                                            <label>Dirección</label>
                                            <md-input v-model="profile.direccion"></md-input>
                                        </md-field>
                                    </vs-col>

                                    <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="12" vs-xs="12">
                                        <md-field class="has-green">
                                            <md-icon>location_city</md-icon>
                                            <label>Cuidad</label>
                                            <md-input v-model="profile.cuidad"></md-input>
                                        </md-field>
                                    </vs-col>

                                    <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="12" vs-xs="12">
                                        <md-field class="has-green">
                                            <md-icon>email</md-icon>
                                            <label>Email</label>
                                            <md-input v-model="profile.email"></md-input>
                                        </md-field>
                                    </vs-col>

                                  </vs-row>
                                    </md-tab>

                                    <md-tab id="tab-posts" md-label="Settings" md-icon="build">
                                      <vs-row vs-w="12">
                                        <vs-col vs-type="flex" vs-justify="center" vs-offset="3.5" vs-w="5" vs-lg="5" vs-sm="12" vs-xs="12">
                                      <h3>Change password</h3>
                                      </vs-col>

                                      <vs-col vs-type="flex" vs-justify="center" vs-offset="2" vs-w="5" vs-lg="8" vs-sm="12" vs-xs="12">
                                        <md-field class="md-form-group" id="input">
                                          <md-icon>lock_outline</md-icon>
                                          <label>New Password</label>
                                          <md-input v-model="password1" type="password"></md-input>
                                        </md-field>
                                      </vs-col>

                                        <vs-col vs-type="flex" vs-justify="center" vs-offset="2" vs-w="5" vs-lg="8" vs-sm="12" vs-xs="12">
                                          <md-field class="md-form-group" id="input">
                                            <md-icon>lock_outline</md-icon>
                                            <label>Confirm Password</label>
                                            <md-input v-model="password2" type="password"></md-input>
                                          </md-field>
                                        </vs-col>

                                      </vs-row>

                                    </md-tab>
                                </md-tabs>
                                <vs-button color="rgb(187, 138, 200)" type="relief" @click="update" size="medium" id="btn2" class="btn" icon="update">Update</vs-button>
                            </template>
                        </nav-tabs-card>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { NavTabsCard } from "@/components";
import { mapActions } from 'vuex';
import router from '../router'

export default {
  data() {
    return {
      profile: {
        name: '',
        email: '',
        direccion: '',
        cuidad: '',
        nombre_empresa: '',
        _id: ''
      },
      password1: '',
      password2: ''
    }
  },
  mounted() {
    this.userProfile();
  },
  computed: {
    token() {
        return window.localStorage.getItem('token');
    },
    user() {
      return this.$store.state.login.user;
    }
  },
  methods: {
     ...mapActions({
      getUser: 'login/getUser',
      updateUser: 'login/updateUser'
  }),
    async userProfile() {
      await this.getUser(this.token);
      Object.assign(this.profile, this.user);
    },
    async update() {
      this.profile.token = this.token;
      if (this.password2 !== '') {
        this.profile.password = this.password2;
      }

      this.cleanErrors();

      await this.updateUser(this.profile);
      await this.getUser(this.token);

      if (!this.$store.state.login.error) {
          this.$vs.notify({
              time: 3000,
              position: 'top-center',
              icon: 'update',
              color:'primary',
              title:'Datos Actulizados!'
          });

          window.localStorage.setItem('user', this.user.name);
          location.reload();

      }
    },
    cleanErrors(){
            this.$store.state.login.error = false;
            this.$store.state.login.errorMessage = '';
        }

  },

  components: {
    NavTabsCard
  }
};
</script>

<style lang="scss" scoped>
#section {
    margin-top: 4%;
    margin-right: 18%;
    margin-left: 18%;
    margin-bottom: -4%;
}

#btn {
  width: 12%;
  margin-left: 37%;
}

#btn2 {
  width: 20%;
}

.con-expand-users .con-btns-user {
	display: flex;
	padding: 10px;
	padding-bottom: 0px;
	align-items: center;
	justify-content: space-between;
}

.con-expand-users .con-btns-user .con-userx {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.con-expand-users .list-icon i {
	font-size: 0.9rem !important;
}

</style>