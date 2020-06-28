<template>
<div class="section">
  <div class="main main-raised" id="section">
    <div class="">
      <div class="md-layout">
        <div
          class="md-layout-item md-size-90 md-xsmall-size-100 mx-auto"
        >
          <div class="section section-contacts">
            <vs-table
              v-model="selected"
              @dblSelection="doubleSelection"
              :data="array"
              :max-items="maxItem"
              pagination
              search
              noDataText="Nothing to display"
            >
              <template slot="header" color="primary">
                <h3>
                  {{ title }}
                </h3>
                <vs-button color="primary" @click="btn" v-if="button" id="btn" type="flat" icon="add">Add</vs-button>
              </template>
              <template slot="thead">
                <vs-th v-for="(title, id) in header" :key="id">
                  {{ title.text }}
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                  <vs-td v-for="(td, index) in tr" :key="index">
                    {{td}}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
    props: {
        array: {
            type: Array,
            default: () => {
                return []
            }
        },
        header: {
          type: Array,
          required: true,
          default: () => {
            return [];
          }
        },
        maxItem: {
          type: Number,
          default: 5
        },
        title: {
          type: String,
          required: true,
          default: ''
        },
        button: {
          type: Boolean,
          default: false
        }
    },
  data() {
      return {
          selected:[],
          // header: [
          //   {text: 'Categoria', value: 'nombre'},
          //   {text: 'Descripcion', value: 'descripcion'},
          //   {text: 'Estado', value: 'estado'}
          // ],
          // array: [
          //   {categoria: 'Leche', descripcion: 'Leche carnetion', estado: 'Activo', cantidad: 5},
          //   {categoria: 'Carne', descripcion: 'to lo tipo de carne mamin', estado: 'Activo', cantidad: 74},
          //   {categoria: 'Arroz', descripcion: 'tenemo saquete de arroz', estado: 'Activo', cantidad: 3},
          //   {categoria: 'Pan', descripcion: 'Los mejores panes del pais', estado: 'Inactivo', cantidad: 21},
          //   {categoria: 'Harina', descripcion: 'tenemo harina y no de la blanca', estado: 'Activo', cantidad: 15},
          //   {categoria: 'Lacteos', descripcion: 'Tenemos to manin', estado: 'Activo', cantidad: 45},
          //   {categoria: 'Confle', descripcion: 'Captain Crunsh el mejor', estado: 'Inactivo', cantidad: 5},
          //   {categoria: 'Embutidos', descripcion: 'Los mejores quesos el guda', estado: 'Activo', cantidad: 8},

          // ]
          new: false
      }
  },
  methods:{
    doubleSelection(tr) {
      this.$emit('data', tr);
    },
    btn() {
      this.new = true;
      this.$emit('btn', this.new)
    }
  }
}
</script>

<style lang="scss" scoped>
#section {
    margin-top: 4%;
    margin-right: 18%;
    margin-left: 18%;
    margin-bottom: -4%;
}

#btn {
  width: 12%;
  margin-left: 38%;
}
</style>