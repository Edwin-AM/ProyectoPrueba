<template>
    <div
        class="auth-layout-wrap flex justify-center min-h-screen flex-col bg-cover items-center"
        style="background-image: url(../../images/dog.jpg)"
    >
        <div class="container-session-v1 max-w-2xl">
            <BaseCard noPadding class="overflow-hidden">
                <div class="grid grid-cols-12">
                    <div class="col-span-12">
                        <div class="p-5">
                            <h1 class="mb-3 text-lg">Sign In</h1>
                            <form @submit.prevent="handleLogin">
                                <div class="mb-3">
                                    <label class="text-xs text-gray-600" for=""
                                        >Username</label
                                    >
                                    <input
                                        v-model="username"
                                        class="text-dark w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label class="text-xs text-gray-600" for=""
                                        >Password</label
                                    >
                                    <input
                                        v-model="password"
                                        class="text-dark w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div class="mb-4">
                                    <BaseBtn
                                        type="submit"
                                        block
                                        class="bg-purple-500 mb-2 text-white rounded-full"
                                        v-show="btnShow"
                                        @click="showButton"
                                        >Sign In
                                    </BaseBtn>
                                    <span
                                        v-show="spanShow"
                                    >
                                        <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
                                    </span>
                                    <BaseBtn
                                        block
                                        class="bg-purple-500 mb-2 text-white rounded-full"
                                        >Create an account</BaseBtn
                                    >
                                </div>
                                <div class="text-center">
                                    <a
                                        class="hover:text-purple-500 underline text-gray-600"
                                        href="#"
                                        >Forgot Password?</a
                                    >
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script>
//import clipLoader from 'vue-spinner/src/clipLoader.vue'
// import { decryptToken } from '../../auth/jwt/jwtHandler'
export default {
    name: 'SignIn',
    data() {
        return {
            username: '',
            password: '',
            spanShow: false,
            btnShow: true
        }
    },
    components:{
        //clipLoader
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/dashboards')
        }
    },
    methods: {
        handleLogin() {
            var auth = {
                username: this.username,
                password: this.password,
            }
            this.$store.dispatch('auth/login', auth).then((response) => {
                this.$router.push('/dashboards')
            },(error)=>{
                this.$toast.error("Login failed.")
                this.spanShow = false
                this.btnShow = true

            })
        },
        showButton(){
            this.spanShow = true
            this.btnShow = false
        }
    },
}
</script>
