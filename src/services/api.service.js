import axios from 'axios'
import store from '../store'
import router from '../router/index'

const API_URL = process.env.VUE_APP_API_URL;

export default () => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    axiosInstance.interceptors.request.use((config) => {
        if (config.url === 'Auth/login') {
            return config
        }
        config.headers.common[
            'Authorization'
        ] = `Bearer ${store.state.auth.user.token}`
        return config
    })

    axiosInstance.interceptors.response.use(

        (response) => {
          return response;
        },
        async (error) => {
            if (error.config.url === '/auth/refresh') {
            store.dispatch('auth/logout').then(()=> {
                router.push('/')
            });
          }
          if (error.response.status === 401) {
            let response = await axiosInstance.post(`/auth/refresh`,null, 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.state.auth.user.refreshToken}`
                }
          });
            let { data: { refreshToken, token } } = response;
      
            if (!refreshToken || !token) return Promise.reject(error);
      
            //save new refresh and token
            store.commit("auth/setRefreshToken", refreshToken);
            store.commit("auth/setToken", token);
            error.config.headers["Authorization"] = `Bearer ${token}`;
            return axios(error.config);
          } else {
            return Promise.reject(error);
          }
        }
      );
    return axiosInstance;
}
