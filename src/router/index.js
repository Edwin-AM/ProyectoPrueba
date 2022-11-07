import {
    AUTHENTICATED_USER,
    COMPANY_MANAGEMENT,
    USER_MANAGEMENT,
    ROLE_MANAGEMENT
} from '../util/Role/constants'
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import SignIn from '../views/sessions/SignIn.vue'
//USERS
import Users from '../views/components/users/Users.vue'
import AddUser from '../views/components/users/AddUser.vue'
import InfoUser from '../views/components/users/InfoUser.vue'
//ROLES
import Roles from '../views/components/roles/Roles.vue'
import AddRole from '../views/components/roles/AddRole.vue'
import InfoRole from '../views/components/roles/InfoRole.vue'
//COMPANIES
import Companies from '../views/components/companies/Companies.vue'
import AddCompany from '../views/components/companies/AddCompany.vue'
import InfoCompany from '../views/components/companies/InfoCompany.vue'
//PROJECTS
import Project from '../views/components/projects/Projects.vue'
//RATES
import Rate from '../views/components/rates/Rates.vue'
//CONTRACTS
import AddContract from '../views/components/contracts/AddContract.vue'
import EditContract from '../views/components/contracts/EditContract.vue'

const routes = [{
        path: '/',
        name: 'SignIn',
        component: () => import('../layout/index.vue'),
        redirect: '/signIn',
        meta: {
            title: 'SignIn',
        },

        children: [{
                path: '/dashboards',
                name: 'Dashboards',
                component: () => import('../views/dashboards/index.vue'),
                meta: {
                    title: 'Dashboard',
                    role: AUTHENTICATED_USER,
                },
                children: [{
                    path: 'dashboard-version-one',
                    name: 'dashboard-version-one',
                    component: () =>
                        import('../views/dashboards/Dashboards.v1.vue'),
                }, ],
            },
            //User Routes
            {
                path: '/users',
                component: Users,
                meta: {
                    title: 'Users',
                    role:  USER_MANAGEMENT,
                    breadcrumb: [
                        {name: 'Users'}
                    ]
                },
            },
            {
                path: '/users',
                component: () => import('../views/components/users/index.vue'),
                meta: {
                    title: 'Users',
                    role:  USER_MANAGEMENT,
                    breadcrumb: [
                        {name: 'Users'}
                    ]
                },
                children : [
                    {
                        path : "adduser",
                        component: AddUser,
                        meta: {
                            role:  USER_MANAGEMENT,
                            breadcrumb: [
                                {name: 'Add User'}
                            ]
                        },
                    },
                    {
                        path: ':id',
                        component: InfoUser,
                        meta: {
                            role:  USER_MANAGEMENT,
                            breadcrumb: [
                                {name: 'Update User'}
                            ]
                        },
                    },
                    {
                        path : ":id",
                        component: () => import('../views/components/index.vue'),
                        meta: {
                            role: USER_MANAGEMENT,
                        },
                        //Contract Routes 
                        children:[
                            {
                                path: 'addContract',
                                component: AddContract,
                                meta: {
                                    title: 'AddContract',
                                    role:  USER_MANAGEMENT,
                                    breadcrumb: [
                                        {name: 'AddContract'}
                                    ],
                                },
                            },{
                                path: 'contract/:id',
                                component: EditContract,
                                meta: {
                                    role: USER_MANAGEMENT,
                                    breadcrumb: [
                                        {name: 'EditContract'}
                                    ]
                                },
                            }
                        ]
                    } 
                ]
            },
            //Role Routes
            {
                path: '/roles',
                component: Roles,
                meta: {
                    title: 'Roles',
                    role: ROLE_MANAGEMENT,
                    breadcrumb: [
                        {name: 'Roles'}
                    ]
                },
            },
            {
                path: '/roles',
                component: () => import('../views/components/roles/index.vue'),
                meta: {
                    title: 'Roles',
                    role: ROLE_MANAGEMENT,
                    breadcrumb: [
                        {name: 'Roles'}
                    ]
                },
                children : [
                    {
                        path: 'addrole',
                        component: AddRole,
                        meta: {
                            role: ROLE_MANAGEMENT,
                            breadcrumb: [
                                {name: 'Add Role'}
                            ]
                        },
                    },
                    {
                        path: ':id',
                        component: InfoRole,
                        meta: {
                            role: ROLE_MANAGEMENT,
                            breadcrumb: [
                                {name: 'Update Role'}
                            ]
                        },
                    },
                ]
            },
            //Company Routes
            {
                path: '/companies',
                component: Companies,
                meta: {
                    title: 'Companies',
                    role: COMPANY_MANAGEMENT,
                    breadcrumb: [
                        {name: 'Companies'}
                    ]
                },
            },
            {
                path: '/companies',
                component: () => import('../views/components/companies/index.vue'),
                meta: {
                    title: 'Companies',
                    role: COMPANY_MANAGEMENT,
                    breadcrumb: [
                        {name: 'Companies'}
                    ]
                },
                children : [
                    {
                        path: 'addcompany',
                        component: AddCompany,
                        meta: {
                            role: COMPANY_MANAGEMENT,
                            breadcrumb: [
                                {name: 'Add Company'}
                            ]
                        },
                    },
                    {
                        path: ':id',
                        component: InfoCompany,
                        meta: {
                            role: COMPANY_MANAGEMENT,
                            breadcrumb: [
                                {name: 'Update Company'}
                            ]
                        },
                    },
                    {
                        path : ":id",
                        component: () => import('../views/components/index.vue'),
                        meta: {
                            role: COMPANY_MANAGEMENT,
                        },
        
                        children : [
                        {
                            path : "projects",
                            component: Project
        
                        },
                        {
                            path : "rates",
                            component: Rate
        
                        }
                        ]
                    }
                ]
            },
        ],
    },
    {
        path: '/signIn',
        component: SignIn
    },
    {
        path: '/:path(.*)',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return {
            left: 0,
            top: 0
        }
    },
    routes,
})

router.afterEach((to, from) => {
    if (window.innerWidth <= 1200) {
        const sidenav =
            store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

        store.commit('largeSidebar/toggleSidebarProperties')
    }
})

router.beforeEach((to, from, next) => {

    const {meta: { role }, path } = to

    const roleList = store.state.auth.role ? store.state.auth.role : []

    // the role in meta should be inside of rolelist
    if (path !== '/' && path !== '/signIn' && !roleList.includes(role)) {
        // next('/signIn')
        router.replace({
            path: '/'
        })
    } else {
        next()
    }
})

export default router
