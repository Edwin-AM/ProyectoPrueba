<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity"></div>
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="relative inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                    <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start justify-center">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                                v-if="isLoaded"
                            >
                                <h1 class="mb-3 text-xl" v-if="contactId">Update Contact</h1>
                                <h1 class="mb-3 text-xl" v-else>Add Contact</h1>
                                <form @submit.prevent class="grid grid-cols-2 gap-x-4 sm:grid-cols-2" action="">
                                    <div class="mb-4 col-span-2">
                                            <input v-model="name"
                                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                                type="text" placeholder="Name" />
                                            <span v-if="v$.name.$error">
                                                {{ v$.name.$errors[0].$message }}
                                            </span>
                                        </div>
                                        <div class="mb-3">
                                            <input v-model="email"
                                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                                type="text" placeholder="Email" />
                                            <span v-if="v$.email.$error">
                                                {{ v$.email.$errors[0].$message }}
                                            </span>
                                        </div>
                                        <div class="mb-3">
                                            <input v-model="phone"
                                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                                type="text" placeholder="Phone" />
                                            <span v-if="v$.phone.$error">
                                                {{ v$.phone.$errors[0].$message }}
                                            </span>
                                        </div>
                                        <div class="mb-3">
                                            <select id="contactTypeItem" name="contactTypeItem"
                                                class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                                v-model="contactType">
                                                <option v-if="contactId" :value="contactType" disabled selected hidden>{{this.contactType.value}}</option>
                                                <option v-else value="" disabled selected hidden>Contact Type</option>
                                                <option v-for="contactTypeItem in contactTypeList" :value="contactTypeItem" :key="contactTypeItem">
                                                    {{ contactTypeItem.value }}
                                                </option>
                                            </select>
                                            <span v-if="v$.contactType.$error ">
                                                {{ v$.contactType.$errors[0].$message }}
                                            </span>
                                        </div>
                                        <div
                                            class="col-start-2 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 text-slate-200">
                                            <button type="button" class="w-full bg-gray-500 py-2 px-4 rounded"
                                                v-bind:style="{backgroundColor:changeColor}"
                                                @click="contactActionResponse(true)" :disabled='isDisabled'>
                                                <span class="action-text">Save</span>
                                            </button>
                                            <button type="button" @click="() => contactActionResponse(false)"
                                                class="w-full bg-red-600 py-2 px-4 rounded">
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
import useValidate from '@vuelidate/core'
import { helpers, required, email, minLength, maxLength } from '@vuelidate/validators'
import ContactService from '../../../services/contact.service'
export default {
    name: 'ContactFormModal',
    props: {
        contactId: {
            type: String,
            default: null
        },
        idCompany: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            v$: useValidate(),
            contactId: this.contactId,
            name: '',
            email: '',
            phone: '',
            contactType: '',
            contactTypeList: [],
            companyId: this.idCompany,
            currentContact:{},
            isLoaded: false
        }
    },
    methods: {
        contactActionResponse(value) {
            if(value){
                const contact={
                    id: this.contactId,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    companyId: this.companyId,
                    contactTypeId: this.contactType.id
                }
                this.$emit('saveConfirmation', value, contact)
            }   
            else
                this.$emit('saveConfirmation', value)
        },
        changes() {
            return this.name != this.currentContact.name ||
                this.email != this.currentContact.email ||
                this.phone != this.currentContact.phone ||
                this.contactType.id != this.currentContact.contactTypeId
        },
        async searchContactType(id){
            const response = await ContactService.getAllContactTypes().then((data) => {
                data.forEach(typeItem => {
                    if (typeItem.id==id) {
                        this.contactType = typeItem
                        return false
                    }
                })
            })
            this.isLoaded = true
            return response
        }
    },
    beforeCreate(){
        ContactService.getAllContactTypes().then((data) => {
            this.contactTypeList = data
        })
    },
    created() {
        if(this.contactId){
            ContactService.getContactById(this.contactId).then((response) => {
                //currentData
                this.currentContact.name = response.name
                this.currentContact.email = response.email
                this.currentContact.phone = response.phone
                this.currentContact.contactTypeId = response.contactTypeId
                this.name = response.name
                this.email = response.email
                this.phone = response.phone

                this.contactType = this.searchContactType(response.contactTypeId)
            })
        }else {
            this.isLoaded = true
        }
    },
    validations() {
        return {
            name: {
                required: helpers.withMessage("Name is required", required),
                minLength: minLength(3),
                maxLength: maxLength(50),
            },
            email: {
                required: helpers.withMessage("Email is required", required),
                email: helpers.withMessage(
                    'Email should be in this format: example@domain.com',
                    email
                ),
                minLength: minLength(3),
                maxLength: maxLength(50),
            },
            phone: {
                required: helpers.withMessage("Phone is required", required),
                minLength: minLength(6),
                maxLength: maxLength(15),
            },
            contactType: {
                required: helpers.withMessage("Contact Type is required", required)
            },
        }
    },
    computed: {
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