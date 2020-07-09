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
          vs-lg="6"
          vs-sm="6"
          vs-xs="5"
        >
          <vs-select
            placeholder="Select"
            class="selectExample"
            label="Tipo Comprobante"
            v-model="tipo_comprobante"
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
          vs-offset="-0.5"
          vs-w="5"
          vs-lg="5"
          vs-sm="6"
          vs-xs="5"
        >
          <div>
            <md-datepicker v-model="ingresosModel.fecha">
            <label>Select date</label>
          </md-datepicker>
          </div>
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
            v-model="proveedorModel"
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
            <md-input v-model="ingresosModel.impuesto">1</md-input>
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
            label="Agregar Artículo"
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
      <div>
        <vs-table
            stripe
            :data="articulosArray"
            v-if="articulosArray.length > 0"
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
                  @click="deleteArticulo(tr)"
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
                <vs-input-number v-on:keyup.13="handle(data, tr)" v-model="tr.cantidad"/>
                </template>
            </vs-td>

            <vs-td :data="tr.precio">
                {{tr.precio}}

                <template slot="edit" >
                <vs-input-number v-on:keyup.13="handle(data, tr)" v-model="tr.precio"/>
                </template>
            </vs-td>

            <vs-td :data="tr.subtotal" v-model="tr.subtotal">
                {{tr.subtotal}}

            </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div v-if="articulosArray.length > 0">
          <vs-row vs-w="12">
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-offset="6.6"
              vs-w="5"
              vs-lg="5"
              vs-sm="6"
              vs-xs="5"
            >
              <strong>Total Parcial: {{ totalParcial }}</strong>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-offset="6.5"
              vs-w="5"
              vs-lg="5"
              vs-sm="6"
              vs-xs="5"
            >
              <strong>Total Impuesto: {{ totalImpuestos }}</strong>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-offset="6.8"
              vs-w="5"
              vs-lg="5"
              vs-sm="6"
              vs-xs="5"
            >
              <strong>Total Neto: {{ totalNeto }}</strong>
            </vs-col>
          </vs-row>
        </div>
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
        serie_comprobante: null,
        num_comprobante: null,
        impuesto: 1,
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
      proveedorModel: '',
      tipo_comprobante: "",
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
    totalNeto() {
      let contador = 0;
      if (this.articulosArray.length > 0) {
        this.articulosArray.forEach(x => {
          contador += x.subtotal
        });
      }
      const formatter  = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      return this.currencyFormatter(contador);

    },
    totalImpuestos() {
      let contador = 0;
      if (this.ingresosModel.impuesto > 0) {
        if (this.articulosArray.length > 0) {
        this.articulosArray.forEach(x => {
          contador += x.subtotal
        });
      }
        contador = (contador * this.ingresosModel.impuesto) / 100;
      }

      return this.currencyFormatter(contador);
    },
    totalParcial() {
      let contador = 0;
      let impuestoTotal = 0;
        if (this.articulosArray.length > 0) {
        this.articulosArray.forEach(x => {
          contador += x.subtotal
        });
        impuestoTotal = (contador * this.ingresosModel.impuesto || 0) / 100;
      }
      return this.currencyFormatter(contador - impuestoTotal);
    }
  },
  methods: {
    ...mapActions({
      getIngresos: "ingresos/getIngresos",
      getArticulos: "articulos/getArticulos",
      getProveedor: "proveedores/getProveedor",
      postIngresos: "ingresos/postIngresos",
      editProveedor: "proveedores/editProveedor",
      deleteProveedor: "proveedores/deleteProveedor"
    }),
    currencyFormatter(money) {
      const formatter  = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      return formatter.format(money);
    },
    model(data) {
      Object.assign(this.ingresosModel, data);
      const id = this.proveedor.find(x => x.email === data.email);
      this.ingresosModel._id = id._id;

      this.prompt = true;
      this.index = -1;
    },
    handle(t, r) {
      const indexR = t.findIndex(x => x._id === r._id);
      const index = this.articulosArray.findIndex(x => x._id === t[indexR]._id);
      t[index].subtotal = t[index].cantidad * t[index].precio;
      this.articulosArray = t;
    },
    deleteArticulo(articulo) {
      const index = this.articulosArray.findIndex(x => x._id === articulo._id);
      this.articulosArray.splice(index, 1);

      if (!this.articulosArray.length > 0) {
        this.articuloVal = '';
      }
    },
    async ingresos() {
      await this.getIngresos(this.token);
      await this.getProveedor(this.token);
      await this.getArticulos(this.token);

      const date = new Date();
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
      if (this.ingresosArray) {
        this.ingresosArray.forEach(x => {
          let proveedor = this.proveedor.find(y => y._id === x.proveedor);
          if (proveedor) {
            x.proveedor = proveedor.name;
          }
        });
      }
      return this.allowedHeaders(headers);
    },
    allowedHeaders(headers) {
      const arreglo = [];
      if (this.ingresosArray) {
        this.ingresosArray.forEach(x => {
          let prueba = {};
          headers.forEach(y => {
            prueba[y] = x[y];
          });
          arreglo.push(prueba);
        });
      }
      return arreglo;
    },
    articulosModel() {
        const articulo =  this.articulos.find(x => x._id === this.articuloVal);
        if (articulo) {
          articulo.cantidad = 1;
          articulo.precio = 1;
          articulo.subtotal = articulo.cantidad * articulo.precio;

          const exist = this.articulosArray.some(x => x._id === articulo._id);
          if (exist) {
            this.$vs.dialog({
              icon: "error",
              color: "danger",
              title: `Articulo ya agregado`,
              text: `El articulo ${articulo.nombre} ya ha sido agregado`
            });
          } else {
            this.articulosArray.push(articulo);
          }
        }
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
      return console.log(this.ingresosModel, this.tipo_comprobante, this.proveedorModel, this.articulosArray);
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
      this.articulosArray = [];
      this.articuloVal = '';
      this.tipo_comprobante = '',
      this.proveedorModel = ''
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
