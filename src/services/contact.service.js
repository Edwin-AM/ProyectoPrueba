import axiosInstance from './api.service'

class ContactService  {
    addContact(contact) {
        return axiosInstance()
            .post('Contact', contact)
            .then((response) => {
                return response
            }).catch((err) => {
                return err.response
            })
    }
    updateContact(contact) {
        return axiosInstance()
            .put('Contact', contact)
            .then((response) => {
                return response
            }).catch((err) => {
                return err.response
            })
    }
    getContactById(id) {
        return axiosInstance()
            .get('Contact/' + id)
            .then((response) => {
                return response.data
            })
    }
    getAllByCompany(companyId) {
        return axiosInstance()
            .get('Contact/getAllByCompany/' + companyId)
            .then((response) => {
                return response.data
            })
    }
    getAllContactTypes() {
        return axiosInstance()
            .get('Contact/contactTypes')
            .then((response) => {
                return response.data
            })
    }
    deleteContact(id) {
        return axiosInstance()
            .delete('Contact/' + id)
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
    }
}
export default new ContactService()