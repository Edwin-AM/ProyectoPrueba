import axiosInstance from './api.service'

class RateService {
    getRateByCompany(id) {
        return axiosInstance()
            .get('Rate/companyId?companyId=' + id)
            .then((response) => {
                return response.data
            })
    }

    getRateById(id) {
        return axiosInstance()
            .get('Rate/id?id=' + id)
            .then((response) => {
                return response.data
            })
    }

    getAllRateTypes() {
        return axiosInstance()
            .get('Rate/types')
            .then((response) => {
                return response.data
            })
    }

    updateRate(rate) {
        return axiosInstance()
            .put('Rate', rate)
            .then((response) => {
                return response.data
            })
    }

    addRate(rate) {
        return axiosInstance()
            .post('Rate', rate)
            .then((response) => {
                return response.data
            })
    }

    deleteRate(id) {
        return axiosInstance()
            .delete('Rate/id?id=' + id)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }
}

export default new RateService()