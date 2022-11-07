<template>
    <div class="container-session-v1">
        <BaseCard noPadding class="overflow-hidden sizeCard">
            <div class="col-span-1 lg:col-span-1">
                    <div class="p-5">
                        <h1 class="mb-3 text-lg">Add User</h1>
                        <form action="">
                            <div class="mb-3">
                                <input
                                    v-model="userName"
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="text"
                                    placeholder="Username"
                                />
                                <span v-if="v$.userName.$error">
                                        {{ v$.userName.$errors[0].$message }}
                                </span>
                            </div>
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
                                <input
                                    v-model="surName"
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="text"
                                    placeholder="Surname"
                                />
                                <span v-if="v$.surName.$error">
                                        {{ v$.surName.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="mb-3">
                                <input
                                    v-model="email"
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="email"
                                    placeholder="Email"
                                />
                                <span v-if="v$.email.$error">
                                        {{ v$.email.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="mb-3">
                                <input
                                    v-model="password"
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="password"
                                    placeholder="Password"
                                />
                                <span v-if="v$.password.$error">
                                        {{ v$.password.$errors[0].$message }}
                                </span>
                            </div>
                            <div class="mb-3">
                                <input
                                    v-model="retypePassword"  
                                    class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full"
                                    type="password"
                                    placeholder="Retype Password"
                                />
                                <span v-if="v$.retypePassword.$error">
                                        {{ v$.retypePassword.$errors[0].$message }}
                                </span>
                            </div>    
                            <div class="mb-3">                        
                            <BaseBtn
                                rounded
                                block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 px-5 bg-light text-white mb-3"
                                :disabled='isDisabled'
                                @click="addUser()"
                                v-bind:style="{backgroundColor:changeColor}"
                                >Add User
                            </BaseBtn>
                            <BaseBtn
                                rounded
                                block
                                class="class=btn rounded font-normal leading-4 ripple inline-block xl py-2 bg-danger text-white"
                                @click="this.$router.push('/users')" 
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
import UserService from '../../../services/user.services'
import useValidate from "@vuelidate/core";
import { helpers, required, email, minLength, sameAs } from "@vuelidate/validators";

export default {
    name: 'addUser',
    data() {
        return {
            v$ : useValidate(),
            userName: '',
            name: '',
            surName: '',
            email: '',
            password : '',
            retypePassword: '',
            color : ''
        }
    },
    methods: {
        addUser() {
            var user = {
                userName: this.userName,
                name: this.name,
                surName: this.surName,
                email: this.email,
                password: this.password,
            }
            UserService.addUser(user).then (
                (result) => {
                    this.$toast.success("Added User.")
                    setTimeout(() => this.$router.push('/users'),500)
                },
                (error) => {
                    this.$toast.error("Can't Added User.")
                }
            )
        },
    },
    validations(){
        return{
            userName: {
                required: helpers.withMessage("Username is required", required),
                minLength: minLength(3)
            },
            name: {
                required: helpers.withMessage("Name is required", required),
                minLength: minLength(3)
            },
            surName: {
                required: helpers.withMessage("Surname is required", required),
                minLength: minLength(3)
            },
            email: {
                required: helpers.withMessage("Email is required", required),
                email: helpers.withMessage("Email should be in this format: example@domain.com", email)
            },
            password : {
                required: helpers.withMessage("Password is required", required)
            }, 
            retypePassword: {
                required: helpers.withMessage("Retype Password is required", required), 
                sameAs: helpers.withMessage("Passwords don't match", sameAs(this.password))
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
</style>