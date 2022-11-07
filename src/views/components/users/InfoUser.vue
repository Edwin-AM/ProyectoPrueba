<template>
    <div class="profile-container">
        <h2>{{ titleName }}</h2>
        <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
                <div class="border-t border-gray-200" />
            </div>
        </div>

        <div class="mt-10 sm:mt-0">
            <div class="">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Personal Information
                        </h3>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form @submit.prevent>
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="first-name"
                                            class="block text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" name="name" id="name" autocomplete="given-name"
                                            v-model="name"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        <span v-if="v$.name.$error">
                                            {{ v$.name.$errors[0].$message }}
                                        </span>
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="Surname"
                                            class="block text-sm font-medium text-gray-700">Surname</label>
                                        <input type="text" name="Surname" id="Surname" autocomplete="family-name"
                                            v-model="surname"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        <span v-if="v$.surname.$error">
                                            {{ v$.surname.$errors[0].$message }}
                                        </span>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="username"
                                            class="block text-sm font-medium text-gray-700">Username</label>
                                        <input type="text" name="username" id="username" v-model="userName"
                                            autocomplete="username"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        <span v-if="v$.userName.$error">
                                            {{
                                            v$.userName.$errors[0].$message
                                            }}
                                        </span>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="email-address"
                                            class="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" name="email-address" id="email-address" v-model="email"
                                            autocomplete="email"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        <span v-if="v$.email.$error">
                                            {{ v$.email.$errors[0].$message }}
                                        </span>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="creationDate"
                                            class="block text-sm font-medium text-gray-700">Creation Date</label>
                                        <p class="text-stone-500 text-sm">
                                            {{ creationDate }}
                                        </p>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="modificationDate"
                                            class="block text-sm font-medium text-gray-700">Modification Date
                                        </label>
                                        <p class="text-stone-500 text-sm">
                                            {{ modificationDate }}
                                        </p>
                                    </div>
                                    <!-- Role section -->
                                    <role-list :allRolesProp="allRoles" :currentUserRolesProp="
                                        current.currentUserRoles
                                    " :userRolesProp="userRoles" @changeRoleList="changeRoleList">
                                    </role-list>
                                </div>
                            </div>
                            <div class="px-4 sm:px-0">
                                <h3 class="text-lg font-medium leading-6 text-gray-900">
                                    Contract Information
                                </h3>
                            </div>
                            <div
                                class="dataTable-container  block w-full overflow-x-auto whitespace-nowrap borderless hover">
                                <table class=" table-3 dataTable-table max-w-full w-full">
                                    <thead>
                                        <tr class="">
                                            <th class="text-left border-b pb-3 mb-3 text-gray-500 font-bold">
                                                Contract Name
                                            </th>
                                            <th class="text-left border-b pb-3 mb-3 text-gray-500 font-bold">
                                                Status
                                            </th>
                                            <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                                Start Date
                                            </th>
                                            <th class="text-center border-b pb-3 mb-3 text-gray-500 font-bold">
                                                End Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class=" hover:bg-gray-100 cursor-pointer table-row"
                                            v-for="contract in contracts" :key="contract.id">
                                            <td class="text">
                                                {{ contract.name }}
                                            </td>
                                            <td class="text">
                                                <div v-for="status in this.contractStatus" :key="status.id">
                                                    <div v-if="contract.contractStatusId == status.id"> {{ status.value}}
                                                </div>
                                                </div> 
                                            </td>
                                            <td class="text-center">
                                                {{ contract.startDate.split("T")[0]}}
                                            </td>
                                            <td class="text-center">
                                                {{ contract.finalDate.split("T")[0]}}
                                            </td>
                                            <td class="py-5 text-center">
                                                <BaseBtn rounded
                                                    class="mr-2 border border-primary text-primary hover:bg-primary hover:text-white"
                                                    @click="this.$router.push(`${this.$route.path}/contract/${contract.id}`)">
                                                    Edit
                                                </BaseBtn>
                                                <BaseBtn rounded
                                                    class="border border-primary text-primary hover:bg-primary hover:text-white"
                                                    @click="contractToDelete(contract)">
                                                    Delete
                                                </BaseBtn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="dataTable-bottom">
                                <div class="dataTable-info">
                                    Showing 1 to 5 of 5 entries
                                </div>
                                <nav class="dataTable-pagination">
                                    <ul class="dataTable-pagination-list"></ul>
                                </nav>
                            </div>


                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
                                    @click="this.$router.push(`${this.$route.path}/AddContract`)" v-bind:style="{
                                        backgroundColor: 'rgb(59, 130, 246)',
                                    }">
                                    New Contract
                                </button>
                                <button
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
                                    :disabled="isDisabled" @click.prevent="updateUser()" v-bind:style="{
                                        backgroundColor: changeColor,
                                    }">
                                    Save
                                </button>
                                <button
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-danger hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="this.$router.push('/users')">
                                    Back to List
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
                <div class="border-t border-gray-200" />
            </div>
        </div>
        <confirmation-modal
            v-if="modalIsOpen"
            actionType="delete" titleText="Delete Contract" bodyText="Are you sure you want to delete this contract" :itemName="contractSelectedToDelete.contractRate"
            @confirmation="(value) => deleteContract(value, contractSelectedToDelete.id)">
        </confirmation-modal>
    </div>
