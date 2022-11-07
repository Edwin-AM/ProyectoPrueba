<template>
    <div class="col-span-12">
        <BaseCard>
            <template v-slot:cardHeader>
                <div class="card-header">
                    <div class="card-title py-3 font-bold text-4xl">Companies</div>
                    <BaseBtn
                        rounded
                        class="border border-success text-success hover:bg-success hover:text-white"  
                        @click="this.$router.push(`${this.$route.path}/addcompany`)" 
                    >Add Company</BaseBtn>
                </div>
            </template>
            <div
                class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
            >
                <div
                    class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
                >
                    <div
                        class="dataTable-container block w-full overflow-x-auto whitespace-nowrap borderless hover"
                    >
                        <table
                            class="table-3 dataTable-table max-w-full w-full"
                        >
                            <thead>
                                <tr>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Name
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Email
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Website
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        NDA
                                    </th>
                                     <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        MSA
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class="hover:bg-gray-100 cursor-pointer table-row"
                                    v-for="company in companies"
                                    :key="company.id"
                                >
                                    <td>
                                        {{ company.name }}
                                    </td>
                                    <td>
                                        {{ company.email }}
                                    </td>
                                    <td>
                                        {{ company.phone }}
                                    </td>
                                    <td class="text">
                                        {{ company.webSite }}
                                    </td>
                                    <td >
                                        <div v-if= company.nda >
                                            Yes
                                        </div>
                                        <div v-else>
                                            No
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if= company.msa >
                                            Yes
                                        </div>
                                        <div v-else>
                                            No
                                        </div>
                                    </td>
                                    <td class="py-5">
                                        <BaseBtn @click="this.$router.push(`${this.$route.path}/${company.id}`)"
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white mr-2"
                                        >
                                            View
                                        </BaseBtn>
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white"
                                            @click="companyToDelete(company)" 
                                        >
                                            Delete
                                        </BaseBtn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="dataTable-bottom">
                        <div class="dataTable-info">
                            Showing 1 to 8 of 8 entries
                        </div>
                        <nav class="dataTable-pagination">
                            <ul class="dataTable-pagination-list"></ul>
                        </nav>
                    </div>
                </div>
            </div>
            <confirmation-modal
                v-if="modalIsOpen"
                actionType="delete" titleText="Delete Company" bodyText="Are you sure you want to delete this company" :itemName="companySelectedToDelete.name"
                @confirmation="(value) => deleteCompany(value, companySelectedToDelete.id)">
            </confirmation-modal>
        </BaseCard>
    </div>
</template>

<script>
import ConfirmationModal from './../../../components/ConfirmationModal.vue'
import CompanyService from '../../../services/company.service'
export default {
    name: 'Company',
    data() {
        return {
            companies: [],
            modalIsOpen : false,
            companySelectedToDelete : {}
        }
    },
    components: {
        ConfirmationModal
    },
    created() {
        CompanyService.getCompanies().then((response) => {
            this.companies = response
        })
    },
    methods :{
        async deleteCompany(value, id){
            if(!value){
                this.modalIsOpen = false
                this.companySelectedToDelete = {}
                return
            }

            const response = await CompanyService.deleteCompany(id)

                if(response.status == 200){
                    this.showToast("info", "Company Deleted", 1300)
                    this.updateCompanyTable()
                }

                if(response.status == 404){
                    this.showToast("error", "Company Not Found", 1300)
                }

                if(response.status == 400){
                    this.showToast("error", "Can't Delete Company", 1300)
                }
            },

            companyToDelete(company){
                this.companySelectedToDelete = company
                this.modalIsOpen= true
            },

            updateCompanyTable() {
            CompanyService.getCompanies().then((res) => (this.companies = res))
            },

            showToast(type, msg, time = 1000){
                //hide modal
                this.modalIsOpen = false
                this.$toast.open({
                    type : type,
                    message: msg,
                    duration : time
                })
            }
        },
}
</script>