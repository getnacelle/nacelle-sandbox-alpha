import { mount } from '@vue/test-utils'
import MixinTestBench from '@/components/MixinTestBench.vue'
import getUserData from '@/mixins/getUserData'
import store from '~/store'

describe('User Data Mixin', () => {
  test('get user data returns expected data', () => {
    const wrapper = mount(MixinTestBench, { mixins: [getUserData] })
    wrapper.vm.getUserData()
    expect(store.state.user.userData).toEqual({
      testDataProperty1: 1,
      testDataProperty2: 2,
      testDataProperty3: 3
    })
  })
})
