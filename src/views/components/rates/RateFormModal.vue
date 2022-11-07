<template>
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity"
        ></div>

        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div
                class="flex items-end justify-center min-h-screen px-4 text-center sm:block sm:p-0"
            >
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                >
                <div
                    class="relative inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                >
                    <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start justify-center">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            >
                                <h1 class="mb-3 text-xl" v-if="rateId">
                                    Update Rate
                                </h1>
                                <h1 class="mb-3 text-xl" v-else>Add Rate</h1>
                                <form
                                    @submit.prevent
                                    class="grid grid-cols-2 gap-x-4 sm:grid-cols-2"
                                    action=""
                                >
                                    <div class="mb-4 col-span-2">
                                        <label>Name</label>
                                        <input
                                            v-model="rateName"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            type="text"
                                        />
                                        <span v-if="v$.rateName.$error">
                                            {{ v$.rateName.$errors[0].$message }}                                          
                                        </span>
                                    </div>
                                    <div class="mb-3">
                                        <label>Start Date</label>
                                        <input
                                            v-model="rateStartDate"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            type="date"
                                        />
                                        <span v-if="v$.rateStartDate.$error">
                                            {{ v$.rateStartDate.$errors[0].$message }} 
                                        </span>
                                    </div>
                                    <div class="mb-3">
                                        <label>Final Date</label>
                                        <input
                                            v-model="rateFinalDate"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            type="date"
                                        />
                                        <span v-if="v$.rateFinalDate.$error">
                                            {{ v$.rateFinalDate.$errors[0].$message }} 
                                        </span>
                                    </div>
                                    <div class="mb-10 text-center col-span-2">
                                        <span v-if="v$.rateFinalDate.minValue.$invalid && !v$.rateFinalDate.required.$invalid">
                                            Final date must be greater than start date
                                        </span>
                                    </div>
                                    <div class="mb-3">
                                        <label>Amount</label>
                                        <input
                                            v-model="rateAmount"
                                            min="1"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            type="number"
                                        />
                                        <span v-if="v$.rateAmount.$error">
                                            {{ v$.rateAmount.$errors[0].$message }} 
                                        </span>
                                        <span v-if="rateAmount <= 0 && !(v$.rateAmount.required.$invalid)">
                                            Number must be greater than cero
                                        </span>
                                    </div>
                                    <div class="">
                                        <label class="mr-4">Rate Type</label>
                                        <select v-model="rateTypeId" class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" name="rateType" id="rateType">
                                          <option v-for="(rateType) in rateTypes" :key="rateType.value" :value="rateType.id">{{ rateType.value }}</option>
                                        </select>
                                        <span v-if="v$.rateTypeId.$error">
                                            {{ v$.rateTypeId.$errors[0].$message }} 
                                        </span>
                                    </div>
                                    <div
                                        class="col-start-2 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 text-slate-200"
                                    >
                                        <button
                                            type="button"
                                            class="w-full bg-gray-500 py-2 px-4 rounded"
                                            v-bind:style="{
                                                backgroundColor: changeColor,
                                            }"
                                            @click="saveRate(true)"
                                            :disabled="isDisabled"
                                        >
                                            <span class="action-text"
                                                >Save</span
                                            >
                                        </button>
                                        <button
                                            type="button"
                                            @click="
                                                () =>
                                                    saveRate(false)
                                            "
                                            class="w-full bg-red-600 py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, minLength, numeric } from '@vuelidate/validators'
import RateServices from '../../../services/rate.services'

export default {
    name: 'ProjectFormModal',
    props: {
      rateId: {
        type: String,
        default: null
      },
      companyId: {
        type: String,
        required: true
      }
    },
    data() {
        return {
            v$: useValidate(),
            rateName: '',
            rateStartDate: '',
            rateFinalDate: '',
            rateAmount: 0,
            rateTypeId: '',
            rateTypes: [],

            currentRate: {}
        }
    },
    methods: {
        saveRate(value) {
            if(value) {
                const rate = {
                    "id": this.rateId,
                    "name": this.rateName,
                    "startDate": this.rateStartDate,
                    "finalDate": this.rateFinalDate,
                    "amount": this.rateAmount,
                    "rateTypeId": this.rateTypeId,
                    "companyId": this.companyId
                }
                this.$emit('saveRate', value, rate)
            } else {
                this.$emit('saveRate', value)
            }
        },
        changes() {
            return this.rateName != this.currentRate.rateName || 
                this.rateAmount != this.currentRate.rateAmount ||
                this.rateStartDate != this.currentRate.rateStartDate ||
                this.rateFinalDate != this.currentRate.rateFinalDate ||
                this.rateTypeId != this.currentRate.rateTypeId
        }
    },
    created() {
        if(this.rateId) {
            RateServices.getRateById(this.rateId).then((response) => {
                this.currentRate.rateName = this.rateName =  response.name
                this.currentRate.rateStartDate = this.rateStartDate = new Date(response.startDate).toISOString().split('T')[0]
                this.currentRate.rateFinalDate = this.rateFinalDate = new Date(response.finalDate).toISOString().split('T')[0]
                this.currentRate.rateAmount = this.rateAmount = response.amount
                this.currentRate.rateTypeId = this.rateTypeId = response.rateType.id
            })
        }
        
        RateServices.getAllRateTypes().then((response) => {
            this.rateTypes = response
        })
    },
    computed:{
        isDisabled(){
            if(this.changes()){
                this.v$.$validate()
                return this.v$.$error
            }else return true

        },
        changeColor() {
            this.v$.$validate()
            if (!this.v$.$error && this.changes()) {
                return (this.color = '#22C55E')
            } else {
                return
            }
        },      
    },
    validations() {
        return {
            rateName: {
                required: helpers.withMessage(
                    'Name is required',
                    required
                ),
                minLength: minLength(3)
            },
            rateAmount: {
                required: helpers.withMessage(
                    'Amount is required',
                    required,
                ), 
                minValue(val) {
                    let value = val > 0
                    return value
                },
            },
            rateStartDate: {
                required: helpers.withMessage(
                    'Start Date is required',
                    required,
                ),
                maxValue(val, {rateFinalDate}){
                   return new Date(rateFinalDate) > new Date(val)
                }
            },
            rateFinalDate: {
                required: helpers.withMessage(
                    'End Date is required',
                    required
                ),
                minValue(val, { rateStartDate }) {
                    let value = new Date(val) > new Date(rateStartDate)
                    return value
                },
            },
            rateTypeId: {
                required: helpers.withMessage(
                    'Rate type is required',
                    required
                )
            },          
        }
    },
}
</script>

<style>
.action-text {
    text-transform: capitalize;
}
</style>
