import { mount } from '@vue/test-utils'
import SignIn from '@/views/sessions/SignIn.vue'
import { user } from './jestTest'
    
describe('SignIn', () => {
    const wrapper = mount(SignIn, {
        computed: {
            loggedIn() {
                return false
            },
        },
    })

    test('does a wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })
})
