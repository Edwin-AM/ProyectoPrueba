import axiosInstance from './api.service'

class UserService {
    getUsers() {
        return axiosInstance()
            .get('User')
            .then((response) => {
                return response.data
            })
    }

    addUser(user) {
        return axiosInstance()
            .post('User', user)
            .then((response) => {
                return response.data
            })
    }

    getUserById(id) {
        return axiosInstance()
            .get('User/id?id=' + id)
            .then((response) => {
                return response.data
            })
    }

    updateUser(user) {
        return axiosInstance()
            .put('User', user)
            .then((response) => {
                return response
            }).catch(err => {
                return err.response
            })
    }
    
    deleteUser(id) {
        return axiosInstance()
            .delete('User/id?id=' + id)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }
}
export default new UserService()
