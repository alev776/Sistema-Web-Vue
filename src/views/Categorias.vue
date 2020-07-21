<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Categorias"
      :button="button"
      @btn="nuevo"
      @eliminar="eliminar"
      :search="true"
    >
    </data-table>
    <modal v-if="prompt" id="modal">
      <template slot="header">
        <h3>Nueva Categoría</h3>
      </template>
      <template slot="body">
        <div class="con-exemple-prompt">
            <md-field class="has-green">
            <md-icon>category</md-icon>
            <label>Categoría</label>
            <md-input
              type="text"
              v-model="nuevaCategoria.nombre"
              v-validate="'required'"
              name="Categoría"
            >
            </md-input>
          </md-field>
          <span style="color: red">{{ errors.first('Categoría') }}</span>

          <md-field class="has-green">
            <md-icon>description</md-icon>
            <label>Descripción</label>
            <md-input
              v-model="nuevaCategoria.descripcion"
              v-validate="'max:80'"
              name="Descripción"
            >
            </md-input>
          </md-field>
          <span style="color: red">{{ errors.first('Descripción') }}</span>
        </div>
        <div class="btn">
        <vs-button
          color="primary"
          type="flat"
          @click="post"
          size="large"
          icon="save"
          :disabled="errors.any()"
          >Add</vs-button
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
      </template>
    </modal>

    <modal v-if="prompt2" id="modal">
      <template slot="header">
        <h3>Actualizar Categoría</h3>
      </template>
      <template slot="body">
        <div class="con-exemple-prompt">
          <md-field class="has-green">
            <md-icon>category</md-icon>
            <label>Categoría</label>
            <md-input
              v-model="editCategoria.nombre"
              v-validate="'required'"
              name="Categoría"
            >
            </md-input>
          </md-field>
          <span style="color: red">{{ errors.first('Categoría') }}</span>
          <md-field class="has-green">
            <md-icon>description</md-icon>
            <label>Descripción</label>
            <md-input
              v-model="editCategoria.descripcion"
              v-validate="'max:80'"
              name="Descripción"
            >
            </md-input>
          </md-field>
          <span style="color: red">{{ errors.first('Descripción') }}</span>
        </div>

      </template>
      <template slot="footer">
        <div class="btn" id="btn">
        <vs-button
          color="primary"
          type="flat"
          @click="edit"
          size="large"
          icon="update"
          :disabled="errors.any()"
          >Update</vs-button
        >
        <vs-button
          color="danger"
          type="flat"
          size="large"
          @click="prompt2 = false"
          icon="cancel"
          >Cancel</vs-button
        >
      </div>
      </template>
    </modal>
  </div>
</template>

<script>
import DataTable from "../components/Data-Table";
import { mapActions } from "vuex";
import { Validator } from 'vee-validate';
import {Modal} from '@/components'

export default {
  name: "categorias",
  data() {
    return {
      nuevaCategoria: {
        nombre: "",
        descripcion: ""
      },
      editCategoria: {
        nombre: "",
        descripcion: ""
      },
      header: [
        { text: "Categoría", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Estado", value: "estado" }
      ],
      prueba: '',
      cat: {},
      id: {},
      button: true,
      prompt: false,
      prompt2: false,
      activeConfirm: false
    };
  },
  mounted() {
    this.categoria();
    this.newArray();
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
    categorias() {
      return this.$store.state.categorias.categorias.data;
    },
    articulos() {
      return this.$store.state.articulos.articulos;
    }
  },
  methods: {
    ...mapActions({
      getCategorias: "categorias/getCategorias",
      editCategorias: "categorias/editCategorias",
      postCategoria: "categorias/postCategoria",
      deleteCategorias: "categorias/deleteCategorias",
      getArticulos: "articulos/getArticulos"
    }),
    setName(value) {
      this.prueba = value
      this.$v.prueba.$touch()
    },
    setNombre(value) {
      this.nuevaCategoria.nombre = value
      this.$v.nuevaCategoria.nombre.$touch()
    },
    model(data) {
      Object.assign(this.editCategoria, data);
      this.prompt2 = true;

      const id = this.categorias.find(
        x => x.nombre === data.nombre && x.descripcion === data.descripcion
      );
      this.id = id;
    },
    async categoria() {
      await this.getCategorias(this.token);
    },
    newArray() {
      const allowedHeaders = ["nombre", "descripcion", "estado"];
      const arreglo = [];
      if (this.categorias) {
        this.categorias.forEach(x => {
        let prueba = {};
        allowedHeaders.forEach(y => {
          prueba[y] = x[y];
        });
        arreglo.push(prueba);
      });
      }
      return arreglo;
    },
    async edit() {
      if (!await this.$validator.validateAll()) {
        return;
      } else {
        const body = {
          _id: this.id._id,
          nombre: this.editCategoria.nombre,
          descripcion: this.editCategoria.descripcion,
          token: this.token
        };
        this.cleanErrors();
        await this.editCategorias(body);
        await this.getCategorias(this.token);
        this.prompt2 = false

        if (this.$store.state.categorias.error) {
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
            time: 3000,
            position: "top-center",
            color: "primary",
            icon: "update",
            title: "Categoría Actualizada"
          });
        }
      }
    },
    async post() {
      if (!await this.$validator.validate()) {
        return;
      } else {
          this.nuevaCategoria.token = this.token;
          this.cleanErrors();
          await this.postCategoria(this.nuevaCategoria);
          await this.getCategorias(this.token);
          this.prompt = false;

          if (this.$store.state.categorias.error) {
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
              time: 3000,
              position: "top-center",
              color: "success",
              icon: "check_box",
              title: "Categoría Agregada"
            });
          }
      }

    },
    async articuloExist(id) {
      await this.getArticulos(this.token);
      const exist = this.articulos.some(x => x.categoria === id._id);

      return exist;
    },
    async eliminar(el) {
      const id = this.categorias.find(
        x => x.nombre === el.nombre && x.descripcion === el.descripcion
      );
      const categoria = {};
      categoria._id = id._id;
      categoria.token = this.token;
      this.cat = categoria;
      this.cat.id = id;
      this.cleanErrors();

      const exist = this.articuloExist(id);
      exist.then(el => {
        if (el) {
          this.$vs.notify({
            time: 7500,
            position: "top-center",
            icon: "warning",
            color: "warning",
            title: `¡Advertencia!`,
            text: `No se puede eliminar la categoría ${id.nombre} porque ya está siendo usada por uno o varios artículos.`
          });
        } else {
          this.$vs.dialog({
            type: "confirm",
            color: "danger",
            title: `Confirm`,
            text: `¿Está seguro que desea eliminar la categoría ${id.nombre}?`,
            accept: this.acceptAlert
          });
        }
      });
    },
    async acceptAlert() {
      await this.deleteCategorias(this.cat);
      await this.getCategorias(this.token);

      document.querySelector(".content-tr-expand").style.display = "none";
      document
        .querySelector(".content-tr-expand")
        .classList.remove(".content-tr-expand");

      if (this.$store.state.categorias.error) {
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
          color: "danger",
          title: "Categoría eliminada",
          text: `Categoría: ${this.cat.id.nombre}, ha sido eliminada`
        });
      }
    },
    nuevo(bool) {
      this.prompt = bool;
      this.nuevaCategoria = {};
    },
    cleanErrors() {
      this.$store.state.categorias.error = false;
      this.$store.state.categorias.errorMessage = "";
    }
  },
  components: {
    DataTable,
    Modal
  }
};
</script>

<style lang="css" scoped>
  #error {
    color: red;
  }
</style>