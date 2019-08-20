import { mount } from '@vue/test-utils'
import MixinTestBench from '@/components/MixinTestBench.vue'
import getUserData from '@/mixins/getUserData'

describe('User Data Mixin', () => {
  test('get user data returns expected data', () => {
    const wrapper = mount(MixinTestBench, { mixins: [getUserData] })
    wrapper.vm.getUserData()
    expect(wrapper.vm.data).toEqual({})
  })
})
