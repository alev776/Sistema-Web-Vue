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
        <vs-popup class="holamundo"  title="Ingresos" :active.sync="prompt">
        <vs-row vs-w="12">
                <vs-col vs-type="flex" vs-offset="0.5" vs-w="5" vs-lg="12" vs-sm="6" vs-xs="5">
                    <vs-select
                        placeholder="Select"
                        class="selectExample"
                        label="Tipo Comprobante"
                        v-model="ingresosModel.tipo_comprobante"
                        >
                        <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in tipo_documentos" />
                    </vs-select>
                </vs-col>

                <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="6" vs-xs="5">
                    <md-field class="has-green">
                        <md-icon>phone</md-icon>
                        <label>Série Comprobante</label>
                        <md-input v-model="ingresosModel.serie_comprobante"></md-input>
                    </md-field>
                </vs-col>

                <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="6" vs-xs="5">
                    <md-field class="has-green">
                        <md-icon>place</md-icon>
                        <label>Número Comprobante</label>
                        <md-input v-model="ingresosModel.num_comprobante"></md-input>
                    </md-field>
                </vs-col>

                <vs-col vs-type="flex" vs-offset="0.5" vs-w="6" vs-lg="5" vs-sm="5" vs-xs="5">
                    <vs-select
                        placeholder="Select"
                        class="selectExample"
                        label="Proveedor"
                        v-model="ingresosModel.proveedor"
                        >
                        <vs-select-item :key="index" :value="item._id" :text="item.name" v-for="(item,index) in proveedor" />
                    </vs-select>
                </vs-col>

                <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="5" vs-sm="5" vs-xs="5">
                    <md-field class="has-green">
                        <label>Impuesto</label>
                        <md-input v-model="ingresosModel.impuesto"></md-input>
                    </md-field>
                </vs-col>

                <vs-col vs-type="flex" vs-justify="center" vs-offset="0.5" vs-w="5" vs-lg="11" vs-sm="5" vs-xs="5">
                    <v-autocomplete
                        v-model="model"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        chips
                        clearable
                        hide-details
                        hide-selected
                        item-text="name"
                        item-value="symbol"
                        label="Search for a coin..."
                        solo
                        >
                        <template v-slot:no-data>
                            <v-list-item>
                            <v-list-item-title>
                                Search for your favorite
                                <strong>Cryptocurrency</strong>
                            </v-list-item-title>
                            </v-list-item>
                        </template>
                        </v-autocomplete>
                </vs-col>

            </vs-row>
            <div class="btn">
                <vs-button color="primary" type="flat" @click="post" size="large" v-if="index === 1" icon="save">Add</vs-button>
                <vs-button color="primary" type="flat" @click="update" size="large" v-else icon="update">Update</vs-button>
                <vs-button color="danger" type="flat" size="large" @click="prompt = false" icon="cancel">Cancel</vs-button>
            </div>
            <div class="section">
            <vs-table stripe :data="users">
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

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td>
                        <vs-button type="flat" @click="update" size="small" icon="delete"></vs-button>
                    </vs-td>

                    <vs-td :data="tr.email">
                        {{tr.email}}
                    </vs-td>

                    <vs-td :data="tr.username">
                        {{tr.username}}

                        <template slot="edit">
                        <vs-input-number v-model="tr.id"/>
                        </template>
                    </vs-td>

                    <vs-td :data="tr.id">
                        {{tr.id}}

                        <template slot="edit">
                        <vs-input-number v-model="tr.id"/>
                        </template>
                    </vs-td>

                    <vs-td :data="tr.id">
                        {{tr.id}}
                    </vs-td>

                    </vs-tr>
                </template>
            </vs-table>
            </div>
            <!-- <vs-table :data="users">
            <template slot="thead">
                <vs-th>
                Email
                </vs-th>
                <vs-th>
                Name
                </vs-th>
                <vs-th>
                Nro1
                </vs-th>
                <vs-th>
                Nro2
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                <vs-td :data="tr.email">
                    {{tr.email}}

                    <template slot="edit">
                    <vs-input v-model="tr.email" class="inputx" placeholder="Email"/>
                    </template>
                </vs-td>

                <vs-td :data="tr.username">
                    {{tr.username}}

                    <template slot="edit">
                    <vs-select
                        label="Users"
                        v-model="tr.username"
                        >
                        <vs-select-item :key="index" :vs-value="item.name" :vs-text="item.name" v-for="(item,index) in users" />
                    </vs-select>
                    </template>
                </vs-td>

                <vs-td :data="tr.id">
                    {{tr.id}}

                    <template slot="edit">
                    <vs-input-number v-model="tr.id"/>
                    </template>
                </vs-td>

                <vs-td :data="tr.id">
                    {{tr.id}}

                    <template slot="edit">
                    <vs-slider :max="20" v-model="tr.id"/>
                    </template>
                </vs-td>

                </vs-tr>
            </template>
            </vs-table> -->
        </vs-popup>
    </div>
</template>

<script>
import DataTable from '../components/Data-Table'
import { mapActions } from 'vuex';

