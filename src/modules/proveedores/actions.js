import Vue from "vue";

export async function getProveedor({ commit }, token) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: "/proveedores",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    commit("setProveedor", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function postProveedor({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "POST",
      url: "/proveedores",
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        name: body.name,
        tipo_documento: body.tipo_documento,
        num_documento: body.num_documento,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function editProveedor({ commit }, body) {
  try {
    const data = await Vue.axios({
      method: "PATCH",
      url: `/proveedor/${body._id}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        name: body.name,
        tipo_documento: body.tipo_documento,
        num_documento: body.num_documento,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function deleteProveedor({ commit }, proveedor) {
  try {
    const data = await Vue.axios({
      method: "DELETE",
      url: `/proveedor/${proveedor._id}`,
      headers: {
        Authorization: `Bearer ${proveedor.token}`
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}
