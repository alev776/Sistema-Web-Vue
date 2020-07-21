<template>
  <div>
    <data-table
      @data="model"
      :array="newArray()"
      :header="header"
      title="Ingresos"
      @btn="nuevo"
      @eliminar="eliminar"
      :search="true"
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
              v-model="ingresosModel.tipo_comprobante"
              v-validate="'required'"
              name="Comprabante"
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
            <span style="color: red" id="font">{{ errors.first('Comprabante') }}</span>
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
              <md-input v-model="ingresosModel.fecha"></md-input>
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
            vs-lg="4"
            vs-sm="6"
            vs-xs="5"
          >
            <md-field class="has-green">
              <md-icon>drag_indicator</md-icon>
              <label>Série Comprobante</label>
              <md-input
                v-model="ingresosModel.serie_comprobante"
                v-validate="'required'"
                name="Serie"
                type="number"
              >
              </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Serie') }}</span>
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
                v-model="ingresosModel.num_comprobante"
                v-validate="'required'"
                name="Número"
                type="number"
              >
              </md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid" id="numeroc">
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
              label="Proveedor"
              v-model="ingresosModel.proveedor"
              v-validate="'required'"
              name="Proveedor"
            >
              <vs-select-item
                :key="index"
                :value="item._id"
                :text="item.name"
                v-for="(item, index) in proveedor"
              />
            </vs-select>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Proveedor') }}</span>
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
                <md-input v-model="ingresosModel.impuesto" type="number"></md-input>
            </md-field>
          </vs-col>
          <div class="container-fluid">
            <span style="color: red" id="font">{{ errors.first('Impuesto') }}</span>
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
                <strong>Total Impuesto({{ ingresosModel.impuesto }}%): {{ totalImpuestos }}</strong>
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
        proveedor: "",
        tipo_comprobante: "",
      },
      art: {},
      articuloVal: '',
      articulosArray: [],
      tipo_documentos: ["FACTURA", "BOLETA", "TICKET"],
      index: null,
      id: '',
      prompt: false,
      neto: 0,
      disabled: false
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
      editIngreso: "ingresos/editIngreso",
      deleteIngreso: "ingresos/deleteIngreso"
    }),
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
      Object.assign(this.ingresosModel, data);
      const proveedorId = this.proveedor.find(x => x.name === data.proveedor);
      this.ingresosModel.proveedor = proveedorId._id;

      const ingresoId = this.ingresosArray.find(x => x.total === data.total && x.num_comprobante === data.num_comprobante && x.serie_comprobante === data.serie_comprobante);
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
    async ingresos() {
      await this.getIngresos(this.token);
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
      if (!await this.$validator.validateAll()) {
        return;
      } else {
        this.ingresosModel.token = this.token;
        this.ingresosModel._id = this.id
        const proveedor = this.proveedor.find(x => x._id === this.ingresosModel.proveedor);
        if (proveedor) {
          this.ingresosModel.proveedor = proveedor._id;
        }else {
          const proveedorName = this.proveedor.find(x => x.name === this.ingresosModel.proveedor);
            this.ingresosModel.proveedor = proveedorName._id;
        }

        let contador = 0;
        this.articulosArray.forEach(x => {
          contador += x.subtotal;
        });
        this.ingresosModel.total = contador;
        this.articuloVal = '';
        this.cleanErrors();
        this.ingresosModel.detalles = this.articulosArray;
        await this.editIngreso(this.ingresosModel);
        await this.getIngresos(this.token);
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
            icon: "update",
            color: "primary",
            title: "Ingreso Actulizado!"
          });
        }
      }
    },
    async post() {
      if (!await this.$validator.validate()) {
        return;
      } else {
      this.ingresosModel.token = this.token;
      let contador = 0;
      this.articulosArray.forEach(x => {
        x.precio = parseInt(x.precio);
        x.cantidad = parseInt(x.cantidad);
        contador += x.subtotal;
      });

      this.ingresosModel.impuesto = parseInt(this.ingresosModel.impuesto);
      this.ingresosModel.detalles = this.articulosArray;
      this.ingresosModel.total = contador;
      this.cleanErrors();
      await this.postIngresos(this.ingresosModel);
      await this.getIngresos(this.token);
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
      const ingresoId = this.ingresosArray.find(x => x.total === el.total && x.num_comprobante === el.num_comprobante && x.serie_comprobante === el.serie_comprobante);
      ingresoId.token = this.token;
      this.art = ingresoId;
      this.cleanErrors();

      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: `¿Está seguro que desea eliminar el ingreso con el número de comprobante ${ingresoId.num_comprobante}?`,
        accept: this.acceptAlert
      });
    },
    async acceptAlert() {
      await this.deleteIngreso(this.art);
      await this.getIngresos(this.token);

      document.querySelector(".content-tr-expand").style.display = "none";
      document
        .querySelector(".content-tr-expand")
        .classList.remove(".content-tr-expand");

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
          icon: "delete",
          color: "danger",
          title: "Eliminación Exitosa!",
          text: `Ingreso eliminado`
        });
      }
    },
    nuevo(bool) {
      this.prompt = true;
      this.index = 1;
      this.$validator.reset();
      this.errors.clear();
      this.ingresosModel = {};
      this.articulosArray = [];
      this.articuloVal = '';
      this.ingresosModel.tipo_comprobante = '',
      this.ingresosModel.proveedor = ''
    },
    cleanErrors() {
      this.$store.state.ingresos.error = false;
      this.$store.state.ingresos.errorMessage = "";
    }
  },
  components: {
    DataTable
  }
};
</script>

<style lang="css" scoped>
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

#numeroc {
  margin-right: 25px;
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
