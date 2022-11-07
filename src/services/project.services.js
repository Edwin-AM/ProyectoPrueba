import axiosInstance from './api.service'

class ProjectServices {
    getProjectsByIdCompany(companyId) {
        return axiosInstance()
            .get('Project/companyId?companyId=' + companyId)
            .then((response) => {
                return response.data
            })
    }
    
    getProjectById(id) {
        return axiosInstance()
            .get('Project/id?id=' + id)
            .then((response) => {
                return response.data
            })
    }

    addProject(project) {
        return axiosInstance()
        .post('Project', project)
        .then((response) => {
            return response
        }).catch(err => {
            return err.response
        })
    } 
    updateProject(project) {
        return axiosInstance()
        .put('Project', project)
        .then((response) => {
            return response
        }).catch(err => {
            return err.response
        })
    }
    deleteProject(id) {
        return axiosInstance()
            .delete('Project/id?id=' + id)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }
    getAllNets() {
        return axiosInstance()
            .get('Project/netTypes')
            .then((response) => {
                return response.data
            })
    }
}
export default new ProjectServices()
