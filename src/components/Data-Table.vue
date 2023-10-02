<template>
  <div class="section">
    <div class="main main-raised" id="section">
      <div class="">
        <div class="md-layout">
          <div class="md-layout-item md-size-90 md-xsmall-size-100 mx-auto">
            <div class="section section-contacts">
              <vs-table
                v-model="selected"
                @dblSelection="doubleSelection"
                @selected="handleSelected"
                :data="array"
                :max-items="maxItem"
                pagination
                description
                :description-items="descriptionItems"
                description-title="Registries"
                description-connector="of"
                description-body="Pages"
                :search="search"
                noDataText="Nothing to display"
              >
                <template slot="header" color="primary">
                  <h3>
                    {{ title }}
                  </h3>
                  <div id="btn" v-if="date === false">
                    <vs-button
                      color="primary"
                      @click="btn"
                      type="flat"
                      icon="add"
                      >Add</vs-button>
                  </div>
                  <div v-if="date === false">
                    <vs-button
                      color="primary"
                      @click="printTodo"
                      v-if="printAll === true"
                      type="flat"
                      icon="print"
                      >Download</vs-button
                    >
                  </div>
                  <div class="md-layout" v-if="date">
                    <div class="md-layout-item md-size-60" id="date">
                      <md-datepicker v-model="startDate">
                        <label>Desde</label>
                      </md-datepicker>
                    </div>
                  </div>
                  <div class="md-layout" v-if="date">
                    <div class="md-layout-item md-size-60" id="date2">
                      <md-datepicker v-model="endDate">
                        <label>Hasta</label>
                      </md-datepicker>
                    </div>
                  </div>
                </template>
                <template slot="thead">
                  <vs-th v-for="(title, id) in header" :key="id">
                    {{ title.text }}
                  </vs-th>
                </template>

                <template slot-scope="{ data }">
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td v-for="(td, index) in tr" :key="index">
                      {{ td }}
                    </vs-td>
                    <template class="expand-user" slot="expand" v-if="date === false">
                      <div class="con-expand-users">
                        <div class="con-btns-user">
                          <div>
                            <vs-button
                              color="danger"
                              @click="eliminar"
                              type="flat"
                              icon="delete"
                              >Delete</vs-button
                            >
                            <vs-button
                              color="dark"
                              @click="print(info)"
                              v-if="printDoc === true"
                              type="flat"
                              icon="print"
                              >DownLoad</vs-button
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                    <template class="expand-user" slot="expand" v-if="date === true">
                      <div class="expand">
                      </div>
                    </template>
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
        return [];
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
      default: ""
    },
    button: {
      type: Boolean,
      default: false
    },
    printDoc: {
      type: Boolean,
      default: false
    },
    date: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    printAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: [],
      descriptionItems: [3, 5, 10],
      icon: "",
      info: {},
      new: false,
      startDate: '',
      endDate: '',
      body: {}
    };
  },
  computed: {
    token() {
      return window.localStorage.getItem("token");
    },
    ingresosArray() {
      return this.$store.state.ingresos.ingresos;
    },
  },
  watch: {
    endDate(newVal) {
      this.body.token = this.token;
      this.body.startDate = this.startDate;
      this.body.endDate = newVal;
      this.$emit('dateTime', this.body);
    }
  },
  methods: {
    doubleSelection(tr) {
      this.$emit("data", tr);
      this.icon = "";
    },
    handleSelected(tr) {
      this.info = tr;
      this.icon = "selected";
    },
    btn() {
      this.new = true;
      this.$emit("btn", this.new);
    },
    eliminar() {
      this.$emit("eliminar", this.info);
    },
    print(item) {
      this.$emit('itemToPrint', item)
    },
    printTodo() {
      this.$emit("printAll", true)
    }
  }
};
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
  margin-left: 42%;
}

.con-expand-users .con-btns-user {
  display: flex;
  padding: 10px;
  padding-bottom: 0px;
  align-items: center;
  justify-content: space-between;
}

#date {
  margin-left: 68%;
}
#date2 {
  margin-left: 38%;
}

.con-expand-users .con-btns-user .con-userx {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.con-expand-users .list-icon i {
  font-size: 0.9rem !important;
}
</style>
