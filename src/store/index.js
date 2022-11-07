import { createStore } from 'vuex'
import { auth } from './auth.module'

import largeSidebar from './modules/largeSidebar'

const store = createStore({
    modules: {
        largeSidebar,
        auth,
    },
})
export default store
