<template>
    <div>
        <data-table
            @data="model"
            :array="newArray()"
            :header="header"
            title="Articulos"
            :button="button"
            @btn="nuevo"
            @eliminar="eliminar"
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
            {text: 'Código', value: 'codigo'},
            {text: 'Nombre', value: 'nombre'},
            {text: 'Categoía', value: 'categoria'},
            {text: 'Stock', value: 'stock'},
            {text: 'Precio Venta', value: 'precio_venta'},
            {text: 'Descripción', value: 'descripcion'},
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
          cat: {},
          id: {},
          button: true,
          prompt: false,
          prompt2: false,
          activeConfirm: false
        }
    },
    mounted() {
        this.articles();
    },
    computed: {
        token() {
            return this.$store.state.login.user.data.token;
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
            getArticulos: 'articulos/getArticulos',
            getCategorias: 'categorias/getCategorias',
        }),
        model(data) {
            // Object.assign(this.editCategoria, data);
            // this.prompt2 = true;

            // const id = this.categorias.find(x => x.nombre === data.nombre && x.descripcion === data.descripcion);
            // this.id = id;
        },
        async articles() {
            await this.getArticulos(this.token);
            this.getCategorias(this.token);
            console.log(this.articulos);
        },
        newArray() {
            const allowedHeaders = ['codigo', 'nombre', 'categoria', 'stock', 'precio_venta', 'descripcion', 'activo'];
            const arreglo = []
            this.articulos.forEach(x => {
                let prueba = {};
                allowedHeaders.forEach(y => {
                    prueba[y] = x[y]
                })
                    arreglo.push(prueba)
            });

            arreglo.forEach(x => {
                this.categorias.forEach(y =>
                {

                });
            });
            return arreglo;
        },
        async edit() {
            // const body = {
            //     _id: this.id._id,
            //     nombre: this.editCategoria.nombre,
            //     descripcion: this.editCategoria.descripcion,
            //     token: this.token
            // }
            // await this.editCategorias(body);
            // await this.getCategorias(this.token);
        },
        async post() {
            // this.nuevaCategoria.token = this.token;
            // await this.postCategoria(this.nuevaCategoria);
            // await this.getCategorias(this.token);
        },
        async eliminar(el) {
        //     const id = this.categorias.find(x => x.nombre === el.nombre && x.descripcion === el.descripcion);
        //     const categoria = {};
        //     categoria._id = id._id;
        //     categoria.token = this.token;
        //     this.cat = categoria;
        //     this.cat.id = id;

        //     this.$vs.dialog({
        //         type:'confirm',
        //         color: 'danger',
        //         title: `Confirm`,
        //         text: `¿Está seguro que desea eliminar la categoría ${id.nombre}?`,
        //         accept: this.acceptAlert
        //     });

        },
        // async acceptAlert(){
        //     await this.deleteCategorias(this.cat);
        //     await this.getCategorias(this.token);

        //     document.querySelector('.content-tr-expand').style.display = 'none';
        //     document.querySelector('.content-tr-expand').classList.remove('.content-tr-expand')

        //     this.$vs.notify({
        //     color:'primary',
        //     title:'Categoria eliminada',
        //     text: `Categoria: ${this.cat.id.nombre}, ha sido eliminada`
        //     });
        // },
        nuevo(bool) {
            this.prompt = bool;
            this.nuevaCategoria = {}
        }
    },
    components: {
        DataTable
    },
}
</script>