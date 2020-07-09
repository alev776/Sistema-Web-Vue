import Vue from "vue";

export async function getClientes({ commit }, token) {
  try {
    const { data } = await Vue.axios({
      method: "GET",
      url: "/clientes",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    commit("setClientes", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function postClientes({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "POST",
      url: "/clientes",
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        name: body.name,
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email
      }
    });

    commit("setClientes", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function editCliente({ commit }, body) {
  try {
    const { data } = await Vue.axios({
      method: "PATCH",
      url: `/cliente/${body._id}`,
      headers: {
        Authorization: `Bearer ${body.token}`
      },
      data: {
        name: body.name,
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email
      }
    });

    commit("setClientes", data);
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}

export async function deleteCliente({ commit }, cliente) {
  try {
    await Vue.axios({
      method: "DELETE",
      url: `/cliente/${cliente._id}`,
      headers: {
        Authorization: `Bearer ${cliente.token}`
      }
    });
  } catch (error) {
    commit("setError", true);
    commit("setErrors", error);
  }
}