export default {
    name: 'articulos',
    data() {
        return {
            header: [
            {text: 'Proveedor', value: 'proveedor'},
            {text: 'Tipo Comprobante', value: 'tipo_comprobante'},
            {text: 'Serie Comprobante', value: 'serie_comprobante'},
            {text: 'Número Comprobante', value: 'numero_comprobante'},
            {text: 'Fecha', value: 'fecha'},
            {text: 'Impuesto', value: 'impuesto'},
            {text: 'Total', value: 'total'},
            {text: 'Estado', value: 'estado'},
          ],
          ingresosModel: {
              proveedor: '',
              tipo_comprobante: '',
              serie_comprobante: null,
              num_comprobante: '',
              impuesto: null,
              total: '',
              _id: '',
              estado: '',
              fecha: '',
              codigo: '',
              token: '',
              detalles: {
                  idArticulo: '',
                  precio: '',
                  cantidad: '',
                  _id: ''
              }
          },
          art: {},
          tipo_documentos: ['Cédula', 'Pasaporte', 'RNC'],
          index: null,
          arrayHeader: [],
          id: {},
          prompt: false,
          isLoading: false,
          items: [],
          modelo: null,
          search: null,
          tab: null,
          users:[
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "website": "hildegard.org",
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "website": "anastasia.net",
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "website": "ramiro.info",
      }
    ]
        }
    },
    beforeMount() {
        this.ingresos();
    },
    watch: {
      modelo (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
    computed: {
        token() {
            return window.localStorage.getItem('token');
        },
        ingresosArray() {
            return this.$store.state.ingresos.ingresos.ingresos;
        },
        ingresosDetalles() {
            return this.$store.state.ingresos.ingresos.detalles;
        },
        proveedor() {
            return this.$store.state.proveedores.proveedor;
        }
    },
    methods: {
        ...mapActions({
            getIngresos: 'ingresos/getIngresos',
            getProveedor: 'proveedores/getProveedor',
            postProveedor: 'proveedores/postProveedor',
            editProveedor: 'proveedores/editProveedor',
            deleteProveedor: 'proveedores/deleteProveedor'
        }),
        model(data) {
            Object.assign(this.ingresosModel, data);
            const id = this.proveedor.find(x => x.email === data.email);
            this.ingresosModel._id = id._id;

            this.prompt = true;
            this.index = -1;
        },
        async ingresos() {
            await this.getIngresos(this.token);
            await this.getProveedor(this.token);

            const date = new Date();
            console.log(typeof this.ingresosArray);
        },
        newArray() {
            const headers = ['proveedor', 'tipo_comprobante', 'num_comprobante', 'serie_comprobante', 'fecha', 'impuesto', 'total', 'estado'];
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
            const arreglo = []
            this.ingresosArray.forEach(x => {
                let prueba = {};
                headers.forEach(y => {
                    prueba[y] = x[y]
                })
                    arreglo.push(prueba)
            });
            return arreglo;
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
                    position: 'top-center',
                    icon: 'error',
                    color:'danger',
                    title:'Algo ha salido mal!',
                    text: 'Por favor inténtelo de nuevo más tarde'
                });
            } else {
                this.$vs.notify({
                    time: 4000,
                    position: 'top-center',
                    icon: 'update',
                    color:'primary',
                    title:'Proveedor Actulizado!'
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
                    position: 'top-center',
                    icon: 'error',
                    color:'danger',
                    title:'Algo ha salido mal!',
                    text: 'Por favor inténtelo de nuevo más tarde'
                });
            } else {
                this.$vs.notify({
                    time: 4000,
                    position: 'top-center',
                    icon: 'check_box',
                    color:'success',
                    title:'Proveedor Agregado!'
                });
            }

        },
        eliminar(el) {
            const id = this.proveedor.find(x => x.email === el.email);
            this.art = id;
            this.art.token = this.token;
            this.cleanErrors();

            this.$vs.dialog({
                type:'confirm',
                color: 'danger',
                title: `Confirm`,
                text: `¿Está seguro que desea eliminar el proveedor ${id.name}?`,
                accept: this.acceptAlert
            });

        },
        async acceptAlert(){
            await this.deleteProveedor(this.art);
            await this.getProveedor(this.token);

            document.querySelector('.content-tr-expand').style.display = 'none';
            document.querySelector('.content-tr-expand').classList.remove('.content-tr-expand');

            if (this.$store.state.proveedores.error) {
                this.$vs.notify({
                    time: 4000,
                    position: 'top-center',
                    icon: 'error',
                    color:'danger',
                    title:'Algo ha salido mal!',
                    text: 'Por favor inténtelo de nuevo más tarde'
                });
            } else {
                this.$vs.notify({
                    time: 4000,
                    position: 'top-center',
                    icon: 'delete',
                    color:'danger',
                    title:'Eliminación Exitosa!',
                    text: `Proveedor: ${this.art.name}, ha sido eliminado`
                });
            }

        },
        nuevo(bool) {
            this.prompt = true;
            this.index = 1
            this.ingresosModel = {}
        },
        cleanErrors()  {
            this.$store.state.proveedores.error = false;
            this.$store.state.proveedores.errorMessage = '';
        }
    },
    components: {
        DataTable
    },
}
</script>

<style lang="css">
#prompt {
    margin-left: 10%;
}

.btn {
    margin-left: 38%;
}
</style>