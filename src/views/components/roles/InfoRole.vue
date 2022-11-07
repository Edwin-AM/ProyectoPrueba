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
                            Role Information
                        </h3>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form @submit.prevent>
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="name"
                                            class="block text-sm font-medium text-gray-700"
                                            >Name</label
                                        >
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autocomplete="given-name"
                                            v-model="name"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <span v-if="v$.name.$error">
                                            {{ v$.name.$errors[0].$message }}
                                        </span>
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="description"
                                            class="block text-sm font-medium text-gray-700"
                                            >Description</label
                                        >
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            autocomplete="family-name"
                                            v-model="description"
                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <span v-if="v$.description.$error">
                                            {{ v$.description.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="px-4 py-3 bg-gray-50 text-right sm:px-6"
                            >
                                <button
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
                                    :disabled="isDisabled"
                                    @click.prevent="updateRole()"
                                    v-bind:style="{
                                        backgroundColor: changeColor,
                                    }"
                                >
                                    Save
                                </button>
                                <button
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-danger hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="this.$router.push('/roles')"
                                >
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
    </div>
</template>

<script>
import RoleService from '../../../services/role.services'
import useValidate from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'

export default {
    name: 'InfoRole',
    data() {
        return {
            v$: useValidate(),
            id: '',
            name: '',
            description: '',
            current: {
                name: '',
                description: '',
            },
        }
    },
    created() {
        RoleService.getRoleById(this.$route.params.id)
            .then((data) => {
                this.titleName = data.name
                this.id = this.$route.params.id
                this.name = data.name
                this.description = data.description
                //current data
                this.current.name = this.name
                this.current.description = this.description
            })
    },
    methods: {
        async updateRole() {
            let role = {
                id: this.id,
                name: this.name,
                description: this.description,
            }

             const response = await RoleService.updateRole(role)

             if(response.status == 200){
                this.$toast.success("Updated Role.")
                setTimeout(() => this.$router.push('/roles'), 500)
            }

            if(response.status == 404){
                this.$toast.error("Role Not Found.")
            }

            if(response.status == 400){
                this.$toast.error("Can't Update Role.")
            }

        },
        changes() {
            if (
                this.current.name != this.name ||
                this.current.description != this.description
            ) {
                return true
            } else {
                return false
            }
        },
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
            name: {
                required: helpers.withMessage('Role name is required', required),
                minLength: minLength(5),
            },
            description: {
                required: helpers.withMessage('Description is required', required),
                minLength: minLength(5),
            }
        }
    }
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