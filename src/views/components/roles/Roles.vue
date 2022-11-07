<template>
    <div class="col-span-12">
        <BaseCard>
            <template v-slot:cardHeader>
                <div class="card-header">
                    <div class="card-title py-3 font-bold text-4xl">System Roles</div>
                    <BaseBtn
                        rounded
                        class="border border-success text-success hover:bg-success hover:text-white"  
                        @click="this.$router.push(`${this.$route.path}/addrole`)" 
                    >Add Role</BaseBtn>
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
                                        Description
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
                                    v-for="role in roles"
                                    :key="role.id"
                                >
                                    <td>
                                        {{ role.name }}
                                    </td>
                                    <td>
                                        {{ role.description }}
                                    </td>
                                    <td class="py-5">
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white mr-2"
                                            @click="this.$router.push(`${this.$route.path}/${role.id}`)"
                                        >
                                            View
                                        </BaseBtn>
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white"
                                            @click="roleToDelete(role)"
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
                actionType="delete" titleText="Delete Role" bodyText="Are you sure you want to delete this role" :itemName="roleSelectedToDelete.name"
                @confirmation="(value) => deleteRole(value, roleSelectedToDelete.id)">
            </confirmation-modal>
        </BaseCard>
    </div>
</template>

<script>
import ConfirmationModal from './../../../components/ConfirmationModal.vue'
import RoleService from '../../../services/role.services'
export default {
    name: 'Role',
    data() {
        return {
            roles: [],
            modalIsOpen: false,
            roleSelectedToDelete: {},
        }
    },
    components: {
        ConfirmationModal,
    },
    methods: {
        async deleteRole(value, id) {
            if (!value) {
                this.modalIsOpen = false
                this.roleSelectedToDelete = {}
                return
            }

            const response = await RoleService.deleteRole(id)

            if (response.status == 200) {
                this.showToast('info', 'Role deleted', 1300)
                this.updateRoleTable()
            }

            if (response.status == 404) {
                this.showToast('error', 'Role not found', 1300)
            }
        },

        roleToDelete(role) {
            this.roleSelectedToDelete = role
            this.modalIsOpen = true
        },

        updateRoleTable() {
            RoleService.getRoles().then((res) => (this.roles = res))
        },

        showToast(type, msg, time = 1000) {
            //hide modal
            this.modalIsOpen = false
            this.$toast.open({
                type: type,
                message: msg,
                duration: time,
            })
        },
    },
    created() {
        RoleService.getRoles().then((response) => {
            this.roles = response
        })
    },
}
</script>