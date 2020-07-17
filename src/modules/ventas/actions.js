import Vue from "vue";

export async function getVentas({ commit }, token) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: "/ventas",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    commit("setVentas", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function getVentasByDate({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: `/ventasByDate/${body.startDate}/${body.endDate}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      }
    });

    commit("setVentas", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function getVentasByMonth({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: `/ventaTotalPorMes/${body.year}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      }
    });

    commit("setVentasByMonth", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function postVentas({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "POST",
      url: "/ventas",
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        clienteId: body.clienteId,
        tipo_comprobante: body.tipo_comprobante,
        num_comprobante: body.num_comprobante,
        serie_comprobante: body.serie_comprobante,
        fecha: body.fecha,
        impuesto: body.impuesto,
        descuento: body.descuento,
        total: body.total,
        year: body.year,
        detalles: body.detalles
      }
    });

    commit("setVentas", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function editVenta({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "PATCH",
      url: `/venta/${body._id}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        clienteId: body.clienteId,
        tipo_comprobante: body.tipo_comprobante,
        num_comprobante: body.num_comprobante,
        serie_comprobante: body.serie_comprobante,
        fecha: body.fecha,
        impuesto: body.impuesto,
        descuento: body.descuento,
        total: body.total,
        year: body.year,
        detalles: body.detalles
      }
    });

    commit("setVentas", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function deleteVenta({ commit }, venta) {
  try {
    const { data } = await Vue.axios({
      method: "DELETE",
      url: `/venta/${venta._id}`,
      headers: {
        Authorization: `Bearer ${venta.token}`
      }
    });

    commit("setVentas", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}
