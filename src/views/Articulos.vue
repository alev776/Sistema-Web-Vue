<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Articulos"
      @btn="nuevo"
      @eliminar="eliminar"
      @printAll="crearPDF"
      :search="true"
    >
    </data-table>
    <modal v-if="prompt" id="modal">
      <template slot="header">
        <h3 v-if="index === 1">Nuevo Artículo</h3>
        <h3 v-else>Actualizar Artículo</h3>
      </template>
      <template slot="body">
        <vs-row vs-w="12">
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.5"
            vs-w="6"
            vs-lg="5"
            vs-sm="6"
            vs-xs="6"
          >
            <md-field class="has-green">
              <md-icon>bookmarks</md-icon>
              <label>Código</label>
              <md-input
                v-model="articulosModel.codigo"
                v-validate="'required'"
                name="Código"
              >
              </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="codigo">{{ errors.first('Código') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-offset="6.5"
            vs-w="4"
            vs-lg="5"
            vs-sm="5"
            vs-xs="5"
          >
            <vs-select
              placeholder="Select"
              class="selectExample"
              id="up2"
              label="Categoría"
              v-model="articulosModel.categoria"
              v-validate="'required'"
              name="Categoría"
            >
              <vs-select-item
                :key="index"
                :value="item._id"
                :text="item.nombre"
                v-for="(item, index) in categorias"
              />
            </vs-select>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="categoria">{{ errors.first('Categoría') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.5"
            vs-w="5"
            vs-lg="11"
            vs-sm="5"
            vs-xs="5"
          >
            <md-field class="has-green" id="nombre">
              <md-icon>category</md-icon>
              <label>Nombre</label>
              <md-input v-model="articulosModel.nombre" v-validate="'required'" name="Nombre" ></md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Nombre') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.5"
            vs-w="5"
            vs-lg="5"
            vs-sm="5"
            vs-xs="5"
          >
            <md-field class="has-green" id="nombre">
              <md-icon>money</md-icon>
              <label>Stock</label>
              <md-input
                v-model="articulosModel.stock"
                v-validate="'required'"
                name="Stock"
                type="number"
              >
              </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Stock') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="6.5"
            vs-w="5"
            vs-lg="5"
            vs-sm="5"
            vs-xs="5"
          >
            <md-field class="has-green" id="up">
              <md-icon>attach_money</md-icon>
              <label>Precio de Venta</label>
              <md-input
                v-model="articulosModel.precio_venta"
                v-validate="'required'"
                name="Precio"
                type="number"
                >
                </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid" id="align">
            <span style="color: red" id="font">{{ errors.first('Precio') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.5"
            vs-w="5"
            vs-lg="11"
            vs-sm="5"
            vs-xs="5"
          >
            <md-field class="has-green" id="nombre">
              <md-icon>description</md-icon>
              <label>Descripción</label>
              <md-input v-model="articulosModel.descripcion" v-validate="'required'" name="Descripción"></md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Descripción') }}</span>
          </div>
        </vs-row>
        <div class="btn">
        <vs-button
          color="primary"
          type="flat"
          @click="post"
          size="large"
          v-if="index === 1"
          icon="save"
          :disabled="errors.any()"
          >Add</vs-button
        >
        <vs-button
          color="primary"
          type="flat"
          @click="update"
          size="large"
          v-else
          icon="update"
          :disabled="errors.any()"
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
      </template>



    </modal>
  </div>
</template>

<script>
import DataTable from "../components/Data-Table";
import { mapActions } from "vuex";
import {Modal} from '@/components'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default {
  name: "articulos",
  data() {
    return {
      header: [
        { text: "Código", value: "codigo" },
        { text: "Nombre", value: "nombre" },
        { text: "Categoría", value: "categoria" },
        { text: "Stock", value: "stock" },
        { text: "Precio Venta", value: "precio_venta" },
        { text: "Descripción", value: "descripcion" },
        { text: "Estado", value: "estado" }
      ],
      articulosModel: {
        codigo: null,
        nombre: "",
        categoria: "",
        stock: null,
        precio_venta: null,
        descripcion: "",
        token: "",
        _id: ""
      },
      art: {},
      index: null,
      arrayHeader: [],
      id: {},
      prompt: false
    };
  },
  beforeMount() {
    this.articles();
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
    articulos() {
      return this.$store.state.articulos.articulos;
    },
    categorias() {
      return this.$store.state.categorias.categorias.data;
    }
  },
  methods: {
    ...mapActions({
      getArticulos: "articulos/getArticulos",
      getCategorias: "categorias/getCategorias",
      postAritculo: "articulos/postAritculo",
      editArticulo: "articulos/editArticulo",
      deleteArticulo: "articulos/deleteArticulo"
    }),
    crearPDF() {
      const doc = new jsPDF()

      let print = []
      const rows = this.articulos.map(x => {
        print.push(x.codigo, x.nombre, x.categoria, x.stock, x.precio_venta)
      });

      doc.autoTable({
        head: [
        "codigo",
        "nombre",
        "categoria",
        "stock",
        "precio_venta"
        ],
        body: print
      })
      doc.save('table.pdf')
    },
    model(data) {
      Object.assign(this.articulosModel, data);
      const id = this.articulos.find(
        x =>
          x.nombre === data.nombre &&
          x.descripcion === data.descripcion &&
          x.codigo === data.codigo
      );
      this.articulosModel._id = id._id;

      const categoriaId = this.categorias.find(
        x => x.nombre === data.categoria
      );
      this.articulosModel.categoria = categoriaId._id;
      this.prompt = true;
      this.index = -1;
    },
    async articles() {
      await this.getArticulos(this.token);
      await this.getCategorias(this.token);
    },
    newArray() {
      const allowedHeaders = [
        "codigo",
        "nombre",
        "categoria",
        "stock",
        "precio_venta",
        "descripcion",
        "activo"
      ];
      this.articulos.forEach(x => {
        if (this.categorias) {
          let categoria = this.categorias.find(y => y._id === x.categoria);
          if (categoria) {
            x.categoria = categoria.nombre;
          }
        }

      });
      return this.allowedHeaders(allowedHeaders);
    },
    allowedHeaders(headers) {
      const arreglo = [];
      this.articulos.forEach(x => {
        let prueba = {};
        headers.forEach(y => {
          prueba[y] = x[y];
        });
        arreglo.push(prueba);
      });
      return arreglo;
    },
    async update() {
      if (!await this.$validator.validate()) {
        return;
      } else {
        const id = this.categorias.find(
          x => x.nombre === this.articulosModel.categoria
        );
        if (id) {
          this.articulosModel.categoria = id._id;
        }
        this.articulosModel.token = this.token;
        this.cleanErrors();

        await this.editArticulo(this.articulosModel);
        await this.getArticulos(this.token);
        this.prompt = false;

        if (this.$store.state.articulos.error) {
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
            title: "Artículo Actulizado!"
          });
        }
      }
    },
    async post() {
      if (!await this.$validator.validate()) {
        return;
      } else {
        this.articulosModel.token = this.token;
        this.cleanErrors();
        await this.postAritculo(this.articulosModel);
        await this.getArticulos(this.token);
        this.prompt = false;

        if (this.$store.state.articulos.error) {
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
            title: "Artículo Agregado!"
          });
        }
      }
    },
    eliminar(el) {
      const id = this.articulos.find(
        x =>
          x.nombre === el.nombre &&
          x.descripcion === el.descripcion &&
          x.codigo === el.codigo
      );
      this.art = id;
      this.art.token = this.token;
      this.cleanErrors();

      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: `¿Está seguro que desea eliminar el artículo ${id.nombre}?`,
        accept: this.acceptAlert
      });
    },
    async acceptAlert() {
      await this.deleteArticulo(this.art);
      await this.getArticulos(this.token);

      document.querySelector(".content-tr-expand").style.display = "none";
      document
        .querySelector(".content-tr-expand")
        .classList.remove(".content-tr-expand");

      if (this.$store.state.articulos.error) {
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
          text: `Artículo: ${this.art.nombre}, ha sido eliminado`
        });
      }
    },
    nuevo(bool) {
      this.prompt = true;
      this.index = 1;
      this.articulosModel = {};
    },
    cleanErrors() {
      this.$store.state.articulos.error = false;
      this.$store.state.articulos.errorMessage = "";
    }
  },
  components: {
    DataTable,
    Modal
  }
};
</script>

<style lang="css">
#prompt {
  margin-left: 10%;
}

#nombre {
  margin-top: 40%;
}

#up {
  margin-top: -25%;
}

#up2 {
  margin-top: -34%;
}

#categoria {
  margin-left: 50%;
}

.btn {
  margin-left: 38%;
}

#align {
  margin-left: 52%;
}

#nombre {
  margin-top: 30px;
}

#font {
  font-size: 15px;
}

</style>
