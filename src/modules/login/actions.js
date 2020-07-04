import Vue from 'vue';
import router from '../../router'

export async function postUser ({commit}, user) {
    try {
        const response = await Vue.axios({
            method: 'POST',
            url: '/users',
            data: user
        });
        localStorage.setItem('token', response.data.token);

        commit('setUser', response);
        router.push({name: 'index'})
    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    } finally {

    }
}

export async function login ({commit}, credentials) {
    try {
        const response = await Vue.axios({
            method: 'POST',
            url: '/user/login',
            data: credentials
        });
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', response.data.user.data.user);

        commit('setUser', response);
        router.push({name: 'index'});
    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export async function getUser ({commit}, token) {
    try {
        const { data } = await Vue.axios({
            method: 'GET',
            url: '/user',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        commit('setUser', data);

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export async function updateUser ({commit}, user) {
    try {
        const { data } = await Vue.axios({
            method: 'PATCH',
            url: `/user/me`,
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                name: user.name,
                direccion: user.direccion,
                email: user.email,
                password: user.password,
                cuidad: user.cuidad,
                nombre_empresa: user.nombre_empresa
            }

        });
        commit('setUser', data);

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}


export async function signOut ({commit}, token) {
    try {
        await Vue.axios({
            method: 'POST',
            url: `/user/logout`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    } finally {
        localStorage.clear();
        setTimeout(() => {
            window.localStorage.clear()
        }, 100);
        commit('setUser', []);
    }
}