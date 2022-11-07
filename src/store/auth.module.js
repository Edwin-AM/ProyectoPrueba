import AuthService from '../services/auth.service'
import { decryptToken } from '../auth/jwt/jwtHandler'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? { status: { loggedIn: true }, user, role: [] }
    : { status: { loggedIn: false }, user: null, role: [] }

if (user) {
    const roles = decryptToken(user.token).role
    initialState.role = Array.isArray(roles) ? roles : [roles]
}

export const auth = {
    namespaced: true,
    state: initialState,
    accessToken: '',
    refreshToken: '',
    actions: {
        async login({ commit }, user) {
            return AuthService.login(user).then(
                (user) => {
                    commit('loginSuccess', user)
                    return Promise.resolve(user)
                },
                (error) => {
                    commit('loginFailure')
                    return Promise.reject(error)
                }
            )
        },
        logout({ commit }) {
            AuthService.logout()
            commit('logout')
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true
            state.user = user
            const { role } = decryptToken(user.token)
            state.role = Array.isArray(role) ? role : [role]
        },
        loginFailure(state) {
            state.status.loggedIn = false
            state.user = null
        },
        logout(state) {
            state.status.loggedIn = false
            state.user = null
            state.role = []
        },
        setToken(state, token) {
            state.user.token = token
        },
        setRefreshToken(state, refreshToken) {
            state.user.refreshToken = refreshToken
        },
    },
}
