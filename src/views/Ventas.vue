<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Ventas"
      @btn="nuevo"
      @eliminar="eliminar"
      :search="true"
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
              v-model="ventasModel.tipo_comprobante"
              v-validate="'required'"
              name="Comprobante"
            >
              <vs-select-item
                :key="index"
                :value="item"
                :text="item"
                v-for="(item, index) in tipo_documentos"
              />
            </vs-select>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Comprobante') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.5"
            vs-w="5"
            vs-lg="5"
            vs-sm="6"
            vs-xs="5"
          >

            <md-field class="has-green" id="fecha">
              <md-icon>date_range</md-icon>
              <label>Fecha (yyyy-mm-dd)</label>
              <md-input v-model="ventasModel.fecha"></md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="">{{ errors.first('date') }}</span>
          </div>

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
              <md-icon>drag_indicator</md-icon>
              <label>Série Comprobante</label>
              <md-input
                v-model="ventasModel.serie_comprobante"
                v-validate="'required'"
                name="Série"
                type="number"
              >
              </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Série') }}</span>
          </div>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.5"
            vs-w="5"
            vs-lg="5"
            vs-sm="6"
            vs-xs="5"
          >
            <md-field class="has-green" id="numeroComprobante">
              <md-icon>drag_indicator</md-icon>
              <label>Número Comprobante</label>
              <md-input
                v-model="ventasModel.num_comprobante"
                v-validate="'required'"
                name="Número"
                type="number"
              >
              </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font" class="numeroComp">{{ errors.first('Número') }}</span>
          </div>

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
              label="Clientes"
              v-model="ventasModel.clienteId"
              v-validate="'required'"
              name="Clientes"
            >
              <vs-select-item
                :key="index"
                :value="item._id"
                :text="item.name"
                v-for="(item, index) in clientes"
              />
            </vs-select>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Clientes') }}</span>
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
            <md-field class="has-green" id="impuesto">
            <md-icon>attach_money</md-icon>
            <label>Impuesto</label>
                <md-input v-model="ventasModel.impuesto" type="number"></md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('impuesto') }}</span>
          </div>

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

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-offset="0.9"
            vs-w="5"
            vs-lg="4"
            vs-sm="5"
            vs-xs="5"
          >
            <md-field class="has-green" id="descuento">
              <md-icon>money_off</md-icon>
              <label>Descuento</label>
              <md-input v-model="ventasModel.descuento" type="number"></md-input>
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
                  <vs-button
                    type="flat"
                    @click="handle(data, tr)"
                    size="small"
                    icon="update"
                  ></vs-button>
                  </template>
              </vs-td>

              <vs-td :data="tr.precio">
                  {{tr.precio}}

                  <template slot="edit" >
                  <vs-input-number v-on:keyup.13="handle(data, tr)" v-model="tr.precio"/>
                  <vs-button
                    type="flat"
                    @click="handle(data, tr)"
                    size="medium"
                    icon="update"
                  ></vs-button>
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
      getVentas: "ventas/getVentas",
      getArticulos: "articulos/getArticulos",
      getClientes: "clientes/getClientes",
      postVentas: "ventas/postVentas",
      editVenta: "ventas/editVenta",
      deleteVenta: "ventas/deleteVenta"
    }),
      async ventas() {
        await this.getVentas(this.token);
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
      this.$validator.reset();
      this.errors.clear();
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
    deleteArticulo(articulo) {
      const index = this.articulosArray.findIndex(x => x._id === articulo._id);
      this.articulosArray.splice(index, 1);

      if (!this.articulosArray.length > 0) {
        this.articuloVal = '';
      }
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
    },
    articulosModel() {
        const articulo =  this.articulos.find(x => x._id === this.articuloVal);
        if (articulo) {
          articulo.cantidad = 1;
          articulo.precio = 1;
          articulo.subtotal = articulo.cantidad * articulo.precio;

          const exist = this.articulosArray.some(x => x._id === articulo._id || x.idArticulo === articulo._id);
          if (exist) {
            this.$vs.dialog({
              icon: "error",
              color: "danger",
              title: `Articulo ya agregado`,
              text: `El artículo ${articulo.nombre} ya ha sido agregado`
            });
          } else {
            this.articulosArray.push(articulo);
          }
        }
    },
    async update() {
      if (!await this.$validator.validate()) {
        return;
      } else {
        this.ventasModel.token = this.token;
        this.ventasModel._id = this.id;
        const cliente = this.clientes.find(x => x.name === this.ventasModel.clienteId);
        if (cliente) {
          this.ventasModel.clienteId = cliente._id;
        }else {
          const clienteName = this.clientes.find(x => x._id === this.ventasModel.clienteId);
            this.ventasModel.clienteId = clienteName._id;
        }

        let contador = 0;
        this.articulosArray.forEach(x => {
          contador += x.subtotal;
        });
        this.ventasModel.total = contador;
        this.articuloVal = '';
        this.cleanErrors();
        this.ventasModel.detalles = this.articulosArray;
        this.ventasModel.year = new Date(this.ventasModel.fecha).getFullYear()
        await this.editVenta(this.ventasModel);
        await this.getVentas(this.token);
        this.prompt = false;

        if (this.$store.state.ventas.error) {
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
            title: "Venta Actulizada!"
          });
        }
      }
    },
    async post() {
      if (!await this.$validator.validate()) {
        return;
      } else {
        this.ventasModel.token = this.token;
        let contador = 0;
        this.articulosArray.forEach(x => {
          x.precio = parseInt(x.precio);
          x.cantidad = parseInt(x.cantidad);
          x.descuento = parseInt(x.descuento);
          contador += x.subtotal;
        });

        this.ventasModel.impuesto = parseInt(this.ventasModel.impuesto);
        this.ventasModel.detalles = this.articulosArray;
        this.ventasModel.total = contador;
        this.ventasModel.year = new Date(this.ventasModel.fecha).getFullYear() || new Date().getFullYear()
        this.cleanErrors();
        await this.postVentas(this.ventasModel);
        await this.getVentas(this.token);
        this.prompt = false;

        if (this.$store.state.ingresos.error) {
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
            title: "Ingreso Agregado!"
          });
        }
      }
    },
    eliminar(el) {
      const venta = this.ventasArray.find(x => x.total === el.total && x.num_comprobante === el.num_comprobante && x.serie_comprobante === el.serie_comprobante);
      venta.token = this.token;
      this.art = venta;
      this.cleanErrors();

      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: `¿Está seguro que desea eliminar La venta con el número de comprobante ${venta.num_comprobante}?`,
        accept: this.acceptAlert
      });
    },
    async acceptAlert() {
      await this.deleteVenta(this.art);
      await this.getVentas(this.token);

      document.querySelector(".content-tr-expand").style.display = "none";
      document
        .querySelector(".content-tr-expand")
        .classList.remove(".content-tr-expand");

      if (this.$store.state.ventas.error) {
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
          text: `Venta eliminado`
        });
      }
    },
    async nuevo(bool) {
      this.prompt = true;
      this.$validator.reset();
      this.errors.clear();
      this.index = 1;
      this.ventasModel = {};
      this.articulosArray = [];
      this.articuloVal = '';
      this.ventasModel.tipo_comprobante = '',
      this.ventasModel.clienteId = ''
    },
    cleanErrors() {
      this.$store.state.ventas.error = false;
      this.$store.state.ventas.errorMessage = "";
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

#fecha {
  margin-left: 220%;
  margin-top: -16% ;
}

#numeroComprobante {
  margin-left: 220%;
  margin-top: -19% ;
}

.numeroComp {
  margin-left: 56%;
}

#impuesto {
  margin-left: 220%;
  margin-top: -16%;
}

#font {
  font-size: 15px;
}
</style>
