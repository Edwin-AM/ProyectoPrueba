<template>
    <div class="container-session-v1">
        <BaseCard noPadding class="overflow-hidden w-100 sizeCard">
            <div class="p-5">
                <h1 class="mb-3 text-xl">Add Company</h1>
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
                            class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="text"
                            placeholder="Website" />
                        <span v-if="v$.website.$error">
                            {{ v$.website.$errors[0].$message }}
                        </span>
                    </div>

                    <div class="mb-10">
                        <label class="mr-4">NDA</label>
                        <input  type="checkbox" v-model="nda" />
                    </div>

                    <div class="mb-10">
                        <label class="mr-4">MSA</label>
                        <input type="checkbox" v-model="msa" />
                    </div>

                    <div class="flex gap-4 justify-end sm:col-start-2">
                        <button @click="this.$router.push('/companies')"
                            class="w-full bg-red-600 py-2 px-4 rounded">Back to
                            List</button>
                        <button class="w-full bg-gray-500 py-2 px-4 rounded"
                            v-bind:style="{ backgroundColor: changeColor }" @click="saveCompany()"
                            :disabled="isDisabled">
                            Save Company
                        </button>
                    </div>
                </form>

            </div>
        </BaseCard>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, email, minLength } from '@vuelidate/validators'
import CompanyService from '../../../services/company.service'


export default {
    name: 'AddCompany',
    data() {
        return {
            v$: useValidate(),
            name: '',
            email: '',
            phone: '',
            website: '',
            nda: false,
            msa: false,

        }
    },

    methods: {
        saveCompany() {

            var company = {
                name: this.name,
                email: this.email,
                webSite: this.website,
                nda: this.nda,
                msa: this.msa,
                phone: this.phone
            }
            CompanyService.addCompany(company).then(
                (result) => {
                    this.$toast.success("Added Company.")
                    setTimeout(() => this.$router.push('/companies'), 500)
                },
                (error) => {
                    this.$toast.error("Can't Added Company.")
                }
            )
        },
        prueba() {
            console.log(this.nda);
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
                minLength: minLength(6),
            }

        }
    },
    created() {
        this.$toast.info('All fields are required.')

    },
    computed: {
        isDisabled() {
            this.v$.$validate()
            return this.v$.$error
        },
        changeColor() {
            this.v$.$validate()
            if (!this.v$.$error) {
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
