<template>
    <div class="container-session-v1">
        <BaseCard noPadding class="overflow-hidden sizeCard">
            <div class="col-span-1 lg:col-span-1">
                    <div class="p-5">
                        <h1 class="mb-3 text-lg">Add Role</h1>
                        <form action="">
                            <div class="mb-3">
                                <input
                                    v-model="name"
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="text"
                                    placeholder="Name"
                                />
                                <span v-if="v$.name.$error">
                                        {{ v$.name.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="mb-3">
                                <textarea
                                    v-model="description"
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="text"
                                    placeholder="Description"
                                ></textarea>
                                <span v-if="v$.description.$error">
                                        {{ v$.description.$errors[0].$message }}
                                </span>
                            </div>    
                            <div class="mb-3">                        
                            <BaseBtn
                                rounded
                                block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-light text-white mb-3"
                                :disabled='isDisabled'
                                @click="addRole()"
                                v-bind:style="{backgroundColor:changeColor}"
                                >Add Role
                            </BaseBtn>
                            <BaseBtn
                                rounded
                                block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 bg-danger text-white"
                                @click="this.$router.push('/roles')" 
                                >Back to List
                            </BaseBtn>
                            </div>  
                        </form>
                    </div>
                </div>
        </BaseCard>
    </div>
</template>

<script>
import RoleService from '../../../services/role.services'
import useValidate from "@vuelidate/core";
import { helpers, required, minLength } from "@vuelidate/validators";

export default {
    name: 'AddRole',
    data() {
        return {
            v$ : useValidate(),
            name: '',
            description: '',
            color : ''
        }
    },
    methods: {
        async addRole() {
            var role = {
                name: this.name,
                description: this.description,
            }
            
            const response = await RoleService.addRole(role)
            
            if(response.status == 200){
                this.$toast.success("Added Role.")
                setTimeout(() => this.$router.push('/roles'),500)
            }

            if(response.status == 400){
                this.$toast.error(response.data)
            }
        },
    },
    validations(){
        return{
            name: {
                required: helpers.withMessage("Name is required", required),
                minLength: minLength(5)
            },
            description: {
                required: helpers.withMessage("Description is required", required),
                minLength: minLength(5)
            }
        }
    },
    created(){
        this.$toast.info("All fields are required.")
    },
    computed:{
        isDisabled(){
            this.v$.$validate()
            return this.v$.$error
        },
        changeColor(){
            this.v$.$validate()
            if(!this.v$.$error){
                return this.color = 'green'
            }else{
                return 
            }
        }
    }
}
</script>
<style scoped>
    .container-session-v1{
        display: flex;
        justify-content: center;
    }
    .sizeCard{
        width: 500px;
    }
    input{
        color:#000000;
    }
    textarea {
        resize: none;
        color:#000000;
    }
</style>