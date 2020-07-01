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
        window.localStorage.setItem('user', response.data.user);
        // localStorage.setItem('user', response.data.user.data.user);

        commit('setUser', response);
        router.push({name: 'index'});
    } catch (error) {
        commit('setError', true);
        commit('setErrors', error);
    }
}

export function signOut ({commit}) {
    localStorage.clear();
    setTimeout(() => {
        window.localStorage.clear()
    }, 100);
    commit('setUser', []);
}

// export function lock({commit}, boolean) {
//     commit('setLock', boolean);
// }

// export function signOut ({commit}) {
//     localStorage.clear();
//     setTimeout(() => {
//         window.localStorage.clear()
//     }, 100);
//     commit('setUser', []);
// }