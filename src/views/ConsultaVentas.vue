<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Consulta Ventas"
      :date="true"
      @dateTime="dateTime"
    >
    </data-table>
    <vs-popup class="holamundo" title="Ventas" :active.sync="prompt">
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
            disabled
            v-model="ventasModel.tipo_comprobante"
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
            <md-input v-model="ventasModel.fecha" disabled></md-input>
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
            <md-input v-model="ventasModel.serie_comprobante" disabled></md-input>
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
            <md-input v-model="ventasModel.num_comprobante" disabled></md-input>
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
            label="clientes"
            disabled
            v-model="ventasModel.clienteId"
          >
            <vs-select-item
              :key="index"
              :value="item._id"
              :text="item.name"
              v-for="(item, index) in clientes"
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
            <md-input v-model="ventasModel.impuesto" disabled>1</md-input>
          </md-field>
        </vs-col>

        <vs-col
          vs-type="flex"
          vs-offset="0.5"
          vs-w="5"
          vs-lg="5"
          vs-sm="6"
          vs-xs="5"
        >
          <vs-select
            placeholder="Select"
            class="selectExample"
            label="Agregar Artículo"
            disabled
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
            <label>Descuento</label>
            <md-input v-model="ventasModel.descuento" disabled></md-input>
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
              <strong>Total Impuesto({{ ventasModel.impuesto }}%): {{ totalImpuestos }}</strong>
            </vs-col>
            <vs-col
              v-if="ventasModel.descuento > 0"
              vs-type="flex"
              vs-justify="center"
              vs-offset="6.5"
              vs-w="5"
              vs-lg="5"
              vs-sm="6"
              vs-xs="5"
            >
              <strong>Total Descuento({{ ventasModel.descuento }}%): {{ totalDescuento }}</strong>
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
        { text: "Cliente", value: "cliente" },
        { text: "Tipo Comprobante", value: "tipo_comprobante" },
        { text: "Serie Comprobante", value: "serie_comprobante" },
        { text: "Número Comprobante", value: "numero_comprobante" },
        { text: "Fecha", value: "fecha" },
        { text: "Impuesto", value: "impuesto" },
        { text: "Total", value: "total" },
        { text: "Estado", value: "estado" }
      ],
      ventasModel: {
        serie_comprobante: null,
        num_comprobante: null,
        impuesto: 1,
        total: "",
        _id: "",
        fecha: "",
        clienteId: '',
        descuento: 0,
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
    this.ventas();
  },
  mounted() {
    this.$store.state.ventas.ventas = [];
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
    ventasArray() {
      return this.$store.state.ventas.ventas.ventas;
    },
    ventasDetalles() {
      return this.$store.state.ventas.ventas.detalles;
    },
    clientes() {
      return this.$store.state.clientes.cliente;
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
      if (this.ventasModel.impuesto > 0) {
        if (this.articulosArray.length > 0) {
        this.articulosArray.forEach(x => {
          contador += x.subtotal
        });
      }
        contador = (contador * this.ventasModel.impuesto) / 100;
      }

      return this.currencyFormatter(contador);
    },
    totalDescuento() {
      let contador = 0;
      if (this.ventasModel.impuesto > 0) {
        if (this.articulosArray.length > 0) {
        this.articulosArray.forEach(x => {
          contador += x.subtotal
        });
      }
        contador = (contador * this.ventasModel.descuento) / 100;
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
        impuestoTotal = (contador * this.ventasModel.impuesto || 0) / 100;
      }
      return this.currencyFormatter(contador - impuestoTotal);
    }
  },
  methods: {
    ...mapActions({
      getVentasByDate: "ventas/getVentasByDate",
      getArticulos: "articulos/getArticulos",
      getClientes: "clientes/getClientes"
    }),
    async dateTime(time) {
      await this.getVentasByDate(time);
    },
      async ventas() {
        await this.getClientes(this.token);
        await this.getArticulos(this.token);
      },
    currencyFormatter(money) {
      const formatter  = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      return formatter.format(money);
    },
    model(data) {
      const venta = this.ventasArray.find(x => x.total === data.total && x.num_comprobante === data.num_comprobante && x.serie_comprobante === data.serie_comprobante);
      Object.assign(this.ventasModel, data);
      this.ventasModel.descuento = venta.descuento;
      this.ventasDetalles.forEach(x => {
        const articulo = this.articulos.find(y => y._id === x.idArticulo);
        x.nombre = articulo.nombre;
        x.subtotal = x.precio * x.cantidad;
      });
      this.id = venta._id;

      let det = this.ventasDetalles.filter(x => x.ventaId === venta._id);
      this.articulosArray = det;

      this.prompt = true;
      this.index = -1;
    },
    handle(t, r) {
      const indexR = this.articulosArray.findIndex(x => x._id === r._id);
          t[indexR].subtotal = r.cantidad * r.precio;
          t[indexR].idArticulo = r._id
          this.articulosArray = t;
    },
    newArray() {
      const headers = [
        "clienteId",
        "tipo_comprobante",
        "num_comprobante",
        "serie_comprobante",
        "fecha",
        "impuesto",
        "total",
        "estado"
      ];
      if (this.ventasArray) {
        this.ventasArray.forEach(x => {
          let clientes = this.clientes.find(y => y._id === x.clienteId);
          if (clientes) {
            x.clienteId = clientes.name;
            x.fecha = new Date(x.fecha).toISOString().substr(0, 10);
          }
        });
      }
      return this.allowedHeaders(headers);
    },
    allowedHeaders(headers) {
      const arreglo = [];
      if (this.ventasArray) {
        this.ventasArray.forEach(x => {
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
