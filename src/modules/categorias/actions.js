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
        commit('setError', error);
        commit('setErrors', true);
    }
}