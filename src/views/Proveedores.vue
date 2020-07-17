<template>
  <div>
    <data-table
      @data="model"
      :array="allowedHeaders()"
      :header="header"
      title="Proveedores"
      @btn="nuevo"
      @eliminar="eliminar"
      search="true"
    >
    </data-table>
    <vs-popup class="holamundo" title="Proveedor" :active.sync="prompt">
      <vs-row vs-w="12">
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-offset="0.5"
          vs-w="6"
          vs-lg="5"
          vs-sm="5"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>person</md-icon>
            <label>Nombre</label>
            <md-input v-model="proveedoresModel.name"></md-input>
          </md-field>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="5"
          vs-sm="5"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>phone</md-icon>
            <label>Teléfono</label>
            <md-input v-model="proveedoresModel.telefono"></md-input>
          </md-field>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="11"
          vs-sm="5"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>place</md-icon>
            <label>Dirección</label>
            <md-input v-model="proveedoresModel.direccion"></md-input>
          </md-field>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-offset="0.5"
          vs-w="6"
          vs-lg="5"
          vs-sm="5"
          vs-xs="5"
        >
          <vs-select
            placeholder="Select"
            class="selectExample"
            label="Tipo Documento"
            v-model="proveedoresModel.tipo_documento"
          >
            <vs-select-item
              :key="index"
              :value="item"
              :text="item"
              v-for="(item, index) in tipo_documentos"
            />
          </vs-select>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="5"
          vs-sm="5"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>push_pin</md-icon>
            <label>Número Documento</label>
            <md-input v-model="proveedoresModel.num_documento"></md-input>
          </md-field>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="11"
          vs-sm="5"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>alternate_email</md-icon>
            <label>Email</label>
            <md-input v-model="proveedoresModel.email"></md-input>
          </md-field>
        </vs-col>
      </vs-row>
      <div class="btn">
        <vs-button
          color="primary"
          type="flat"
          @click="post"
          size="large"
          v-if="index === 1"
          icon="save"
          >Add</vs-button
        >
        <vs-button
          color="primary"
          type="flat"
          @click="update"
          size="large"
          v-else
          icon="update"
          >Update</vs-button
        >
        <vs-button
          color="danger"
          type="flat"
          size="large"
          @click="prompt = false"
          icon="cancel"
          >Cancel</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
import DataTable from "../components/Data-Table";
import { mapActions } from "vuex";

export default {
  name: "articulos",
  data() {
    return {
      header: [
        { text: "Nombre", value: "name" },
        { text: "Tipo Persona", value: "tipo_persona" },
        { text: "Tipo Documento", value: "tipo_documento" },
        { text: "Número Documento", value: "numero_documento" },
        { text: "Dirección", value: "direccion" },
        { text: "Teléfono", value: "telefono" },
        { text: "Email", value: "email" }
      ],
      proveedoresModel: {
        name: "",
        tipo_documento: "",
        num_documento: null,
        direccion: "",
        telefono: null,
        email: "",
        _id: ""
      },
      art: {},
      tipo_documentos: ["Cédula", "Pasaporte", "RNC"],
      index: null,
      arrayHeader: [],
      id: {},
      prompt: false
    };
  },
  beforeMount() {
    this.proveedores();
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
    proveedor() {
      return this.$store.state.proveedores.proveedor;
    }
  },
  methods: {
    ...mapActions({
      getProveedor: "proveedores/getProveedor",
      postProveedor: "proveedores/postProveedor",
      editProveedor: "proveedores/editProveedor",
      deleteProveedor: "proveedores/deleteProveedor"
    }),
    model(data) {
      Object.assign(this.proveedoresModel, data);
      const id = this.proveedor.find(x => x.email === data.email);
      this.proveedoresModel._id = id._id;

      this.prompt = true;
      this.index = -1;
    },
    async proveedores() {
      await this.getProveedor(this.token);
    },
    allowedHeaders() {
      const headers = [
        "name",
        "tipo_persona",
        "tipo_documento",
        "num_documento",
        "direccion",
        "telefono",
        "email"
      ];
      const arreglo = [];
      this.proveedor.forEach(x => {
        let prueba = {};
        headers.forEach(y => {
          prueba[y] = x[y];
        });
        arreglo.push(prueba);
      });
      return arreglo;
    },
    async update() {
      this.proveedoresModel.token = this.token;
      this.cleanErrors();
      await this.editProveedor(this.proveedoresModel);
      await this.getProveedor(this.token);
      this.prompt = false;

      if (this.$store.state.proveedores.error) {
        this.$vs.notify({
          time: 4000,
          position: "top-center",
          icon: "error",
          color: "danger",
          title: "Algo ha salido mal!",
          text: "Por favor inténtelo de nuevo más tarde"
        });
      } else {
        this.$vs.notify({
          time: 4000,
          position: "top-center",
          icon: "update",
          color: "primary",
          title: "Proveedor Actulizado!"
        });
      }
    },
    async post() {
      this.proveedoresModel.token = this.token;
      this.cleanErrors();
      await this.postProveedor(this.proveedoresModel);
      await this.getProveedor(this.token);
      this.prompt = false;

      if (this.$store.state.proveedores.error) {
        this.$vs.notify({
          time: 4000,
          position: "top-center",
          icon: "error",
          color: "danger",
          title: "Algo ha salido mal!",
          text: "Por favor inténtelo de nuevo más tarde"
        });
      } else {
        this.$vs.notify({
          time: 4000,
          position: "top-center",
          icon: "check_box",
          color: "success",
          title: "Proveedor Agregado!"
        });
      }
    },
    eliminar(el) {
      const id = this.proveedor.find(x => x.email === el.email);
      this.art = id;
      this.art.token = this.token;
      this.cleanErrors();

      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: `¿Está seguro que desea eliminar el proveedor ${id.name}?`,
        accept: this.acceptAlert
      });
    },
    async acceptAlert() {
      await this.deleteProveedor(this.art);
      await this.getProveedor(this.token);

      document.querySelector(".content-tr-expand").style.display = "none";
      document
        .querySelector(".content-tr-expand")
        .classList.remove(".content-tr-expand");

      if (this.$store.state.proveedores.error) {
        this.$vs.notify({
          time: 4000,
          position: "top-center",
          icon: "error",
          color: "danger",
          title: "Algo ha salido mal!",
          text: "Por favor inténtelo de nuevo más tarde"
        });
      } else {
        this.$vs.notify({
          time: 4000,
          position: "top-center",
          icon: "delete",
          color: "danger",
          title: "Eliminación Exitosa!",
          text: `Proveedor: ${this.art.name}, ha sido eliminado`
        });
      }
    },
    nuevo(bool) {
      this.prompt = true;
      this.index = 1;
      this.proveedoresModel = {};
    },
    cleanErrors() {
      this.$store.state.proveedores.error = false;
      this.$store.state.proveedores.errorMessage = "";
    }
  },
  components: {
    DataTable
  }
};
</script>

<style lang="css">
#prompt {
  margin-left: 10%;
}

.btn {
  margin-left: 38%;
}
</style>
