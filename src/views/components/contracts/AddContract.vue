<template>
    <div class="container-session-v1">
        <BaseCard noPadding class="overflow-hidden sizeCard">
            <div class="col-span-1 lg:col-span-1">
                <div class="p-5">
                    <h1 class="mb-3 text-lg">Add Contract</h1>
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
                                <option value="" disabled hidden>Contract Type</option>
                                <option v-for="contractType in typeList" :value="contractType" :key="contractType">
                                    {{ contractType.value }}
                                </option>
                            </select>
                            <span v-if="v$.type.$error">
                                {{ v$.type.$errors[0].$message }}
                            </span>
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
                                <option value="" disabled hidden>Status</option>
                                <option v-for="status in statusList" :value="status" :key="status">
                                    {{ status.value }}
                                </option>
                            </select>
                            <span v-if="v$.status.$error">
                                {{ v$.status.$errors[0].$message }}
                            </span>
                        </div>
                        <div class="mb-3">
                            <BaseBtn rounded block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-light text-white mb-3"
                                :disabled='isDisabled' @click="addContract()" v-bind:style="{backgroundColor:changeColor}">
                                Add Contract
                            </BaseBtn>
                            <BaseBtn rounded block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 bg-danger text-white"
                                @click="this.$router.push(`/users/${this.$route.params.id}`)">Back to User
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
import ContractService from "../../../services/contract.services";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'addContract',
    components: { Datepicker },
    data() {
        return {
            v$: useValidate(),
            contractName: '',
            startDate: '',
            finalDate: '',
            rate: '',
            type: '',
            status: '',
            color: '',
            typeList: [],
            statusList: []
        }
    },
    methods: {
        addContract() {
            var contract = {
                name: this.contractName,
                startDate: this.startDate,
                finalDate: this.finalDate,
                rate: this.rate,
                contractTypeId: this.type.id,
                userId: this.$route.params.id,
                contractStatusId: this.status.id
            }
            ContractService.addContract(contract).then (
                (result) => {
                    this.$toast.success("Added Contract.")
                    setTimeout(() => this.$router.push(`/users/${this.$route.params.id}`),500)
                },
                (error) => {
                    this.$toast.error("Can't Added Contract.")
                }
            )
        },
        isPreviousDate(startDate) {
            const currentDate = new Date();
            return startDate < currentDate;
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
                required: helpers.withMessage("FinalDate is required", required),
                minValue: minValue(this.startDate)
            },
            type: {
                required: helpers.withMessage("Type is required", required)
            },
            rate: {
                required: helpers.withMessage("Rate is required", required),
                minValueValue: minValue(1)
            },
            status: {
                required: helpers.withMessage("Status is required", required)
            }
        }
    },
    created() {
        this.$toast.info("All fields are required."),
        ContractService.getAllContractStatus().then((data) => {
            this.statusList = data
        }),
        ContractService.getAllContractTypes().then((data) => {
            this.typeList = data
        })
    },
    computed: {
        isDisabled() {
            this.v$.$validate()
            return this.v$.$error
        },
        changeColor() {
            this.v$.$validate()
            if (!this.v$.$error) {
                return this.color = 'green'
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