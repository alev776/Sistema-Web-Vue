import Vue from "vue";

export async function getIngresos({ commit }, token) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: "/ingresos",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    commit("setIngresos", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function postIngresos({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "POST",
      url: "/ingresos",
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        proveedor: body.proveedor,
        tipo_comprobante: body.tipo_comprobante,
        num_comprobante: body.num_comprobante,
        serie_comprobante: body.serie_comprobante,
        fecha: body.fecha,
        impuesto: body.impuesto,
        total: body.total,
        detalles: body.detalles
      }
    });

    commit("setIngresos", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function editIngreso({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "PATCH",
      url: `/ingreso/${body._id}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        proveedor: body.proveedorId,
        tipo_comprobante: body.tipo_comprobante,
        num_comprobante: body.num_comprobante,
        serie_comprobante: body.serie_comprobante,
        fecha: body.fecha,
        impuesto: body.impuesto,
        total: body.total,
        detalles: body.detalles
      }
    });

    commit("setIngresos", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function deleteIngreso({ commit }, ingreso) {
  try {
    const { data } = await Vue.axios({
      method: "DELETE",
      url: `/ingreso/${ingreso._id}`,
      headers: {
        Authorization: `Bearer ${ingreso.token}`
      }
    });

    commit("setIngresos", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}
