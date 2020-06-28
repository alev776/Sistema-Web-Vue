import Vue from 'vue';
import router from '../../router'

export async function getCategorias({commit}, token) {
    try {
        const data = await Vue.axios({
            method: 'GET',
            url: '/categorias',
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });

        commit('setCategorias', data);

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export async function postCategoria({commit}, body, token) {
    try {
        const data = await Vue.axios({
            method: 'POST',
            url: '/categorias',
            headers: {
                'Authorization': `Bearer ${token}`
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

export async function editCategorias({commit, dispatch}, categoria, token) {
    try {
        const data = await Vue.axios({
            method: 'PATCH',
            url: `/categoria/${categoria._id}`,
            headers: {
                'Authorization': `Bearer ${token}`
              },
            data: {
                nombre: categoria.nombre,
                descripcion: categoria.descripcion
            },
        });

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}