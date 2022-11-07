<template>
    <div class="col-span-12">
        <BaseCard>
            <template v-slot:cardHeader>
                <div class="card-header">
                    <div class="card-title py-3 font-bold text-4xl">Company's Rates</div>
                    <BaseBtn
                        @click="showFormModal()"
                        rounded
                        class="border border-success text-success hover:bg-success hover:text-white mr-5"  
                    >Add Rate</BaseBtn> 
                    <BaseBtn
                        rounded
                        class="border border-danger text-danger hover:bg-danger hover:text-white"  
                        @click="this.$router.back()" 
                    >Back</BaseBtn>
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
                                        Start date
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        End date
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Amount
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
                                    v-for="rate in rates"
                                    :key="rate.id"
                                >
                                    <td>
                                        {{ rate.name }}
                                    </td>
                                    <td>
                                        {{ formatDate(rate.startDate) }}
                                    </td>
                                    <td>
                                        {{ formatDate(rate.finalDate) }}
                                    </td>
                                    <td>
                                        {{ rate.amount }}
                                    </td>
                                    <td class="py-5">
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white mr-2"
                                            @click="showFormModal(rate.id)"
                                        >
                                            View
                                        </BaseBtn>
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white"
                                            @click="rateToDelete(rate)" 
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
                actionType="delete" titleText="Delete Rate" bodyText="Are you sure you want to delete this rate?" :itemName="rateSelectedToDelete.name"
                @confirmation="(value) => deleteRate(value, rateSelectedToDelete.id)">
            </confirmation-modal>
        </BaseCard>
    </div>
    <rate-form-modal :companyId="idCompany" :rateId="rateId"
        v-if="formModalIsOpen"  
        @saveRate="(value, rate) => saveRate(value, rate)"
    >
    </rate-form-modal>
</template>

<script>
import ConfirmationModal from '../../../components/ConfirmationModal.vue'
import RateServices from '../../../services/rate.services'
import RateFormModal from './RateFormModal.vue'
import {
    TIME_FORMAT
} from './../../../util/constants'

export default {
    name: 'Rates',
    data() {
        return {
            rates: [],
            modalIsOpen : false,
            ratesSelectedToDelete : {},
            idCompany: this.$route.params.id,

            formModalIsOpen: false,
            rateId: ''
        }
    },
    components: {
        ConfirmationModal,
        RateFormModal
    },
    created() {
        this.loadTableData();
    },
    methods :{
        formatDate: (date) => new Intl.DateTimeFormat(TIME_FORMAT).format(new Date(date)),
        saveRate(value, rate) {
            if(value) {
                if(rate.id) {
                RateServices.updateRate(rate).then((response) => {
                    this.$toast.success("Updated Rate")
                    this.loadTableData();
                }, (error) => {
                    this.$toast.error("Can't Update Rate")
                })
                } else {
                    RateServices.addRate(rate).then((result) => {
                        this.loadTableData();
                    }, (error) => {
                        this.$toast.error("Can't Add Rate")
                    })
                }
            }  
            this.formModalIsOpen = false
        },
        async deleteRate(value, id){
            if(!value){
                this.modalIsOpen = false
                this.rateSelectedToDelete = {}
                return
            }
        const response = await RateServices.deleteRate(id)

            if(response.status == 200){
                this.showToast("success", "Rate Deleted", 1300)
                this.updateRateTable()
            }

            if(response.status == 404){
                this.showToast("error", "Rate Not Found", 1300)
            }

            if(response.status == 400){
                this.showToast("error", "Can't Delete Rate", 1300)
            }
        },

        showFormModal(rateId) {
            this.formModalIsOpen = true
            this.rateId = rateId
        },

        rateToDelete(rate){
            this.rateSelectedToDelete = rate
            this.modalIsOpen= true
        },

        updateRateTable() {
            this.loadTableData();
        },

        showToast(type, msg, time = 1000){
            this.modalIsOpen = false
            this.$toast.open({
                type : type,
                message: msg,
                duration : time
            })
        },

        loadTableData() {
            RateServices.getRateByCompany(this.idCompany).then((response) => {
                this.rates = response
            })
        }
    },
    
}
</script>