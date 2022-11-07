<template>
    <div class="col-span-12">
        <BaseCard>
            <template v-slot:cardHeader>
                <div class="card-header">
                    <div class="card-title py-3 font-bold text-4xl">Users</div>
                    <BaseBtn
                        rounded
                        class="border border-success text-success hover:bg-success hover:text-white"  
                        @click="this.$router.push(`${this.$route.path}/adduser`)" 
                    >Add User</BaseBtn>
                </div>
            </template>
            <div
                class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
            >
                <div
                    class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
                >
                    <div
                        class="dataTable-container  block w-full overflow-x-auto whitespace-nowrap borderless hover"
                    >
                        <table
                            class=" table-3 dataTable-table max-w-full w-full"
                        >
                            <thead>
                                <tr class="">
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-bold"   
                                    >
                                        Username
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-bold"   
                                    >
                                        Name
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-bold" 
                                    >
                                        Surname
                                    </th>
                                    <th
                                        class="text-left border-b pb-3 mb-3 text-gray-500 font-bold" 
                                    >
                                        Email
                                    </th>
                                    <th
                                        class="text-center border-b pb-3 mb-3 text-gray-500 font-bold" 
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class=" hover:bg-gray-100 cursor-pointer table-row" 
                                    v-for="user in users"
                                    :key= "user.id" 
                                >
                                    <td class="text">
                                        {{ user.userName }}
                                    </td>

                                    <td class="text">
                                       {{ user.name }}
                                    </td>
                                    <td class="text">
                                        {{ user.surname }}
                                    </td>
                                    <td class="text"> {{ user.email }}</td>
                                    <td class="py-5 text-center">
                                        <BaseBtn
                                            rounded
                                            class="mr-2 border border-primary text-primary hover:bg-primary hover:text-white"  
                                            @click="this.$router.push(`${this.$route.path}/${user.id}`)"
                                        >
                                            View
                                        </BaseBtn>
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white" 
                                            @click="userToDelete(user)" 
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
                            Showing 1 to 5 of 5 entries
                        </div>
                        <nav class="dataTable-pagination">
                            <ul class="dataTable-pagination-list"></ul>
                        </nav>
                    </div>
                </div>
            </div>
            <confirmation-modal
                v-if="modalIsOpen"
                actionType="delete" titleText="Delete User" bodyText="Are you sure you want to delete this user" :itemName="userSelectedToDelete.userName"
                @confirmation="(value) => deleteUser(value, userSelectedToDelete.id)">
            </confirmation-modal>
        </BaseCard>
    </div>
</template>

<script>
    import ConfirmationModal from './../../../components/ConfirmationModal.vue'
    import UserService from '../../../services/user.services'
    export default{
        
        data(){
            return{
                users:[],
                modalIsOpen : false,
                userSelectedToDelete : {}
            }

        },

        components: {
            ConfirmationModal
        },

        created(){
           UserService.getUsers().then((response)=>{
            this.users = response
           })
        },

        methods :{
            async deleteUser(value, id){
                if(!value){
                    this.modalIsOpen = false
                    this.userSelectedToDelete = {}
                    return
                }

                const response = await UserService.deleteUser(id)

                if(response.status == 200){
                    this.showToast("info", "User Deleted", 1300)
                    this.updateUserTable()
                }

                if(response.status == 404){
                    this.showToast("error", "User Not Found", 1300)
                }

                if(response.status == 400){
                    this.showToast("error", "Can't Deleted User", 1300)
                }
            },

            userToDelete(user){
                this.userSelectedToDelete = user
                this.modalIsOpen= true
            },

            updateUserTable(){
              UserService.getUsers().then(res => this.users = res)
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
    }

</script>
