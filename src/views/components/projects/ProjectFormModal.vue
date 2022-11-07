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
                                v-if="isLoaded"
                            >
                                <h1 class="mb-3 text-xl" v-if="projectId" >Update Project</h1>
                                <h1 class="mb-3 text-xl" v-else >Add Project</h1>
                                <form
                                    @submit.prevent
                                    class="grid grid-cols-2 gap-x-4 sm:grid-cols-2"
                                    action=""
                                >
                                    <div class="mb-4 col-span-2">
                                        <label>Description</label>
                                        <textarea
                                            v-model="description"
                                            class="w-full px-4 py-1 border focus:outline-none rounded-full resize-none"
                                        >
                                        </textarea>
                                        <span v-if="v$.description.$error">
                                            {{ v$.description.$errors[0].$message }}                                          
                                        </span>
                                    </div>
                                    <div class="mb-3">
                                        <label>Start Date</label>
                                        <input
                                            v-model="startDate"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            type="date"
                                        />
                                        <span v-if="v$.startDate.$error">
                                            {{ v$.startDate.$errors[0].$message }} 
                                        </span>
                                    </div>
                                    <div class="mb-3">
                                        <label>Final Date</label>
                                        <input
                                            v-model="endDate"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            type="date"
                                        />
                                        <span v-if="v$.endDate.$error">
                                            {{ v$.endDate.$errors[0].$message }} 
                                        </span>
                                    </div>
                                    <div class="mb-10 text-center col-span-2">
                                        <span v-if="v$.endDate.minValue.$invalid && !v$.endDate.required.$invalid">
                                            Final date must be greater than start date
                                        </span>
                                    </div>
                                    <div class="mb-3">
                                        <select id="netItem" name="netItem"
                                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                            v-model="net">
                                            <option v-if="projectId" :value="net" disabled selected hidden>{{this.net.value}}</option>
                                            <option v-else value="" disabled selected hidden>Select a NET</option>
                                            <option v-for="netItem in netList" :value="netItem" :key="netItem">
                                                {{ netItem.value }}
                                            </option>
                                        </select>
                                        <span v-if="v$.net.$error ">
                                            {{ v$.net.$errors[0].$message }}
                                        </span>
                                    </div>
                                    <div class="col-span-2 overflow-hidden my-8">
                                        <table class="border-collapse table-auto w-full text-sm">
                                            <thead>
                                                <tr>
                                                    <th class="border-b dark:border-slate-600 p-4 pt-0 pb-3"></th>
                                                    <th class="border-b dark:border-slate-600 p-4 pt-0 pb-3">Name</th>
                                                    <th class="border-b dark:border-slate-600 p-4 pt-0 pb-3">Amount</th>
                                                    <th class="border-b dark:border-slate-600 p-4 pt-0 pb-3">Type</th>
                                                    <th class="border-b dark:border-slate-600 p-4 pt-0 pb-3">Start</th>
                                                    <th class="border-b dark:border-slate-600 p-4 pt-0 pb-3">End</th>
                                                </tr>
                                            </thead>
                                            <tbody class="overflow-y-auto">
                                                <tr v-for="(rate) in rateList" :key="rate.id">
                                                    <td class="border-b border-slate-100 dark:border-slate-700"><input type="checkbox" @click="selectedRate(rate, $event)" v-bind:checked="isChecked(rate.id)" /></td>
                                                    <td class="border-b border-slate-100 dark:border-slate-700 p-4">{{ rate.name }}</td>
                                                    <td class="border-b border-slate-100 dark:border-slate-700 p-4">{{ rate.amount }}</td>
                                                    <td class="border-b border-slate-100 dark:border-slate-700 p-4">{{ rate.rateType.value }}</td>
                                                    <td class="border-b border-slate-100 dark:border-slate-700 p-4">{{ formatDate(rate.startDate) }}</td>
                                                    <td class="border-b border-slate-100 dark:border-slate-700 p-4">{{ formatDate(rate.finalDate) }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        class="col-start-2 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 text-slate-200"
                                    >
                                        <button type="button" class="w-full bg-gray-500 py-2 px-4 rounded" 
                                        v-bind:style="{backgroundColor:changeColor}"
                                        @click="projectActionResponse(true)"
                                        :disabled='isDisabled'>
                                            <span class="action-text">Save</span>
                                        </button>
                                        <button
                                            type="button"
                                            @click="() => projectActionResponse(false)"
                                            class="w-full bg-red-600 py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div v-else> Loading </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectServices from '../../../services/project.services'
import useValidate from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'
import {
    TIME_FORMAT
} from './../../../util/constants'

export default {
    name: 'ProjectFormModal',
    props: {
        projectId:{
            type: String,
            default: null
        },
        rateList:{
            type: Array,
            required: true
        },
        idCompany:{
            type: String,
            required: true
        }
    },
    data () {
        return{       
            v$: useValidate(),  
            companyId: this.idCompany,
            description: '',
            startDate: '',
            endDate: '',
            net: '',
            netList: [],
            rates: [],
            currentProject:{rates:[]},
            rateIds:[],
            isLoaded: false
        }      
    },
    methods:{
        formatDate: (date) => new Intl.DateTimeFormat(TIME_FORMAT).format(new Date(date)),
        isChecked(id) {
            return this.rateIds.includes(id)         
        },
        getRateIds(){
            this.rates.forEach((element) => {
                this.rateIds.push(element.id)
            }); 
        },
        projectActionResponse(value) {
            if(value){
                const project={
                    id: this.projectId,
                    companyId: this.idCompany,
                    description: this.description,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    netId: this.net.id,
                    rates: this.rates 
                }
                this.$emit('saveConfirmation', value, project)
            }   
            else
                this.$emit('saveConfirmation', value)
                this.projectId = '';
        },
        selectedRate(rate, event){
            if(event.target.checked){
                this.rates.push({id:rate.id})
            }
            else if(!event.target.checked){
                this.rates.forEach((element, index) => {
                    if (element.id == rate.id) 
                        this.rates.splice(index, 1);
                });
            }  
        },
        sortArray(array){
            array.sort((a, b) => {
                if(a.id.toLowerCase() > b.id.toLowerCase())return 1
                if(a.id.toLowerCase() < b.id.toLowerCase())return -1
                return 0
            })           
        },
        compareContactLists(currentRates, newRates) {
            this.sortArray(currentRates)
            this.sortArray(newRates)
            return  JSON.stringify(currentRates) == JSON.stringify(newRates)
        },
        changes() {
            return this.description != this.currentProject.description ||
                this.startDate != this.currentProject.startDate ||
                this.endDate != this.currentProject.endDate ||
                this.net.id != this.currentProject.netId ||
                !this.compareContactLists(this.currentProject.rates, this.rates)
        },
        async searchNet(id){
            const response = await ProjectServices.getAllNets().then((data) => {
                data.forEach(netItem => {
                    if (netItem.id==id) {
                        this.net = netItem
                        return false
                    }
                })
            });
            this.isLoaded = true
            return response
        }
    },
    beforeCreate(){
        ProjectServices.getAllNets().then((data) => {
            this.netList = data
        });
    },
    created(){
        if(this.projectId){
            ProjectServices.getProjectById(this.projectId).then((response) => {
                //currentData
                this.currentProject.description = response.description
                this.currentProject.startDate = new Date(response.startDate).toISOString().split('T')[0]
                this.currentProject.endDate = new Date(response.endDate).toISOString().split('T')[0]
                this.currentProject.netId = response.netId

                this.description = response.description
                this.startDate = new Date(response.startDate).toISOString().split('T')[0]
                this.endDate = new Date(response.endDate).toISOString().split('T')[0]

                this.net = this.searchNet(response.netId)

                response.rates.forEach((element) => {
                    this.rates.push({id:element.id})
                    this.currentProject.rates.push({id:element.id})
                });
                this.getRateIds()
            })
        }else {
            this.isLoaded = true
        }
    },
    validations() {
        return {
            description: {
                required: helpers.withMessage(
                    'Description is required',
                    required
                ),
                minLength: minLength(3)
            },
            startDate: {
                required: helpers.withMessage(
                    'Start Date is required',
                    required,
                ),
                maxValue(val, {endDate}){
                   return new Date(endDate) > new Date(val)
                }
            },
            endDate: {
                required: helpers.withMessage(
                    'End Date is required',
                    required
                ),
                minValue(val, { startDate }) {
                    let value = new Date(val) > new Date(startDate)
                    return value
                },
            },
            net: {
                required: helpers.withMessage("NET is required", required)
            },
        }
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
    }
}
</script>

<style>
.action-text {
    text-transform: capitalize;
}
</style>
