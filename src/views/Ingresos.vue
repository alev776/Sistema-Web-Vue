<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Ingresos"
      @btn="nuevo"
      @eliminar="eliminar"
    >
    </data-table>
    <vs-popup class="holamundo" title="Ingresos" :active.sync="prompt">
      <vs-row vs-w="12">
        <vs-col
          vs-type="flex"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="12"
          vs-sm="6"
          vs-xs="5"
        >
          <vs-select
            placeholder="Select"
            class="selectExample"
            label="Tipo Comprobante"
            v-model="ingresosModel.tipo_comprobante"
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
          vs-sm="6"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>phone</md-icon>
            <label>Série Comprobante</label>
            <md-input v-model="ingresosModel.serie_comprobante"></md-input>
          </md-field>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="5"
          vs-sm="6"
          vs-xs="5"
        >
          <md-field class="has-green">
            <md-icon>place</md-icon>
            <label>Número Comprobante</label>
            <md-input v-model="ingresosModel.num_comprobante"></md-input>
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
            label="Proveedor"
            v-model="ingresosModel.proveedor"
          >
            <vs-select-item
              :key="index"
              :value="item._id"
              :text="item.name"
              v-for="(item, index) in proveedor"
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
            <label>Impuesto</label>
            <md-input v-model="ingresosModel.impuesto"></md-input>
          </md-field>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="12"
          vs-sm="6"
          vs-xs="5"
        >
          <vs-select
            placeholder="Select"
            class="selectExample"
            label="Artículo"
            @change="articulosModel"
            v-model="articuloVal"
          >
            <vs-select-item
              :key="index"
              :value="item._id"
              :text="item.nombre"
              v-for="(item, index) in articulos"
            />
          </vs-select>
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
      <div class="section">
        <vs-table
            stripe
            :data="articulosArray"
        >
          <template slot="thead">
            <vs-th>
              Borrar
            </vs-th>

            <vs-th>
              Artículo
            </vs-th>
            <vs-th>
              Cantidad
            </vs-th>
            <vs-th>
              Precio
            </vs-th>
            <vs-th>
              Subtotal
            </vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <vs-button
                  type="flat"
                  @click="update"
                  size="small"
                  icon="delete"
                ></vs-button>
              </vs-td>

              <vs-td :data="tr.nombre">
                {{ tr.nombre }}
              </vs-td>

              <vs-td :data="tr.cantidad">
                {{tr.cantidad}}

                <template slot="edit" >
                <vs-input-number v-on:keyup.13="handle(data)" v-model="tr.cantidad"/>
                </template>
            </vs-td>

            <vs-td :data="tr.precio">
                {{tr.precio}}

                <template slot="edit" >
                <vs-input-number v-on:keyup.13="handle(data)" v-model="tr.precio"/>
                </template>
            </vs-td>

            <vs-td :data="tr.subtotal" v-model="tr.subtotal">
                {{tr.subtotal}}

            </vs-td>
            </vs-tr>
          </template>
        </vs-table>
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
        { text: "Proveedor", value: "proveedor" },
        { text: "Tipo Comprobante", value: "tipo_comprobante" },
        { text: "Serie Comprobante", value: "serie_comprobante" },
        { text: "Número Comprobante", value: "numero_comprobante" },
        { text: "Fecha", value: "fecha" },
        { text: "Impuesto", value: "impuesto" },
        { text: "Total", value: "total" },
        { text: "Estado", value: "estado" }
      ],
      ingresosModel: {
        proveedor: "",
        tipo_comprobante: "",
        serie_comprobante: null,
        num_comprobante: "",
        impuesto: null,
        total: "",
        _id: "",
        fecha: "",
        codigo: "",
        token: "",
      },
      art: {},
      detalles: {
          idArticulo: "",
          precio: 0,
          cantidad: 0,
          _id: ""
      },
      articuloVal: '',
      articulosArray: [],
      tipo_documentos: ["Cédula", "Pasaporte", "RNC"],
      index: null,
      id: {},
      prompt: false
    };
  },
  beforeMount() {
    this.ingresos();
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
    ingresosArray() {
      return this.$store.state.ingresos.ingresos.ingresos;
    },
    ingresosDetalles() {
      return this.$store.state.ingresos.ingresos.detalles;
    },
    proveedor() {
      return this.$store.state.proveedores.proveedor;
    },
    articulos() {
      return this.$store.state.articulos.articulos;
    },
  },
  methods: {
    ...mapActions({
      getIngresos: "ingresos/getIngresos",
      getArticulos: "articulos/getArticulos",
      getProveedor: "proveedores/getProveedor",
      postProveedor: "proveedores/postProveedor",
      editProveedor: "proveedores/editProveedor",
      deleteProveedor: "proveedores/deleteProveedor"
    }),
    model(data) {
      Object.assign(this.ingresosModel, data);
      const id = this.proveedor.find(x => x.email === data.email);
      this.ingresosModel._id = id._id;

      this.prompt = true;
      this.index = -1;
    },
    handle(t) {
        const index = this.articulosArray.find(x => x._id === t._id);
        t[index].subtotal = t[index].cantidad * t[index].precio;
        console.log(t);
        this.articulosArray = t;
    },
    async ingresos() {
      await this.getIngresos(this.token);
      await this.getProveedor(this.token);
      await this.getArticulos(this.token);

      const date = new Date();
      console.log(typeof this.ingresosArray);
    },
    newArray() {
      const headers = [
        "proveedor",
        "tipo_comprobante",
        "num_comprobante",
        "serie_comprobante",
        "fecha",
        "impuesto",
        "total",
        "estado"
      ];
      this.ingresosArray.forEach(x => {
        let proveedor = this.proveedor.find(y => y._id === x.proveedor);
        if (proveedor) {
          x.proveedor = proveedor.name;
        }
      });
      return this.allowedHeaders(headers);
      console.log(this.ingreso);
    },
    allowedHeaders(headers) {
      const arreglo = [];
      this.ingresosArray.forEach(x => {
        let prueba = {};
        headers.forEach(y => {
          prueba[y] = x[y];
        });
        arreglo.push(prueba);
      });
      return arreglo;
    },
    articulosModel() {
        const articulo =  this.articulos.find(x => x._id === this.articuloVal);
        articulo.cantidad = 1;
        articulo.precio = 1;
        articulo.subtotal = articulo.cantidad * articulo.precio;
        this.articulosArray.push(articulo);
    },
    async update() {
      this.ingresosModel.token = this.token;
      this.cleanErrors();
      await this.editProveedor(this.ingresosModel);
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
      this.ingresosModel.token = this.token;
      this.cleanErrors();
      await this.postProveedor(this.ingresosModel);
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
      this.ingresosModel = {};
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