</template>

<script>
import UserService from '../../../services/user.services'
import RoleService from '../../../services/role.services'
import useValidate from '@vuelidate/core'
import { helpers, required, email, minLength } from '@vuelidate/validators'
import RoleList from '../../../components/RoleList.vue'
import contractService from '../../../services/contract.services'
import ConfirmationModal from './../../../components/ConfirmationModal.vue'

export default {
    name: 'InfoUser',
    data() {
        return {
            v$: useValidate(),
            id: '',
            name: '',
            surname: '',
            userName: '',
            email: '',
            creationDate: '',
            modificationDate: '',
            bttnColor: '',
            titleName: '',
            current: {
                name: '',
                surname: '',
                userName: '',
                email: '',
                currentUserRoles: [],
            },
            allRoles: [],
            userRoles: [],
            currentRole: {},
            idRoleList: [],
            contracts: [],
            contractStatus: [],
            modalIsOpen : false,
            contractSelectedToDelete : {}
        }

    },
    components: {
        RoleList,
    },

    created() {
        contractService.getContractsByUserId(this.$route.params.id).then((response) => {
            this.contracts = response
        })
        contractService.getAllContractStatus().then((response) => {
            this.contractStatus = response

        })
        UserService.getUserById(this.$route.params.id)
            .then((data) => {
                this.titleName = data.name + ' ' + data.surname
                this.id = this.$route.params.id
                this.name = data.name
                this.surname = data.surname
                this.userName = data.userName
                this.email = data.email
                this.creationDate = data.creationDate
                this.modificationDate = data.modificationDate

                //current data
                this.current.name = this.name
                this.current.surname = this.surname
                this.current.userName = this.userName
                this.current.email = this.email
                this.userRoles = JSON.parse(JSON.stringify(data.roles))
                this.current.currentUserRoles = JSON.parse(
                    JSON.stringify(data.roles)
                )
            })
            .then(() => {
                RoleService.getRoles().then((data) => {
                    this.allRoles = data
                })
            })

    },
    methods: {
        changeRoleList(userRoleArg) {
            this.userRoles = userRoleArg
        },
        async updateUser() {

            this.userRoles.forEach(role => {
                this.idRoleList.push(role.id)
            });

            let user = {
                id: this.id,
                userName: this.userName,
                name: this.name,
                surname: this.surname,
                email: this.email,
                roles: this.idRoleList
            }

            const response = await UserService.updateUser(user)

            if (response.status == 200) {
                this.$toast.success("Updated User.")
                setTimeout(() => this.$router.push('/users'), 500)
            }

            if (response.status == 404) {
                this.$toast.error("User Not Found.")
            }

            if (response.status == 400) {
                this.$toast.error("Can't Updated User.")
            }

        },
        compareRoleLists(currentRoles, userRoles) {
            if (currentRoles.length != userRoles.length) return false
            for (const rol of currentRoles) {
                if (!userRoles.find((x) => x.name == rol.name)) return false
            }
            return true
        },
        changes() {
            if (
                this.current.name != this.name ||
                this.current.surname != this.surname ||
                this.current.userName != this.userName ||
                this.current.email != this.email ||
                !this.compareRoleLists(
                    this.current.currentUserRoles,
                    this.userRoles
                )
            ) {
                return true
            } else {
                return false
            }
        },
        
        async deleteContract(value, id){
            if(!value){
                this.modalIsOpen = false
                this.contractSelectedToDelete = {}
                return
            }

            const response = await contractService.deleteContract(id)

            if(response.status == 200){
                this.showToast("info", "Contract Deleted", 1300)
                this.updateContractTable(this.id)	//get only one user's contracts 
            }

            if(response.status == 404){
                this.showToast("error", "Contract Not Found", 1300)
            }

            if(response.status == 400){
                this.showToast("error", "Can't Deleted Contract", 1300)
            }
        },

        contractToDelete(contract){
            this.contractSelectedToDelete = contract
            this.modalIsOpen= true 
        },


        updateContractTable(userId){
            contractService.getContractsByUserId(userId).then(res => this.contracts = res)
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
                return (this.bttnColor = 'green')
            } else {
                return
            }
        },
    },
    validations() {
        return {
            userName: {
                required: helpers.withMessage('Username is required', required),
                minLength: minLength(3),
            },
            name: {
                required: helpers.withMessage('Name is required', required),
                minLength: minLength(3),
            },
            surname: {
                required: helpers.withMessage('Surname is required', required),
                minLength: minLength(3),
            },
            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage(
                    'Email should be in this format: example@domain.com',
                    email
                ),
            },
        }
    },
    components: { RoleList, ConfirmationModal },
}
</script>

<style>
.custom-btn {
    width: 5rem;
    color: #fff;
}

.profile-container {
    max-width: 52rem;
    margin: 0 auto;
}
</style>
