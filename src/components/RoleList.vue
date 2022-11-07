<template>
    <div class="col-span-6 sm:col-span-3">
        <label for="" class="block text-md font-medium text-gray-700"
            >Roles
        </label>
        <div class="col-span-6 sm:col-span-3 items-center">
            <div class="flex gap-1">
                <select
                    :disabled="selectStatus"
                    id="role"
                    name="role"
                    autocomplete="role-name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    v-model="currentRole"
                >
                    <option
                        v-for="role in allRoles"
                        :key="role.id"
                        :value="role"
                    >
                        {{ role.name }}
                    </option>
                </select>
                <button
                    rounded
                    @click="addRole"
                    block
                    class="custom-btn rounded font-normal leading-4 ripple inline-block bg-info"
                >
                    Add
                </button>
            </div>
            <span v-if="v$.userRoles.$error">
                {{ v$.userRoles.$errors[0].$message }}
            </span>

            <div class="role-container h-auto min-h-8 mt-6">
                <ul class="role-list">
                    <li v-for="userRole in userRoles" :key="userRole.id">
                        <div class="role">
                            {{ userRole.name }}
                            <svg
                                @click="removeUserRole(userRole.id)"
                                xmlns="http://www.w3.org/2000/svg"
                                class="delete-icon"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

export default {
    name: 'RoleList',
    props: ['currentUserRolesProp', 'allRolesProp', 'userRolesProp'],
    data() {
        return {
            v$: useValidate(),
            currentRole: {},
            currentUserRoles: [],
            allRoles: [],
            userRoles: [],
        }
    },
    watch: {
        allRolesProp() {
            this.currentUserRoles = this.currentUserRolesProp
            this.allRoles = this.allRolesProp
            this.userRoles = this.userRolesProp

            this.removeRoleFromInput()
            this.sortRolesByName()
        },
    },
    methods: {
        removeUserRole(id) {
            this.allRoles.push(this.userRoles.filter((x) => x.id == id)[0])
            this.userRoles = this.userRoles.filter((x) => x.id != id)
            this.sortRolesByName()
            this.$emit('changeRoleList', this.userRoles)
        },
        addRole() {
            if (!this.currentRole.id) return

            this.userRoles.push(this.currentRole)
            this.currentRole = {}
            this.removeRoleFromInput()
            this.sortRolesByName()

            this.$emit('changeRoleList', this.userRoles)
        },
        removeRoleFromInput() {
            this.allRoles = this.allRoles.filter((rol) =>
                this.userRoles.every((u) => u.name !== rol.name)
            )
        },
        sortRolesByName() {
            this.allRoles.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                return 0
            })
        },
    },
    computed: {
        selectStatus() {
            return this.allRoles.length === 0 ? true : false
        },
    },
    validations() {
        return {
            userRoles: {
                required: helpers.withMessage(
                    'At least one role is required',
                    required
                ),
            },
        }
    },
}
</script>

<style>
.role-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.role {
    display: flex;
    gap: 0.1rem;
    background-color: #3b82f6;
    color: #fff;
    border-radius: 10px;
    padding: 0.2rem 0.4rem;
}

.delete-icon {
    width: 1.4rem;
    cursor: pointer;
}
</style>
