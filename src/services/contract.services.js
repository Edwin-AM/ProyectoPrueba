import axiosInstance from './api.service'

class ContractService {
    addContract(contract) {
        return axiosInstance()
            .post('Contract', contract)
            .then((response) => {
                return response.data
            })
    }

    getContractsByUserId(userId) {
        return axiosInstance()
            .get('Contract/userId?userId=' + userId)
            .then((response) => {
                return response.data
            })
    }

    getContractById(contractId) {
        return axiosInstance()
            .get('Contract/id?id=' + contractId)
            .then((response) => {
                return response.data
            })
    }

    updateContract(contract) {
        return axiosInstance()
            .put('Contract', contract)
            .then((response) => {
                return response
            }).catch(err => {
                return err.response
            })
    }
    
    deleteContract(id) {
        return axiosInstance()
            .delete('Contract/id?id=' + id)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }
    
    getAllContractStatus() {
        return axiosInstance()
            .get('Contract/getAllContractStatus')
            .then((response) => {
                return response.data
            })
    }

    getAllContractTypes() { 
        return axiosInstance()
            .get('Contract/getAllContractTypes')
            .then((response) => {
                return response.data
            })
    }
}
export default new ContractService()
