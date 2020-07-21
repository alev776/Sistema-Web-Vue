<template>
  <div class="wrapper">
    <div class="section text-center">
      <div class="container">
        <p>Total de Ventas: <strong>{{ totalVentas || 0 }}</strong></p>
        <p>Año: <strong>{{ yearSelect }}</strong></p>
        <vs-collapse>
          <vs-collapse-item>
            <div slot="header">
              <md-icon>filter_alt</md-icon>
              Filtros
            </div>
              <div class="container-fluid" id="div">
                <vs-select
                class="selectExample"
                label="Seleccione el año"
                v-model="yearSelect"
                @change="getVentasByYear"
                id="select1"
                >
                <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in getYears()" />
              </vs-select>
              </div>
              <div class="container-fluid" id="div2">
                <vs-select
                class="selectExample"
                label="Diseño"
                v-model="grafico"
                @change="loadProductosMasVendidos"
                id="select2"
                >
                <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in graficoArray" />
              </vs-select>
              </div>
          </vs-collapse-item>
        </vs-collapse>
        <canvas id="myChart" width="700" height="240"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: "index",
  data() {
    return {
      firstname: null,
      model: true,
      nombreMeses: [],
      totalMeses: [],
      totalVentas: '',
      yearSelect: new Date().getFullYear(),
      grafico: 'pie',
      graficoArray: ['pie', 'bar', 'line', 'radar', 'polarArea']
    };
  },
  beforeMount() {
    localStorage.setItem("user", this.$store.state.login.user.data.user.name);
    localStorage.setItem("img", this.$store.state.login.user.data.user.avatar);
    const user = this.$store.state.login.user;
    const text = `${user.data.user.name}`;
    if (user) {
      this.$vs.notify({
        title: "Bienvenido",
        text,
        color: "primary",
        position: "top-center"
      });
    }
  },
  mounted() {
    this.ventasByDate();
    this.getYears();
  },
  computed: {
    ventasArray() {
      return this.$store.state.ventas.ventas.ventas;
    },
    ventasByMonth() {
      return this.$store.state.ventas.ventasByMonth;
    },
    token() {
      return window.localStorage.getItem("token");
    },
  },
  methods: {
    getYears() {
      const currentYear = new Date().getFullYear();
      let array = [];
      for (let index = 0; index <= 5; index++) {
        const element = currentYear - index;
        array.push(element);
      }
      return array;
    },
    async ventasByDate() {
      let body = {}
      body.token = this.token;
      body.year = this.yearSelect;
      await this.$store.dispatch('ventas/getVentasByMonth', body);
      this.loadProductosMasVendidos();
    },
    async getVentasByYear() {
      let body = {};
      body.token = this.token;
      body.year = this.yearSelect;
      await this.$store.dispatch('ventas/getVentasByMonth', body);
      this.loadProductosMasVendidos();
    },
    loadProductosMasVendidos() {
      this.nombreMeses = [];
      this.totalMeses = [];
      let mes = ''
      let total = null
      this.ventasByMonth.map(x => {
        switch (parseInt(x._id)) {
          case 1:
            mes = 'Enero'
            break;
          case 2:
            mes = 'Febrero'
            break;
          case 3:
            mes = 'Marzo'
            break;
          case 4:
            mes = 'Abril'
            break;
          case 5:
            mes = 'Mayo'
            break;
          case 6:
            mes = 'Junio'
            break;
          case 7:
            mes = 'Julio'
            break;
          case 8:
            mes = 'Agosto'
            break;
          case 9:
            mes = 'Septiembre'
            break;
          case 10:
            mes = 'Octubre'
            break;
          case 11:
            mes = 'noviembre'
            break;
          case 12:
            mes = 'Diciembre'
            break;

          default:
            break;
        }
        this.nombreMeses.push(mes);
        this.totalMeses.push(x.total);
        total += parseInt(x.total);
      });
      this.totalVentas = total;

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: this.grafico,
          data: {
              labels: this.nombreMeses,
              datasets: [{
                  label: 'Ventas en los últimos 12 meses',
                  data: this.totalMeses,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(39, 205, 0, 0.2)',
                      'rgba(147, 102, 0, 0.2)',
                      'rgba(79, 164, 70, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(133, 133, 234, 0.2)',
                      'rgba(239, 235, 159, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(214, 194, 194, 0.2)',
                      'rgba(224, 182, 236, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(39, 205, 0, 1)',
                      'rgba(147, 102, 0, 1)',
                      'rgba(79, 164, 70, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(133, 133, 234, 1)',
                      'rgba(239, 235, 159, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(214, 194, 194, 1)',
                      'rgba(224, 182, 236, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
    }
  },
};
</script>

<style lang="css">
 #div {
   margin-left: 31%;
 }

 #div2 {
   margin-left: 51%;
   margin-top: -5.2%;
 }
</style>