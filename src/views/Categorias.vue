<template>
    <div>
        <data-table
        >

        </data-table>
    </div>
</template>

<script>
import DataTable from '../components/Data-Table'
import { mapActions } from 'vuex';

export default {
    data() {
        return {

        }
    },
    mounted() {
        this.categoria();
    },
    computed: {
        token() {
            return this.$store.state.login.user.data.token;
        },
        categorias() {
            return this.$store.categorias.categorias.data;
        }
    },
    methods: {
        ...mapActions({
            getCategorias: 'categorias/getCategorias'
        }),
        categoria() {
            this.getCategorias(this.token);
        }
    },
    components: {
        DataTable
    },
}
</script>