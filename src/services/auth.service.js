import axiosInstance from './api.service'

class AuthService {
    login(loginData) {
        return axiosInstance()
            .post('Auth/login', loginData)
            .then((response) => {
                if (response.data.isAuthenticated) {
                    localStorage.setItem('user',JSON.stringify(response.data))
                }
                return response.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }
}
export default new AuthService()
