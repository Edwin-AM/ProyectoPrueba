<template>
    <div class="flex flex-col items-center container-session-v1">

        <div class=" flex top-menu gap-4 p-5">
            <div
                class="top-menu-item rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-info text-white">
                <router-link :to="{ path: `${this.$route.path}/projects` }">Projects</router-link>
            </div>
            <div
                class="top-menu-item rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-info text-white">
                <router-link :to="{ path: `${this.$route.path}/rates` }">Rates</router-link>
            </div>
            <div
                class="top-menu-item rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-info text-white">
                <button @click="showFormModal('')">Add Contact</button>
            </div>
        </div>

        <BaseCard noPadding class="overflow-hidden w-100 sizeCard">
            <div class="p-5">
                <h1 class="mb-3 text-xl">Update Company</h1>
                <form @submit.prevent class="grid grid-cols-1 gap-x-4 sm:grid-cols-2" action="">
                    <div class="mb-10">
                        <input v-model="name" class="w-full px-4 py-1 border focus:outline-none rounded-full"
                            type="text" placeholder="Name" />
                        <span v-if="v$.name.$error">
                            {{ v$.name.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="mb-10">
                        <input v-model="phone" type="text"
                            class="w-full px-4 py-1 border focus:outline-none rounded-full" placeholder="Phone" />
                        <span v-if="v$.phone.$error">
                            {{ v$.phone.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="mb-10">
                        <input v-model="email"
                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="email"
                            placeholder="Email" />
                        <span v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="mb-10">
                        <input v-model="website"
                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="tex"
                            placeholder="Website" />
                        <span v-if="v$.website.$error">
                            {{ v$.website.$errors[0].$message }}
                        </span>
                    </div>

                    <div class="mb-10">
                        <label class="mr-4">NDA</label>
                        <input type="checkbox" v-model="nda" />
                    </div>

                    <div class="mb-10">
                        <label class="mr-4">MSA</label>
                        <input type="checkbox" v-model="msa" />
                    </div>

                </form>

            </div>
            <div class="ml-5 px-4 sm:px-0">
                <div class="card-title py-3 font-bold text-2xl">Contacts</div>
            </div>
            <div class="ml-5 block w-full overflow-x-auto whitespace-nowrap borderless hover">
                <div class="dataTable-wrapper dataTable-loading no-footer fixed-columns">
                    <div class="dataTable-container  block w-full overflow-x-auto whitespace-nowrap borderless hover">
                        <table class=" table-3 dataTable-table max-w-full w-full">
                            <thead>
                                <tr class="">
                                    <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                        Name
                                    </th>
                                    <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                        Phone
                                    </th>
                                    <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                        Email
                                    </th>
                                    <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                        Type
                                    </th>
                                    <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class=" hover:bg-gray-100 cursor-pointer table-row" v-for="contact in contacts"
                                    :key="contact.id">
                                    <td class="text-center">
                                        {{ contact.name }}
                                    </td>
                                    <td class="text-center">
                                        {{ contact.phone }}
                                    </td>
                                    <td class="text-center">
                                        {{ contact.email }}
                                    </td>

                                    <td class="text-center">
                                        <div v-for="type in this.contactTypes" :key="type.id">
                                            <div v-if="contact.contactTypeId == type.id"> {{ type.value}}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-5 text-center">
                                        <BaseBtn rounded
                                            class="mr-2 border border-primary text-primary hover:bg-primary hover:text-white"
                                            @click="showFormModal(contact.id)">
                                            Edit
                                        </BaseBtn>
                                        <BaseBtn rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white"
                                            @click="contactToDelete(contact)">
                                            Delete
                                        </BaseBtn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex gap-4 justify-end sm:col-start-2 mr-10 mb-4 mt-4">
                        <button @click="this.$router.push('/companies')" class="w-m bg-red-600 py-2 px-4 rounded">Back
                            to
                            List</button>
                        <button class="w-m bg-gray-500 py-2 px-4 rounded"
                            v-bind:style="{ backgroundColor: changeColor }" @click="updateCompany()"
                            :disabled="isDisabled">
                            Save Company
                        </button>
                    </div>

                </div>
            </div>
        </BaseCard>
        <confirmation-modal
            v-if="modalIsOpen" 
            actionType="delete" titleText="Delete Contact" bodyText="Are you sure you want to delete this contact"
            @confirmation="(value) => deleteContact(value, contactSelectedToDelete)">
        </confirmation-modal>
    </div>
    <contact-form-modal 
        v-if="formModalIsOpen" :idCompany="this.$route.params.id" :contactId="contactId"
        @saveConfirmation="(value, contact) => saveContact(value, contact)" 
    >
    </contact-form-modal>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, email, minLength } from '@vuelidate/validators'
import CompanyService from '../../../services/company.service'
import ContactService from '../../../services/contact.service'
import ContactFormModal from '../contacts/ContactFormModal.vue'
import ConfirmationModal from '../../../components/ConfirmationModal.vue'
import { TOAST_DURATION } from '../../../util/constants'

export default {
    name: 'InfoCompany',
    data() {
        return {
            v$: useValidate(),
            id: '',
            name: '',
            email: '',
            phone: '',
            website: '',
            nda: '',
            msa: '',
            contacts: [],
            contactTypes: [],
            current: {
                name: '',
                email: '',
                phone: '',
                website: '',
                nda: '',
                msa: '',
            },
            modalIsOpen : false,
            formModalIsOpen: false,
            contactId: '',
            contactStatus: [],
            contactSelectedToDelete : {},
            timeOut : 1300
        }
    },
    components: {
        ContactFormModal,
        ConfirmationModal
    },
    methods: {
        async updateCompany() {
            var companyToUpdate = {
                id: this.id,
                name: this.name,
                email: this.email,
                phone: this.phone,
                webSite: this.website,
                nda: Boolean(this.nda),
                msa: Boolean(this.msa),
            }
            const response = await CompanyService.updateCompany(companyToUpdate)
            if (response.status == 200) {
                this.$toast.success("Updated Company.")
                setTimeout(() => this.$router.push('/companies'), 500)
            }
            if (response.status == 400) {
                this.$toast.error("Can't Updated Company.")
            }
        },
        async deleteContact(value, contact){
            if(!value){
                this.modalIsOpen = false
                this.contactSelectedToDelete = {}
                return 
            }
            const response = await ContactService.deleteContact(contact.id);

            if(response.status == 200){
                this.showToast("info", "Contact Deleted", TOAST_DURATION)
                this.refreshData();	//get only one user's contacts 
            }

            if(response.status == 404){
                this.showToast("error", "Contact Not Found", TOAST_DURATION)
            }

            if(response.status == 400){
                this.showToast("error", "Can't Deleted Contact", TOAST_DURATION)
            }
        },
        contactToDelete(contact){
            this.contactSelectedToDelete = contact
            this.modalIsOpen= true 
        },
        showToast(type, msg, time = 1000){
            //hide modal
            this.modalIsOpen = false
            this.$toast.open({
                type : type,
                message: msg,
                duration : time
            })
        },
        changes() {
            if (
                this.current.name != this.name ||
                this.current.email != this.email ||
                this.current.phone != this.phone ||
                this.current.website != this.website ||
                this.current.nda != this.nda ||
                this.current.msa != this.msa 
            ) {
                return true
            } else {
                return false
            }
        },
        showFormModal(contactId){
            this.formModalIsOpen = true
            this.contactId = contactId
        },
        saveContact(value, contact){
            if(!value)
                this.formModalIsOpen = false
            else if(contact && !contact.id){
                ContactService.addContact(contact).then (
                (result) => {
                    this.$toast.success("Add Contact.")
                    this.refreshData();
                    setTimeout(500)
                },
                (error) => {
                    this.$toast.error("Can't Add Contact.")
                }
            )
            }else{
                ContactService.updateContact(contact).then (
                (result) => {
                    this.$toast.success("Updated Contact.")
                    this.refreshData();
                    setTimeout(500)
                },
                (error) => {
                    this.$toast.error("Can't Update Contact.")
                }
            )
            }
            this.formModalIsOpen = false
        },
        refreshData(){
            ContactService.getAllByCompany(this.$route.params.id).then((response) => {
                this.contacts = response
            })
        }
    },
    validations() {
        return {
            name: {
                required: helpers.withMessage('Name is required', required),
                minLength: minLength(3),
            },
            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage(
                    'Email should be in this format: example@domain.com',
                    email
                ),
              
            },
            phone: {
                required: helpers.withMessage(
                    'Phone is required',
                    required
                ),
                minLength: minLength(6),
            },
            website: {
                required: helpers.withMessage('Website is required', required),

            }

        }
    },
    created() {

        CompanyService.getCompanyById(this.$route.params.id)
            .then((data) => {
                this.id = this.$route.params.id
                this.name = data.name
                this.email = data.email
                this.phone = data.phone,
                this.website = data.webSite,
                this.nda = data.nda,
                this.msa = data.msa

                //current data
                this.current.name = data.name
                this.current.email = data.email
                this.current.phone = data.phone,
                this.current.website = data.webSite,
                this.current.nda = data.nda,
                this.current.msa = data.msa

            })
        ContactService.getAllByCompany(this.$route.params.id).then((response) => {
            this.contacts = response
        })
        ContactService.getAllContactTypes().then((response) => {
            this.contactTypes = response
        })


    },
    computed: {
        isDisabled() {
            if (this.changes()) {
                this.v$.$validate()
                return this.v$.$error
            } else return true
        },
        changeColor() {
            this.v$.$validate()
            if (!this.v$.$error && this.changes()) {
                return this.color = 'green'
            } else {
                return
            }
        },
    },
}
</script>
<style scoped>
.container-session-v1 {
    display: flex;
    justify-content: center;
}

.sizeCard {
    width: 940px;
}

input {
    color: #000000;
}

select {
    color: #000000;
}

input[type=checkbox] {
    -webkit-appearance: none;
    height: 1.5em;
    width: 1.5em;
    cursor: pointer;
    position: relative;
    background-color: white;
}

input[type="checkbox"]:before,
input[type="checkbox"]:checked:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 1.5em;
    text-align: center;
    color: white;
}

input[type="checkbox"]:checked {
    background-color: #28a745;
}

input[type="checkbox"]:checked:before {
    content: '✔';
}
</style>
