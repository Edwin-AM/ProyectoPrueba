import axiosInstance from './api.service'

class RoleService {
    getRoles() {
        return axiosInstance()
            .get('Role')
            .then((response) => {
                return response.data
            })
    }
    getRoleById(id) {
        return axiosInstance()
            .get('Role/id?id=' + id)
            .then((response) => {
                return response.data
            })
    }
    addRole(role) {
        return axiosInstance()
        .post('Role', role)
        .then((response) => {
            return response
        }).catch(err => {
            return err.response
        })
    } 
    updateRole(role) {
        return axiosInstance()
        .put('Role', role)
        .then((response) => {
            return response
        }).catch(err => {
            return err.response
        })
    }
    deleteRole(id){
        return axiosInstance()
        .delete('Role/id?id='+id)
        .then(response => {
            return response
        }).catch(err => {
            return err.response
        })
    }
}

export default new RoleService()