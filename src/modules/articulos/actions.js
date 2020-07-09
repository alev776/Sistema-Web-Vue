import Vue from "vue";

export async function getArticulos({ commit }, token) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: "/articulos",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    commit("setArticulos", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function postAritculo({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "POST",
      url: "/articulos",
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        precio_venta: body.precio_venta,
        descripcion: body.descripcion,
        categoria: body.categoria
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function editArticulo({ commit }, body) {
  try {
    const data = await Vue.axios({
      method: "PATCH",
      url: `/articulo/${body._id}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        precio_venta: body.precio_venta,
        descripcion: body.descripcion,
        categoria: body.categoria
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function deleteArticulo({ commit }, articulo) {
  try {
    const data = await Vue.axios({
      method: "DELETE",
      url: `/articulo/${articulo._id}`,
      headers: {
        Authorization: `Bearer ${articulo.token}`
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}
