import Vue from 'vue';

export async function getArticulos({commit}, token) {
    try {
        const { data } = await Vue.axios({
            method: 'GET',
            url: '/articulos',
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });

        commit('setArticulos', data);

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export async function postAritculos({commit}, body) {
    try {
        const { data } = await Vue.axios({
            method: 'POST',
            url: '/articulos',
            headers: {
                'Authorization': `Bearer ${body.token}`
              },
            data: {
                nombre: body.nombre,
                descripcion: body.descripcion
            },
        });

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export async function editArictulos({commit}, articulos) {
    try {
        const data = await Vue.axios({
            method: 'PATCH',
            url: `/articulos/${articulos._id}`,
            headers: {
                'Authorization': `Bearer ${articulos.token}`
            },
            data: {
                nombre: articulos.nombre,
                descripcion: articulos.descripcion
            },
        });

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export async function deleteArictulos({commit}, articulos) {
    try {
        const data = await Vue.axios({
            method: 'DELETE',
            url: `/articulos/${articulos._id}`,
            headers: {
                'Authorization': `Bearer ${articulos.token}`
            }
        });

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}