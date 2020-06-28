<template>
    <div>
        <data-table
            @data="model"
            :array="newArray()"
            :header="header"
            title="Categorias"
            :button="button"
            @btn="nuevo"
        >
        </data-table>
        <vs-prompt
            @cancel="val=''"
            @accept="post"
            @close="prompt = false"
            :active.sync="prompt"
            title="Add"
        >
        <div class="con-exemple-prompt">
            <md-field class="has-green">
                <md-icon>email</md-icon>
                <label>Categoría</label>
                <md-input v-model="nuevaCategoria.nombre"></md-input>
            </md-field>
            <md-field class="has-green">
                <md-icon>email</md-icon>
                <label>Descripción</label>
                <md-input v-model="nuevaCategoria.descripcion"></md-input>
            </md-field>
        </div>
        </vs-prompt>
        <vs-prompt
            @cancel="val=''"
            @accept="edit"
            @close="prompt = false"
            :active.sync="prompt2"
            color="danger"
            title="Edit"
        >
        <div class="con-exemple-prompt">
            <md-field class="has-green">
                <md-icon>email</md-icon>
                <label>Categoría</label>
                <md-input v-model="editCategoria.nombre"></md-input>
            </md-field>
            <md-field class="has-green">
                <md-icon>email</md-icon>
                <label>Descripción</label>
                <md-input v-model="editCategoria.descripcion"></md-input>
            </md-field>
        </div>
        </vs-prompt>
    </div>
</template>

<script>
import DataTable from '../components/Data-Table'
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            header: [
            {text: 'Categoria', value: 'categoria'},
            {text: 'Descripcion', value: 'descripcion'},
            {text: 'Estado', value: 'estado'}
          ],
          editCategoria: {
              nombre: '',
              descripcion: ''
          },
          nuevaCategoria: {
              nombre: '',
              descripcion: ''
          },
          id: {},
          button: true,
          prompt: false,
          prompt2: false,
        }
    },
    mounted() {
        this.categoria();
        this.newArray();
    },
    computed: {
        token() {
            return this.$store.state.login.user.data.token;
        },
        categorias() {
            return this.$store.state.categorias.categorias.data;
        }
    },
    methods: {
        ...mapActions({
            getCategorias: 'categorias/getCategorias',
            editCategorias: 'categorias/editCategorias',
            postCategoria: 'categorias/postCategoria'
        }),
        model(data) {
            Object.assign(this.editCategoria, data);
            this.prompt2 = true;

            const id = this.categorias.find(x => x.nombre === data.nombre && x.descripcion === data.descripcion);
            this.id = id;
        },
        async categoria() {
            await this.getCategorias(this.token);
        },
        newArray() {
            const allowedHeaders = ['nombre', 'descripcion', 'estado'];
            const arreglo = []
            this.categorias.forEach(x => {
                let prueba = {};
                allowedHeaders.forEach(y => {
                    prueba[y] = x[y]
                    // console.log(obj);
                })
                    arreglo.push(prueba)
            });
            return arreglo;
            console.log(arreglo);
        },
        async edit() {
            const body = {
                _id: this.id._id,
                nombre: this.editCategoria.nombre,
                descripcion: this.editCategoria.descripcion
            }
            console.log(body);
            this.editCategorias(body, this.token);
            this.getCategorias();
        },
        async post() {
            await this.postCategoria(this.nuevaCategoria, this.token);
            await this.getCategorias(this.token);
        },
        nuevo(bool) {
            this.prompt = bool;
        }
    },
    components: {
        DataTable
    },
}
</script>