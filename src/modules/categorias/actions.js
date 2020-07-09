import Vue from "vue";
import router from "../../router";

export async function getCategorias({ commit }, token) {
  try {
    const data = await Vue.axios({
      method: "GET",
      url: "/categorias",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    commit("setCategorias", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function postCategoria({ commit }, body) {
  try {
    const data = await Vue.axios({
      method: "POST",
      url: "/categorias",
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function editCategorias({ commit }, categoria) {
  try {
    const data = await Vue.axios({
      method: "PATCH",
      url: `/categoria/${categoria._id}`,
      headers: {
        Authorization: `Bearer ${categoria.token}`
      },
      data: {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function deleteCategorias({ commit }, categoria) {
  try {
    const data = await Vue.axios({
      method: "DELETE",
      url: `/categoria/${categoria._id}`,
      headers: {
        Authorization: `Bearer ${categoria.token}`
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}
