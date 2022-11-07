import axiosInstance from './api.service'

class CompanyService {
    getCompanies() {
        return axiosInstance()
            .get('Company')
            .then((response) => {
                return response.data
            })
    }
    getCompanyById(id) {
        return axiosInstance()
            .get('Company/id?id=' + id)
            .then((response) => {
                return response.data
            })
    }

    addCompany(company) {
        return axiosInstance()
            .post('Company', company)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }

    updateCompany(company) {
        return axiosInstance()
            .put('company', company)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }
    deleteCompany(id){
        return axiosInstance()
        .delete('Company/id?id='+id)
        .then(response => {
            return response
        }).catch(err => {
            return err.response
        })
    }    
}

export default new CompanyService()
