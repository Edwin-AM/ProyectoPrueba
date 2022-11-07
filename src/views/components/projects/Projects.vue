<template>
    <div class="col-span-12">
        <BaseCard>
            <template v-slot:cardHeader>
                <div class="card-header">
                    <div class="card-title py-3 font-bold text-4xl">Company's Projects</div>
                    <BaseBtn
                        rounded
                        class="border border-success text-success hover:bg-success hover:text-white mr-5"  
                        @click="showFormModal('')" 
                    >Add Project</BaseBtn> 
                    <BaseBtn
                        rounded
                        class="border border-danger text-danger hover:bg-danger hover:text-white"  
                        @click="this.$router.back()" 
                    >Back</BaseBtn>
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
                                        class="text-center border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Description
                                    </th>
                                    <th
                                        class="text-center border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Start date
                                    </th>
                                    <th
                                        class="text-center border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        End date
                                    </th>
                                    <th
                                        class="text-center border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Net
                                    </th>
                                    <th
                                        class="text-center border-b pb-3 mb-3 text-gray-500 font-semibold"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class="hover:bg-gray-100 cursor-pointer table-row"
                                    v-for="project in projects"
                                    :key="project.id"
                                >
                                    <td class="text-center">
                                        {{ project.description }}
                                    </td>
                                    <td class="text-center">
                                        {{ formatDate(project.startDate) }}
                                    </td>
                                    <td class="text-center">
                                        {{  formatDate(project.endDate) }}
                                    </td>
                                    <td class="text-center">
                                        {{getNetType(project.netId)}}
                                    </td>
                                    <td class="py-5 text-center">
                                        <BaseBtn @click="showFormModal(project.id)" 
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white mr-2"
                                        >
                                            View
                                        </BaseBtn>
                                        <BaseBtn
                                            rounded
                                            class="border border-primary text-primary hover:bg-primary hover:text-white"
                                            @click="projectToDelete(project)" 
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
                actionType="delete" titleText="Delete project" bodyText="Are you sure you want to delete this project?"
                @confirmation="(value) => deleteProject(value, projectSelectedToDelete.id)">
            </confirmation-modal>
        </BaseCard>
    </div>
    <project-form-modal 
        v-if="formModalIsOpen" :rateList="rateList" :idCompany="idCompany" :projectId="projectId"
        @saveConfirmation="(value, project) => saveProject(value, project)"    
    >
    </project-form-modal>
</template>

<script>
import ConfirmationModal from '../../../components/ConfirmationModal.vue'
import ProjectServices from '../../../services/project.services'
import ProjectFormModal from './ProjectFormModal.vue'
import RateService from '../../../services/rate.services'
import {
    TIME_FORMAT
} from './../../../util/constants'

export default {
    name: 'Project',
    data() {
        return {
            projects: [],
            netList: [],
            net: '',
            modalIsOpen : false,
            projectSelectedToDelete : {},
            idCompany: this.$route.params.id,
            //saveProject
            projectId:'',
            formModalIsOpen: false,
            rateList:[]


        }
    },
    components: {
        ConfirmationModal,
        ProjectFormModal
    },
    created() {
        ProjectServices.getProjectsByIdCompany(this.idCompany).then((response) => {
            this.projects = response
        })

        RateService.getRateByCompany(this.idCompany).then((response) => {
            this.rateList = response
        })

        ProjectServices.getAllNets().then((data) => {
                this.netList = data
            })
    },

    methods :{
        formatDate: (date) => new Intl.DateTimeFormat(TIME_FORMAT).format(new Date(date)),
        async deleteProject(value, id){
            if(!value){
                this.modalIsOpen = false
                this.projectSelectedToDelete = {}
                return
            }
        const response = await ProjectServices.deleteProject(id)

            if(response.status == 200){
                this.showToast("success", "Project Deleted", 1300)
                this.updateProjectTable()
            }

            if(response.status == 404){
                this.showToast("error", "Project Not Found", 1300)
            }

            if(response.status == 400){
                this.showToast("error", "Can't Delete Project", 1300)
            }
        },

        projectToDelete(project){
            this.projectSelectedToDelete = project
            this.modalIsOpen= true
        },

        updateProjectTable() {
            ProjectServices.getProjectsByIdCompany(this.idCompany).then((res) => (this.projects = res))
        },

        showToast(type, msg, time = 1000){
            this.modalIsOpen = false
            this.$toast.open({
                type : type,
                message: msg,
                duration : time
            })
        },
        showFormModal(projectId){
            this.formModalIsOpen = true
            this.projectId = projectId
        },
        saveProject(value, project){
            if(!value)
                this.formModalIsOpen = false
            else if(project && !project.id){
                ProjectServices.addProject(project).then (
                (result) => {
                    this.$toast.success("Add Project.")
                    this.refreshData();
                    setTimeout(500)
                },
                (error) => {
                    this.$toast.error("Can't Add Project.")
                }
            )
            }else{
                ProjectServices.updateProject(project).then (
                (result) => {
                    this.$toast.success("Updated Project.")
                    this.refreshData();
                    setTimeout(500)
                },
                (error) => {
                    this.$toast.error("Can't Update Project.")
                }
            )
            }
            this.formModalIsOpen = false
        },

        refreshData(){
            ProjectServices.getProjectsByIdCompany(this.idCompany).then((response) => {
                this.projects = response
            })
        },
        getNetType(netId){
            this.netList.every(v => {
                if (v.id==netId) {
                    this.net = v.value
                    return false;
                }
                return true;
            })
            return this.net
        }
    },
}
</script>