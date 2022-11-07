<template>
    <div class="container-session-v1">
        <BaseCard noPadding class="overflow-hidden sizeCard">
            <div class="col-span-1 lg:col-span-1">
                <div class="p-5">
                    <h1 class="mb-3 text-lg">Edit Contract</h1>
                    <form action="">
                        <div class="mb-3">
                            <input v-model="contractName"
                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="text"
                                placeholder="Contract Name" />
                            <span v-if="v$.contractName.$error">
                                {{ v$.contractName.$errors[0].$message }}
                            </span>
                        </div>
                        <div class="mb-3">
                            <Datepicker class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                            :format="'yyyy-MM-dd'"
                            v-model="startDate" 
                            placeholder="Start Date"></Datepicker>
                            <span v-if="v$.startDate.$error">
                                {{ v$.startDate.$errors[0].$message }}
                            </span>
                        </div>
                        <div class="mb-3">
                            <Datepicker class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                            :format="'yyyy-MM-dd'"
                            v-model="finalDate" 
                            placeholder="Final Date"></Datepicker>
                            <span v-if="v$.finalDate.$error">
                                {{ v$.finalDate.$errors[0].$message }}
                            </span>
                        </div>
                        <div class="mb-3">
                            <select id="contractType" name="contractType"
                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                v-model="type">
                                <option :value="type" disabled selected hidden>{{this.type.value}}</option>
                                <option v-for="contractType in typeList" :value="contractType" :key="contractType">
                                    {{ contractType.value }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <input v-model="rate"
                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="number" min="1"
                                placeholder="Rate" />
                            <span v-if="v$.rate.$error">
                                {{ v$.rate.$errors[0].$message }}
                            </span>
                        </div>
                        <div class="mb-3">
                            <select id="status" name="status"
                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                v-model="status">
                                <option :value="status" disabled selected hidden>{{this.status.value}}</option>
                                <option v-for="status in statusList" :value="status" :key="status">
                                    {{ status.value }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <BaseBtn rounded block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-light text-white mb-3"
                                :disabled='isDisabled' @click="editContract()" v-bind:style="{backgroundColor:changeColor}">
                                Save
                            </BaseBtn>
                            <BaseBtn rounded block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 bg-danger text-white"
                                @click="this.$router.go(-1),500">Back to Users
                            </BaseBtn>
                        </div>
                    </form>
                </div>
            </div>
        </BaseCard>
    </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { helpers, required, minValue, minLength } from "@vuelidate/validators";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import contractService from '../../../services/contract.services'


export default {
    name: 'editContract',
    components: { Datepicker },
    data() {
        return {
            v$: useValidate(),
            id: '',
            contractName: '',
            startDate: '',
            finalDate: '',
            rate: '',
            contractTypeId: '',
            contractStatusId: '',
            typeList: [],
            statusList: [],
            status:'',
            type:'',
            currentContract:{},
        }
    },
    methods: {
       
        isPreviousDate(startDate) {
            const currentDate = new Date();
            return startDate < currentDate;
        },     
        editContract() {
            var contract = {
                id: this.$route.params.id,
                name: this.contractName,
                startDate: this.startDate,
                finalDate: this.finalDate,
                rate: this.rate,
                contractTypeId: this.type.id,
                contractStatusId: this.status.id
                
            }
            contractService.updateContract(contract).then (
                (result) => {
                    this.$toast.success("Success")
                    setTimeout(() => this.$router.go(-1),500)
                },
                (error) => {
                    this.$toast.error("Can't update contract.")
                }
            )
            
        },
        changes() {
            return this.contractName != this.currentContract.contractName ||
                this.startDate != this.currentContract.startDate ||
                this.finalDate != this.currentContract.finalDate ||
                this.rate != this.currentContract.rate ||
                this.contractTypeId != this.type.id ||
                this.contractStatusId != this.status.id
        }
        
    },
    validations() {
        return {
            contractName: {
                required: helpers.withMessage("Contract Name is required", required),
                minLength: minLength(3)
            },
            startDate: {
                required: helpers.withMessage("StartDate is required", required)
            },
            finalDate: {
                required: helpers.withMessage("FinalDate is required", required)
            },
            rate: {
                required: helpers.withMessage("Rate is required", required),
                minValueValue: minValue(0),
            }
        }
    },
    created() {
        //this.$toast.info("All fields are required."),
        contractService.getContractById(this.$route.params.id)
        .then((data) => {
            this.currentContract.id = this.id = this.$route.params.id
            this.currentContract.contractName = this.contractName = data.name
            this.currentContract.startDate = this.startDate = data.startDate
            this.currentContract.finalDate = this.finalDate = data.finalDate
            this.currentContract.rate = this.rate = data.rate
            this.currentContract.contractTypeId = this.contractTypeId = data.contractTypeId
            this.currentContract.contractStatusId = this.contractStatusId = data.contractStatusId

            contractService.getAllContractStatus().then((data) => {
                this.statusList = data
                
                this.statusList.forEach(statusItem => {
                    if (statusItem.id==this.contractStatusId) {
                        this.status = statusItem
                    }
                })
            }),
            contractService.getAllContractTypes().then((data) => {
                this.typeList = data
                
                this.typeList.forEach(typeItem => {
                    if (typeItem.id==this.contractTypeId) {
                        this.type = typeItem
                    }
                })
            })
        })
    },
    computed: {
        isDisabled() {
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
        }
    }
}
</script>
<style scoped>
.container-session-v1 {
    display: flex;
    justify-content: center;
}

.sizeCard {
    width: 500px;
}

input {
    color: #000000;
}

select {
    color: darkgray;
}
</style>