<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Consulta Compras"
      :date="true"
      @dateTime="dateTime"
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
            disabled
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
          vs-offset="-0.5"
          vs-w="5"
          vs-lg="5"
          vs-sm="6"
          vs-xs="5"
        >

          <md-field class="has-green">
            <md-icon>date_range</md-icon>
            <label>Fecha</label>
            <md-input v-model="ingresosModel.fecha" disabled></md-input>
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
            <md-icon>phone</md-icon>
            <label>Série Comprobante</label>
            <md-input v-model="ingresosModel.serie_comprobante" disabled></md-input>
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
            <md-input v-model="ingresosModel.num_comprobante" disabled></md-input>
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
            disabled
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
            <md-input v-model="ingresosModel.impuesto" disabled>1</md-input>
          </md-field>
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
              <vs-td :data="tr.nombre">
                {{ tr.nombre }}
              </vs-td>

              <vs-td :data="tr.cantidad">
                  {{tr.cantidad}}
              </vs-td>

              <vs-td :data="tr.precio">
                  {{tr.precio}}
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
          color="danger"
          type="flat"
          size="large"
          @click="prompt = false"
          icon="cancel"
          >Close</vs-button
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
        proveedor: '',
        tipo_comprobante: "",
      },
      art: {},
      articuloVal: '',
      articulosArray: [],
      tipo_documentos: ["FACTURA", "BOLETA", "TICKET"],
      index: null,
      id: '',
      prompt: false,
      neto: 0
    };
  },
  beforeMount() {
    this.ingresos();
  },
  mounted() {
    this.$store.state.ingresos.ingresos = []
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
      getArticulos: "articulos/getArticulos",
      getProveedor: "proveedores/getProveedor"
    }),
    async dateTime(time) {
      await this.$store.dispatch('ingresos/getIngresosByDate', time);
    },
    currencyFormatter(money) {
      const formatter  = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      return formatter.format(money);
    },
    model(data) {
      const ingresoId = this.ingresosArray.find(x => x.total === data.total && x.num_comprobante === data.num_comprobante && x.serie_comprobante === data.serie_comprobante);
      Object.assign(this.ingresosModel, data);
      this.ingresosDetalles.forEach(x => {
        const articulo = this.articulos.find(y => y._id === x.idArticulo);
        x.nombre = articulo.nombre;
        x.subtotal = x.precio * x.cantidad;
      });
      this.id = ingresoId._id;

      let det = this.ingresosDetalles.filter(x => x.idIngreso === ingresoId._id);
      this.articulosArray = det;

      this.prompt = true;
      this.index = -1;
    },
    async ingresos() {
      await this.getProveedor(this.token);
      await this.getArticulos(this.token);
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
            x.fecha = new Date(x.fecha).toISOString().substr(0, 10);
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
